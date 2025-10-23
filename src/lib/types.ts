export type Question = {
  id: string;
  type: 'multiple-choice' | 'image' | 'audio' | 'drag-and-drop' | 'select-all';
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  imageHint?: string;
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  imageUrl: string;
  imageHint: string;
};

export type UserPerformance = {
  easyCorrect: number;
  easyTotal: number;
  mediumCorrect: number;
  mediumTotal: number;
  hardCorrect: number;
  hardTotal: number;
};

export type NewsArticle = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
};
