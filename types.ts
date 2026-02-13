
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Article {
  id: string;
  title: string;
  hebrewTitle: string;
  category: string;
  image: string;
  difficulty: Difficulty;
  readTime: string;
  isFeatured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  hebrewTitle: string;
  image: string;
  category: string;
}
