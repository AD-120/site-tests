
export interface Goal {
  id: string;
  label: string;
  emoji: string;
  status: 'Pending' | 'Completed';
}

export interface Scenario {
  id: string;
  title: string;
  titleHe: string;
  emoji: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Extreme';
  isLocked?: boolean;
}

export interface SimulationState {
  characterVoice: string;
  screenText: string;
  goalStatus: Goal[];
  hint: string | null;
  correction?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
