import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  type Firestore,
} from 'firebase/firestore';
import type { Project, SkillCategory, ExperienceItem } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../data/projects';
import { SKILL_CATEGORIES as INITIAL_SKILLS } from '../data/skills';
import { EXPERIENCES as INITIAL_EXPERIENCES } from '../data/experience';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Check localStorage or Vite environment variables for config
export const getStoredFirebaseConfig = (): FirebaseConfig | null => {
  const localSaved = localStorage.getItem('neo_firebase_config');
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    } catch {
      // ignore parse error
    }
  }

  // Fallback to Vite env variables
  const envConfig: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  return null;
};

export const saveFirebaseConfig = (config: FirebaseConfig) => {
  localStorage.setItem('neo_firebase_config', JSON.stringify(config));
};

export const clearFirebaseConfig = () => {
  localStorage.removeItem('neo_firebase_config');
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export const initFirebase = (customConfig?: FirebaseConfig): { app: FirebaseApp | null; db: Firestore | null } => {
  const config = customConfig || getStoredFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return { app: null, db: null };
  }

  try {
    const existingApps = getApps();
    if (existingApps.length > 0) {
      app = existingApps[0];
    } else {
      app = initializeApp(config);
    }
    db = getFirestore(app);
    return { app, db };
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return { app: null, db: null };
  }
};

// Initial test/connection check
const initResult = initFirebase();
app = initResult.app;
db = initResult.db;

export const getDb = (): Firestore | null => {
  if (!db) {
    const res = initFirebase();
    db = res.db;
  }
  return db;
};

/* ==============================================================
   DATA REPOSITORY: FIRESTORE WITH SEAMLESS LOCALSTORAGE FALLBACK
   ============================================================== */

const STORAGE_KEYS = {
  PROJECTS: 'neo_portfolio_projects',
  SKILLS: 'neo_portfolio_skills',
  EXPERIENCES: 'neo_portfolio_experiences',
  PASSCODE: 'neo_admin_passcode',
};

// --- PASSCODE / AUTH PERSISTENCE (PURE CLOUD FIRESTORE) ---

export const fetchAdminPasscode = async (): Promise<string> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const snap = await getDoc(doc(firestore, 'settings', 'admin'));
      if (snap.exists() && snap.data()?.passcode) {
        const cloudPasscode = snap.data().passcode;
        localStorage.setItem(STORAGE_KEYS.PASSCODE, cloudPasscode);
        return cloudPasscode;
      }
    } catch (err) {
      console.warn('Could not fetch passcode from Firestore, using local fallback:', err);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.PASSCODE);
  if (local) {
    return local;
  }

  return '';
};

export const saveAdminPasscode = async (newPasscode: string): Promise<void> => {
  const trimmed = newPasscode.trim();
  if (!trimmed) return;

  const firestore = getDb();
  if (firestore) {
    try {
      await setDoc(
        doc(firestore, 'settings', 'admin'),
        { passcode: trimmed, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch (err) {
      console.error('Error saving passcode to Firestore:', err);
    }
  }

  localStorage.setItem(STORAGE_KEYS.PASSCODE, trimmed);
};

// --- PROJECTS ---

export const fetchProjects = async (): Promise<Project[]> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const snap = await getDocs(collection(firestore, 'projects'));
      if (!snap.empty) {
        const list: Project[] = [];
        snap.forEach((d) => list.push({ ...(d.data() as Project), id: d.id }));
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to local/cached data:', err);
    }
  }

  // Local storage fallback
  const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // fallback to initial
    }
  }

  return INITIAL_PROJECTS;
};

export const saveProjectDoc = async (project: Project): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const docRef = doc(firestore, 'projects', project.id);
      await setDoc(docRef, project, { merge: true });
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }
  }

  // Update local storage
  const current = await fetchProjects();
  const index = current.findIndex((p) => p.id === project.id);
  const updated = index >= 0 ? current.map((p) => (p.id === project.id ? project : p)) : [project, ...current];
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
};

export const deleteProjectDoc = async (id: string): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      await deleteDoc(doc(firestore, 'projects', id));
    } catch (err) {
      console.error('Error deleting from Firestore:', err);
    }
  }

  const current = await fetchProjects();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
};

// --- SKILLS ---

export const fetchSkills = async (): Promise<SkillCategory[]> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const snap = await getDocs(collection(firestore, 'skills'));
      if (!snap.empty) {
        const list: SkillCategory[] = [];
        snap.forEach((d) => list.push({ ...(d.data() as SkillCategory), id: d.id }));
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch failed for skills, falling back to local/cached:', err);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.SKILLS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // fallback
    }
  }

  return INITIAL_SKILLS;
};

export const saveSkillCategoryDoc = async (category: SkillCategory): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const docRef = doc(firestore, 'skills', category.id);
      await setDoc(docRef, category, { merge: true });
    } catch (err) {
      console.error('Error saving skill category to Firestore:', err);
    }
  }

  const current = await fetchSkills();
  const index = current.findIndex((c) => c.id === category.id);
  const updated = index >= 0 ? current.map((c) => (c.id === category.id ? category : c)) : [...current, category];
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
};

export const deleteSkillCategoryDoc = async (id: string): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      await deleteDoc(doc(firestore, 'skills', id));
    } catch (err) {
      console.error('Error deleting skill category from Firestore:', err);
    }
  }

  const current = await fetchSkills();
  const updated = current.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
};

// --- EXPERIENCES ---

export const fetchExperiences = async (): Promise<ExperienceItem[]> => {
  const firestore = getDb();
  if (firestore) {
    try {
      const snap = await getDocs(collection(firestore, 'experience'));
      if (!snap.empty) {
        const list: ExperienceItem[] = [];
        snap.forEach((d) => list.push({ ...(d.data() as ExperienceItem), id: d.id }));
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch failed for experience:', err);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // fallback
    }
  }

  return INITIAL_EXPERIENCES;
};

export const saveExperienceDoc = async (exp: ExperienceItem): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      await setDoc(doc(firestore, 'experience', exp.id), exp, { merge: true });
    } catch (err) {
      console.error('Error saving experience to Firestore:', err);
    }
  }

  const current = await fetchExperiences();
  const index = current.findIndex((e) => e.id === exp.id);
  const updated = index >= 0 ? current.map((e) => (e.id === exp.id ? exp : e)) : [exp, ...current];
  localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
};

export const deleteExperienceDoc = async (id: string): Promise<void> => {
  const firestore = getDb();
  if (firestore) {
    try {
      await deleteDoc(doc(firestore, 'experience', id));
    } catch (err) {
      console.error('Error deleting experience from Firestore:', err);
    }
  }

  const current = await fetchExperiences();
  const updated = current.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
};

// --- ONE-CLICK SEED TO FIRESTORE ---

export const seedInitialDataToFirestore = async (): Promise<{ success: boolean; message: string }> => {
  const firestore = getDb();
  if (!firestore) {
    return {
      success: false,
      message: 'Firebase is not initialized. Please configure valid Firebase credentials first.',
    };
  }

  try {
    for (const project of INITIAL_PROJECTS) {
      await setDoc(doc(firestore, 'projects', project.id), project, { merge: true });
    }

    for (const skill of INITIAL_SKILLS) {
      await setDoc(doc(firestore, 'skills', skill.id), skill, { merge: true });
    }

    for (const exp of INITIAL_EXPERIENCES) {
      await setDoc(doc(firestore, 'experience', exp.id), exp, { merge: true });
    }

    return {
      success: true,
      message: 'Successfully seeded projects, skills, and experience into Firestore!',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Failed to seed Firestore: ${errorMsg}`,
    };
  }
};
