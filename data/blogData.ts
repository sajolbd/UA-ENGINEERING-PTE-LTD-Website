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
    "content": "<strong style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</span>",
    "views": 0,
    "id": "1786363271264"
  }
];
