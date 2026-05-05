export interface Tool {
  name: string;
  logoUrl: string;
  homepageUrl: string;
}

export interface Project {
  slug: string;
  name: string;
  period: string;
  highlight: string;
  description: string;
  githubUrl?: string;
  tools: Tool[];
}

export interface Experience {
  slug: string;
  title: string;
  role: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  logoUrl: string;
  projectSlugs: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'linkedin' | 'whatsapp' | 'email' | 'instagram';
}
