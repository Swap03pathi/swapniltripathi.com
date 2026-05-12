export interface Tool {
  name: string;
  logoUrl: string;
  homepageUrl: string;
  /** Tailwind size classes for the tool logo (e.g. raster marks). Default h-6 w-6. */
  logoImgClassName?: string;
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
