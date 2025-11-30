import dotenv from 'dotenv';

dotenv.config();

export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  model: process.env.MODEL || 'gemini-1.5-flash-latest',
  minDelay: 6000,
  maxDelay: 18000,
  maxTokens: 12000,
  timeSeparatorInterval: { min: 20, max: 30 },
  autoSaveInterval: 100
};

if (!config.geminiApiKey) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  process.exit(1);
}
