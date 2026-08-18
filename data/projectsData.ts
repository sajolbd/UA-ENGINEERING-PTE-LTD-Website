export interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  client?: string;
  category: string;
  image: string;
  description: string;
  location: string;
  gallery: string[];
  createdAt?: string;
  __v?: number;
}

export const projectsData: ProjectItem[] = [
  {
    "_id": "6a84367006af49c1185b76e0",
    "title": "External Painting",
    "category": "Painting & Waterproofing",
    "client": "",
    "location": "Orchard Road, Singapore",
    "description": "High-rise external wall painting, crack repair, and facade upgrading using premium weather-shield paint systems.",
    "image": "/images/projects/external-painting.png",
    "gallery": [],
    "createdAt": "2026-08-18T10:39:44.539Z",
    "__v": 0
  },
  {
    "_id": "6a84367006af49c1185b76df",
    "title": "Latest Roof Coating",
    "category": "Painting & Waterproofing",
    "client": "",
    "location": "Sembawang, Singapore",
    "description": "Multi-layered protective coating applied to terracotta roofing tiles to resist tropical weathering, UV rays, and algae growth.",
    "image": "/images/projects/latest-roof-coating.png",
    "gallery": [],
    "createdAt": "2026-08-18T10:39:44.495Z",
    "__v": 0
  },
  {
    "_id": "6a84367006af49c1185b76de",
    "title": "SHAMIM",
    "category": "Painting & Waterproofing",
    "client": "",
    "location": "Singapore",
    "description": "",
    "image": "/images/uploads/image-1786333085591-361452311.png",
    "gallery": [],
    "createdAt": "2026-08-18T10:39:44.422Z",
    "__v": 0
  }
];
