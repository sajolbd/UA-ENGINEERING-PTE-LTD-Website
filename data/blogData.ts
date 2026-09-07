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
  popular?: boolean;
  views?: number;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    "_id": "6a99124e0527f21a021418db",
    "slug": "test-blog",
    "title": "Test Blog",
    "category": "Renovation & Upgrading",
    "categorySlug": "renovation-upgrading",
    "date": "August 10, 2026",
    "author": "Er. Tan Boon",
    "image": "/images/uploads/image-1786363238549-460240059.png",
    "bgColor": "bg-amber-100",
    "readTime": "1 mins read",
    "popular": true,
    "views": 0,
    "content": "<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry.",
    "__v": 0
  }
];
