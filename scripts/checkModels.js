import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function listMyModels() {
  try {
    console.log("🔍 Scanning Google's servers for your available models...\n");
    
    // This asks Google exactly what your API key is allowed to see
    for await (const model of ai.models.list()) {
       // We only want to see the text generation models
       if (model.name.includes("flash") || model.name.includes("pro")) {
           console.log("✅ YOU CAN USE:", model.name);
       }
    }
    console.log("\nDone!");
  } catch (err) {
    console.error("❌ Failed:", err.message);
  }
}

listMyModels();