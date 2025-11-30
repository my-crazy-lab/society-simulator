import { SimulationState } from './types';

export class TimeManager {
  private state: SimulationState;

  constructor(state: SimulationState) {
    this.state = state;
  }

  advance(minutes: number = 5): void {
    this.state.minute += minutes;
    
    while (this.state.minute >= 60) {
      this.state.minute -= 60;
      this.state.hour += 1;
    }
    
    while (this.state.hour >= 24) {
      this.state.hour -= 24;
      this.state.day += 1;
    }
  }

  getCurrentTime(): string {
    const hourStr = String(this.state.hour).padStart(2, '0');
    const minuteStr = String(this.state.minute).padStart(2, '0');
    return `Day ${this.state.day}, ${hourStr}:${minuteStr}`;
  }

  getTimeSeparator(): string {
    return `\n--- ${this.getCurrentTime()} ---\n`;
  }
}
