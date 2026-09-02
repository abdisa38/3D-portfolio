export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  colSpan: string; // e.g. 'md:col-span-7' or 'md:col-span-5'
  aspectRatio: string;
  image: string;
  tags: string[];
  link?: string;
  client?: string;
  deliverables?: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  content: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  rotation: number;
  column: 1 | 2;
  aspect: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  change?: string;
}
