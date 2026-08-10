export interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  bgColor: string;
  readTime: string;
  popular: boolean;
  content: string;
  views: number;
}

export const blogPosts: BlogPost[] = [];
