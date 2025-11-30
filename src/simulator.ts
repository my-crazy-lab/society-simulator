import { characters } from './characters';
import { config } from './config';
import { GeminiClient } from './gemini';
import { Logger } from './logger';
import { TimeManager } from './time';
import { SimulationState, Message } from './types';

export class Simulator {
  private state: SimulationState;
  private gemini: GeminiClient;
  private logger: Logger;
  private timeManager: TimeManager;
  private running: boolean = false;
  private messagesSinceTimeSeparator: number = 0;

  constructor() {
    this.state = {
      day: 1,
      hour: 9,
      minute: 0,
      messageCount: 0,
      history: []
    };

    this.gemini = new GeminiClient();
    this.logger = new Logger();
    this.timeManager = new TimeManager(this.state);
  }

  private selectRandomSpeaker(): string {
    const totalWeight = characters.reduce((sum, c) => sum + (c.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const character of characters) {
      random -= character.weight || 1;
      if (random <= 0) {
        return character.name;
      }
    }

    return characters[0].name;
  }

  private getRandomDelay(): number {
    const jitter = Math.random() * (config.maxDelay - config.minDelay);
    return config.minDelay + jitter;
  }

  private shouldShowTimeSeparator(): boolean {
    const interval = Math.floor(
      Math.random() * (config.timeSeparatorInterval.max - config.timeSeparatorInterval.min + 1)
    ) + config.timeSeparatorInterval.min;

    return this.messagesSinceTimeSeparator >= interval;
  }

  private async generateAndLogMessage(): Promise<void> {
    const speaker = this.selectRandomSpeaker();
    const content = await this.gemini.generateMessage(speaker, this.state.history);

    const message: Message = {
      speaker,
      content,
      timestamp: this.timeManager.getCurrentTime()
    };

    this.state.history.push(message);
    this.state.messageCount++;
    this.messagesSinceTimeSeparator++;

    this.logger.logMessage(speaker, content);

    if (this.state.messageCount % config.autoSaveInterval === 0) {
      this.logger.save();
    }

    if (this.shouldShowTimeSeparator()) {
      this.timeManager.advance(Math.floor(Math.random() * 30) + 10);
      this.logger.logTimeSeparator(this.timeManager.getCurrentTime());
      this.messagesSinceTimeSeparator = 0;
    }
  }

  async start(): Promise<void> {
    this.running = true;
    this.logger.logSystem(`Society simulation started at ${this.timeManager.getCurrentTime()}`);
    this.logger.logSystem(`Model: ${config.model}`);
    this.logger.logSystem(`Logging to: ${this.logger.getLogPath()}`);
    this.logger.logTimeSeparator(this.timeManager.getCurrentTime());

    while (this.running) {
      try {
        await this.generateAndLogMessage();
        const delay = this.getRandomDelay();
        await this.sleep(delay);
      } catch (error: any) {
        this.logger.logSystem(`Error: ${error.message}`);
        await this.sleep(5000);
      }
    }
  }

  stop(): void {
    this.running = false;
    this.logger.logSystem(`\nSimulation ended after ${this.state.messageCount} messages`);
    this.logger.logSystem(`Final time: ${this.timeManager.getCurrentTime()}`);
    this.logger.save();
    this.logger.logSystem(`Log saved to: ${this.logger.getLogPath()}`);
    this.logger.logSystem('Goodbye! 👋');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
