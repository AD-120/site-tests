
export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'All';

export type Category = 
  | 'Blog' | 'News' | 'Cinema' | 'Songs' 
  | 'Dialogue' | 'Culture' | 'History' 
  | 'Economy' | 'Health' | 'Fashion' 
  | 'Travel' | 'Sport' | 'Vocabulary' | 'All';

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: Category;
  level: Level;
  date?: string;
  badgeColor?: string;
  isFeatured?: boolean;
}

export interface FilterState {
  level: Level;
  category: Category;
}
