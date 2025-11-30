import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getColorForCharacter } from './colors';

export class Logger {
  private logBuffer: string[] = [];
  private logFilePath: string;

  constructor() {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const date = new Date().toISOString().split('T')[0];
    this.logFilePath = path.join(logsDir, `society-${date}.txt`);
  }

  logMessage(speaker: string, content: string): void {
    const color = getColorForCharacter(speaker);
    const coloredOutput = `${color.bold(speaker)}: ${content}`;
    const plainOutput = `${speaker}: ${content}`;

    console.log(coloredOutput);
    this.logBuffer.push(plainOutput);
  }

  logTimeSeparator(timeStr: string): void {
    const separator = `\n--- ${timeStr} ---\n`;
    console.log(chalk.dim(separator));
    this.logBuffer.push(separator);
  }

  logSystem(message: string): void {
    console.log(chalk.cyan(`[SYSTEM] ${message}`));
    this.logBuffer.push(`[SYSTEM] ${message}`);
  }

  save(): void {
    try {
      fs.appendFileSync(this.logFilePath, this.logBuffer.join('\n') + '\n', 'utf-8');
      this.logBuffer = [];
    } catch (error) {
      console.error(chalk.red('Failed to save log:'), error);
    }
  }

  getLogPath(): string {
    return this.logFilePath;
  }
}
