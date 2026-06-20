import 'dotenv/config';
import mongoose from 'mongoose';
import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';
import KnowledgeChunk from '../models/KnowledgeChunk.js';

// 1. Read the JSON file from the root directory
const jsonFilePath = path.resolve('./knowledge.json');
const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(rawData);

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    console.log(`⏳ Loading local embedding model for ${data.length} records...`);
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // 2. Clear old vectors so we don't get duplicates
    await KnowledgeChunk.deleteMany({});
    console.log("🧹 Cleared old vector data");

    // 3. Loop through the JSON data and embed it
    for (const item of data) {
      const output = await extractor(item.text, { pooling: 'mean', normalize: true });
      const embeddingArray = Array.from(output.data);
      
      await KnowledgeChunk.create({ 
        ...item, 
        embedding: embeddingArray 
      });
    }
    console.log("🎉 All JSON Data Ingested Successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    process.exit();
  }
};

run();