import Groq from 'groq-sdk';
import { pipeline } from '@xenova/transformers';
import KnowledgeChunk from '../models/KnowledgeChunk.js';
import TriageTicket from '../models/TriageTicket.js';
import cosineSimilarity from 'compute-cosine-similarity';

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Keep the embedding model in memory so it doesn't reload on every message
let extractorInstance = null;
const getExtractor = async () => {
  if (!extractorInstance) {
    extractorInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractorInstance;
};

export const askFiqhAgent = async (req, res) => {
  const { userQuestion } = req.body;
  console.log(`\n🤖 User Asked: "${userQuestion}"`);

  try {
    // 1. Get embedding locally
    const extractor = await getExtractor();
    const output = await extractor(userQuestion, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(output.data);

    // 2. Fetch chunks and calculate similarity
    const allChunks = await KnowledgeChunk.find({});
    if (allChunks.length === 0) {
       return res.status(200).json({ answer: "Mera knowledge base abhi khali hai." });
    }

    const scoredChunks = allChunks.map(chunk => ({
      text: chunk.text,
      score: cosineSimilarity(queryVector, chunk.embedding)
    }));

    // Sort and grab top 3
    scoredChunks.sort((a, b) => b.score - a.score);
    const contextText = scoredChunks.slice(0, 3).map(c => c.text).join("\n\n");

    console.log("📚 Context found, passing to Groq (Llama 3)...");

    // 3. Generate response using Groq
   // 3. Generate response using Groq
   const prompt = `You are an Islamic Fiqh assistant for Madina Masjid.
    
    CRITICAL INSTRUCTIONS:
    1. STRICT CONCISENESS: Give the exact answer immediately. Do not add any filler words.
    2. NO CHIT-CHAT: Do NOT say "Assalam o Alaikum", do NOT introduce yourself, and do NOT repeat the user's question. Just give the answer. (Exception: If the user explicitly says "Hello" or "Kaise ho", you may greet them briefly).
    3. FIQH QUESTIONS: Answer using ONLY the facts provided in the Context below.
    4. OUT OF BOUNDS: If the Context does not contain the answer, output ONLY the exact word 'ROUTE_TO_IMAM'. Do not guess.
    5. Reply in clean Roman Urdu.

    Context:
    ${contextText}

    Question: ${userQuestion}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant", // Using Meta's blazing fast Llama 3 model
      
      temperature: 0.0,          // 0.0 forces the model to be completely factual and deterministic
  max_tokens: 500,           // Caps the length so it can never run away into an infinite loop
  frequency_penalty: 0.5, // Keep it factual
    });

    const finalAnswer = chatCompletion.choices[0].message.content;

    // 4. Triage check
    if (finalAnswer.includes('ROUTE_TO_IMAM')) {
      await TriageTicket.create({ userQuestion });
      return res.status(200).json({ answer: "Ye sawal thora pecheeda hai, maine isay Imam sahab ko bhijwa diya hai." });
    }

    console.log("✅ Groq answered successfully!");
    res.status(200).json({ answer: finalAnswer });

  } catch (error) {
    console.error("❌ BACKEND ERROR:", error); 
    res.status(500).json({ message: "Server Error" });
  }
};


  export const addFiqhRule = async (req, res) => {
  const { text, source, category } = req.body;
  try {
    const extractor = await getExtractor(); // Reusing the model you already loaded
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    const embeddingArray = Array.from(output.data);
    
    await KnowledgeChunk.create({ text, source, category, embedding: embeddingArray });
    
    res.status(201).json({ message: "Rule successfully added and embedded!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
