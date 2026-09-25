import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Read .env file manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) {
    env[k.trim()] = v.join('=').trim();
  }
});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log('Testing Firebase connection for project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PROJECTS = [
  {
    id: 'food-delivery',
    title: 'Food Delivery Platform',
    subtitle: 'Event-Driven Microservices & Mobile App',
    description: 'A full-stack food delivery platform using Flutter and Spring Boot microservices.',
    longDescription:
      'Built as an end-to-end distributed system to handle high-frequency customer orders, automated dispatching, and real-time delivery status updates. Designed with decoupled Spring Boot microservices communicating asynchronously via Apache Kafka topics.',
    technologies: ['Flutter', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Supabase', 'KHQR'],
    features: [
      'Customer ordering',
      'Restaurant management',
      'Delivery tracking',
      'Payment integration',
      'Event-driven communication',
    ],
    githubUrl: 'https://github.com/SormSophat04',
    liveUrl: '#',
    caseStudyUrl: '#architecture',
    accentColor: 'yellow',
    featured: true,
  },
  {
    id: 'banking-platform',
    title: 'Banking Platform',
    subtitle: 'Enterprise Core Banking Backend',
    description: 'A backend banking system designed around enterprise API and microservice concepts.',
    longDescription:
      'Engineered with strict security and transactional consistency in mind. Implements JWT-secured microservices, robust financial ledger accounting, double-entry transaction handling, and audit trails powered by Oracle DB and Kafka event streams.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Oracle', 'Kafka', 'Microservices'],
    features: [
      'Customer management',
      'Account management',
      'Transactions',
      'Cards',
      'Bills',
      'Loans',
    ],
    githubUrl: 'https://github.com/SormSophat04',
    liveUrl: '#',
    caseStudyUrl: '#architecture',
    accentColor: 'blue',
    featured: true,
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    subtitle: 'Academic Workflow & Admissions Engine',
    description: 'A student management platform supporting administrative, teacher and student workflows.',
    longDescription:
      'Designed to streamline university operations, admission lifecycles, and academic record tracking. Uses Spring Boot modular services, role-based access control (RBAC), and Kafka for student event notifications.',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'React / Flutter'],
    features: [
      'Admission',
      'Student management',
      'Teacher management',
      'Attendance',
      'Courses',
      'Enrollment',
      'Roles and permissions',
    ],
    githubUrl: 'https://github.com/SormSophat04',
    liveUrl: '#',
    caseStudyUrl: '#architecture',
    accentColor: 'green',
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    subtitle: 'High-Volume Scalable Storefront Backend',
    description: '[Placeholder description - Ready for your customized project details]. A full-stack e-commerce architecture designed for catalog management, shopping cart sessions, and checkout pipelines.',
    longDescription:
      '[Placeholder Project Description]: This modular e-commerce architecture incorporates product inventory management, cart state synchronization, resilient payment webhooks, and asynchronous order processing.',
    technologies: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'REST API'],
    features: [
      'Product catalog & search',
      'Persistent cart session',
      'Checkout & order pipeline',
      'Inventory management',
      'Payment gateway integration',
    ],
    githubUrl: 'https://github.com/SormSophat04',
    liveUrl: '#',
    caseStudyUrl: '#',
    accentColor: 'pink',
    featured: false,
  },
];

const SKILLS = [
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

const EXPERIENCES = [
  {
    id: 'lolc-microfinance',
    role: 'Software Development Intern',
    company: 'LOLC Microfinance Bank',
    period: 'Internship Experience',
    type: 'Internship',
    location: 'Phnom Penh, Cambodia',
    description:
      'Gained practical industry experience in banking technology systems, contributing to backend development and API integrations within enterprise financial environments.',
    responsibilities: [
      'Contributed to software development workflows focused on backend service logic and financial APIs.',
      'Assisted in implementing and testing RESTful API endpoints for banking and internal customer services.',
      'Collaborated with development teams following enterprise coding guidelines, code reviews, and software documentation standards.',
      'Investigated and debugged backend data flows and system integrations across database systems.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'REST APIs',
      'SQL / Relational Databases',
      'Git',
      'Enterprise Backend Practices',
    ],
    statusBadge: 'BANKING & FINTECH EXPERIENCE',
  },
];

async function seed() {
  console.log('Seeding projects...');
  for (const p of PROJECTS) {
    await setDoc(doc(db, 'projects', p.id), p, { merge: true });
    console.log(`  ✓ Project: ${p.title}`);
  }

  console.log('Seeding skill categories...');
  for (const s of SKILLS) {
    await setDoc(doc(db, 'skills', s.id), s, { merge: true });
    console.log(`  ✓ Skill Category: ${s.title}`);
  }

  console.log('Seeding experiences...');
  for (const e of EXPERIENCES) {
    await setDoc(doc(db, 'experience', e.id), e, { merge: true });
    console.log(`  ✓ Experience: ${e.company}`);
  }

  console.log('🔥 Seeding to Firestore completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding to Firestore:', err);
  process.exit(1);
});
