import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config';
import { characters } from './characters';
import { Message } from './types';

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private systemPrompt: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: config.model });
    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    const characterList = characters
      .map(c => `- ${c.name} (${c.age}): ${c.personality}`)
      .join('\n');

    return `You are simulating a real-time, endless group conversation between exactly these 8 people living together in a large remote mansion. They are all in the same room 24/7 (common areas). Never add new characters. Never narrate internal thoughts — only output what they SAY out loud or DO visibly (e.g., "*Luna rolls her eyes*"). Keep every message short (1–3 sentences max). Memory is 100% persistent: secrets, betrayals, romances, grudges, inside jokes, and addictions carry over forever. Time passes realistically. Relationships and drama must evolve naturally over days and weeks. Be chaotic, funny, dark, human, and unpredictable. Every 20–30 messages, insert: \n\n--- Day X, HH:MM ---\n\n

Current characters and their core traits:
${characterList}`;
  }

  async generateMessage(speaker: string, history: Message[]): Promise<string> {
    const recentHistory = this.trimHistory(history);
    const historyText = recentHistory
      .map(m => `${m.speaker}: ${m.content}`)
      .join('\n');

    const prompt = `${this.systemPrompt}

Previous conversation:
${historyText}

Now ${speaker} speaks. Output ONLY what ${speaker} says or does (no labels, no "Speaker:" prefix). Be in character. Keep it short (1-3 sentences).`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error: any) {
      console.error('Gemini API error:', error.message);
      return `*${speaker} looks confused and stays silent*`;
    }
  }

  private trimHistory(history: Message[]): Message[] {
    const maxMessages = 50;
    if (history.length <= maxMessages) {
      return history;
    }
    return history.slice(-maxMessages);
  }
}
