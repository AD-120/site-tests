
import { Article, Difficulty, NewsItem } from './types';

export interface CategoryDef {
  id: string;
  label: string;
  color: string;
}

export const CATEGORY_DEFS: CategoryDef[] = [
  { id: 'health', label: 'בְּרִיאוּת', color: '#f4d361' },
  { id: 'fashion', label: 'אוֹפְנָה', color: '#e91e63' },
  { id: 'sport', label: 'סְפּוֹרְט', color: '#3b71fe' },
  { id: 'dialogue', label: 'דִּיאָלוֹג', color: '#A7D397' },
  { id: 'culture', label: 'תַּרְבּוּת', color: '#A28497' },
  { id: 'cinema', label: 'קוֹלְנוֹעַ', color: '#9AD0C2' },
  { id: 'songs', label: 'שִׁירִים', color: '#EF4444' },
  { id: 'blog', label: 'בְּלוֹג', color: '#F97316' },
  { id: 'news', label: 'חֲדָשׁוֹת', color: '#F59E0B' },
  { id: 'all', label: 'All', color: '#475569' },
];

export const CATEGORIES = CATEGORY_DEFS.map(c => c.label);

export const FEATURED_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'In the Park',
    hebrewTitle: 'פיקניק בפארק',
    category: 'BLOG',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600',
    difficulty: Difficulty.Beginner,
    readTime: '4m',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Maccabi Haifa',
    hebrewTitle: 'מכבי חיפה',
    category: 'SPORT',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600',
    difficulty: Difficulty.Intermediate,
    readTime: '6m',
    isFeatured: true
  }
];

export const TOPIC_ARTICLES: Record<string, Article[]> = {
  'Culture & Art': [
    {
      id: 'c1',
      title: 'Museums in TLV',
      hebrewTitle: 'מוזיאונים בתל אביב',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1551103756-c4eb2da5268c?auto=format&fit=crop&w=400',
      difficulty: Difficulty.Intermediate,
      readTime: '5m'
    },
    {
      id: 'c2',
      title: 'Modern Art',
      hebrewTitle: 'אמנות מודרנית',
      category: 'Art',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400',
      difficulty: Difficulty.Advanced,
      readTime: '8m'
    }
  ],
  'Food': [
    {
      id: 'f1',
      title: 'Hummus Secrets',
      hebrewTitle: 'סודות החומוס',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400',
      difficulty: Difficulty.Beginner,
      readTime: '4m'
    },
    {
      id: 'f2',
      title: 'Perfect Shakshuka',
      hebrewTitle: 'שקשוקה מושלמת',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1544333323-918b856722f4?auto=format&fit=crop&w=400',
      difficulty: Difficulty.Beginner,
      readTime: '6m'
    }
  ]
};

export const NEWS_MAIN: Article = {
  id: 'n-main',
  title: 'Hot Weather Mix',
  hebrewTitle: 'מזג אוויר חם',
  category: 'NEWS',
  image: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=800',
  difficulty: Difficulty.Beginner,
  readTime: '3m'
};

export const NEWS_ITEMS: NewsItem[] = [
  { id: 'ni1', title: 'The Climate of Israel', hebrewTitle: 'מזג האוויר בישראל', image: 'https://picsum.photos/seed/climate/200/150', category: 'Nature' },
  { id: 'ni2', title: 'Elections in the Promised Lands', hebrewTitle: 'הבחירות בארצות הברית', image: 'https://picsum.photos/seed/election/200/150', category: 'Politics' },
  { id: 'ni3', title: 'New City in Israel', hebrewTitle: 'עיר חדשה בישראל', image: 'https://picsum.photos/seed/city/200/150', category: 'Local' },
  { id: 'ni4', title: 'David son of Guryon', hebrewTitle: 'דוד בן גוריון', image: 'https://picsum.photos/seed/hero/200/150', category: 'History' },
];

export const RECENT_ITEMS: NewsItem[] = [
  { id: 'r1', title: 'Rocks', hebrewTitle: 'רהיטים', image: 'https://picsum.photos/seed/rocks/100/100', category: 'Design' },
  { id: 'r2', title: 'Fruits', hebrewTitle: 'פירות', image: 'https://picsum.photos/seed/fruit/100/100', category: 'Food' },
];
