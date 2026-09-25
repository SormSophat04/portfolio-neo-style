import type { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    accentColor: 'yellow',
    description: 'Core programming and query languages for backend, systems, and client software.',
    skills: ['Java', 'Dart', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    accentColor: 'blue',
    description: 'Enterprise frameworks, event-driven pipelines, and distributed service architecture.',
    skills: ['Spring Boot', 'Spring Security', 'REST API', 'Microservices', 'Apache Kafka'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    accentColor: 'green',
    description: 'Cross-platform mobile apps and responsive, performant web interfaces.',
    skills: ['React', 'Flutter', 'Tailwind CSS'],
  },
  {
    id: 'databases',
    title: 'Databases',
    accentColor: 'pink',
    description: 'Relational data modeling, transactional ACID reliability, and document storage.',
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    accentColor: 'yellow',
    description: 'Containerization, cluster orchestration, cloud deployment, and automation pipelines.',
    skills: ['Docker', 'Kubernetes', 'Helm', 'AWS', 'CI/CD'],
  },
];
