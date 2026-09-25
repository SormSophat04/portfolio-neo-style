export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  accentColor: 'yellow' | 'blue' | 'green' | 'pink' | 'white';
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  accentColor: 'yellow' | 'blue' | 'green' | 'pink';
  skills: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  statusBadge?: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  layer: 'client' | 'gateway' | 'core-services' | 'messaging' | 'worker-services' | 'data';
  technologies: string[];
  description: string;
  sampleEvent?: string;
  samplePayload?: string;
  accentColor: 'yellow' | 'blue' | 'green' | 'pink' | 'white';
}
