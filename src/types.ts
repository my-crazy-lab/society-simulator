export interface Character {
  name: string;
  age: number;
  personality: string;
  weight?: number;
}

export interface Message {
  speaker: string;
  content: string;
  timestamp: string;
}

export interface SimulationState {
  day: number;
  hour: number;
  minute: number;
  messageCount: number;
  history: Message[];
}
