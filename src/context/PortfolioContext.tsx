import React, { createContext, useState, useEffect } from 'react';
import type { Project, SkillCategory, ExperienceItem, CVDocument } from '../types';
import {
  fetchProjects,
  saveProjectDoc,
  deleteProjectDoc,
  fetchSkills,
  saveSkillCategoryDoc,
  deleteSkillCategoryDoc,
  fetchExperiences,
  saveExperienceDoc,
  deleteExperienceDoc,
  fetchCVs,
  saveCVDoc,
  deleteCVDoc,
  setDefaultCVDoc,
  getStoredFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  initFirebase,
  seedInitialDataToFirestore,
  fetchAdminPasscodeHash,
  saveAdminPasscodeHash,
  type FirebaseConfig,
} from '../services/firebase';
import { hashPasscode, purgeInsecureStorage } from '../services/security';

interface PortfolioContextType {
  projects: Project[];
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  cvs: CVDocument[];
  loading: boolean;
  isFirebaseConnected: boolean;
  firebaseConfig: FirebaseConfig | null;
  adminPasscode: string;
  saveConfig: (config: FirebaseConfig) => void;
  removeConfig: () => void;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addSkillToCategory: (categoryId: string, skillName: string) => Promise<void>;
  removeSkillFromCategory: (categoryId: string, skillName: string) => Promise<void>;
  saveSkillCategory: (category: SkillCategory) => Promise<void>;
  deleteSkillCategory: (id: string) => Promise<void>;
  saveExperience: (experience: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveCV: (cv: CVDocument) => Promise<void>;
  deleteCV: (id: string) => Promise<void>;
  setDefaultCV: (id: string) => Promise<void>;
  seedFirestore: () => Promise<{ success: boolean; message: string }>;
  reloadAll: () => Promise<void>;
  isPasscodeConfigured: () => Promise<boolean>;
  updatePasscode: (newPasscode: string) => Promise<void>;
  verifyPasscode: (candidate: string) => Promise<boolean>;
}

export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [cvs, setCvs] = useState<CVDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    purgeInsecureStorage();
    try {
      const config = getStoredFirebaseConfig();
      setFirebaseConfig(config);
      const { db } = initFirebase(config || undefined);
      setIsFirebaseConnected(!!db);

      const [p, s, e, c] = await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchExperiences(),
        fetchCVs(),
      ]);
      setProjects(p);
      setSkills(s);
      setExperiences(e);
      setCvs(c);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveConfig = (config: FirebaseConfig) => {
    saveFirebaseConfig(config);
    setFirebaseConfig(config);
    const { db } = initFirebase(config);
    setIsFirebaseConnected(!!db);
    loadData();
  };

  const removeConfig = () => {
    clearFirebaseConfig();
    setFirebaseConfig(null);
    setIsFirebaseConnected(false);
    loadData();
  };

  const addProject = async (project: Project) => {
    await saveProjectDoc(project);
    setProjects((prev) => [project, ...prev.filter((p) => p.id !== project.id)]);
  };

  const updateProject = async (project: Project) => {
    await saveProjectDoc(project);
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
  };

  const deleteProject = async (id: string) => {
    await deleteProjectDoc(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addSkillToCategory = async (categoryId: string, skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    const cat = skills.find((c) => c.id === categoryId);
    if (!cat) return;
    if (cat.skills.includes(trimmed)) return;

    const updated: SkillCategory = {
      ...cat,
      skills: [...cat.skills, trimmed],
    };
    await saveSkillCategoryDoc(updated);
    setSkills((prev) => prev.map((c) => (c.id === categoryId ? updated : c)));
  };

  const removeSkillFromCategory = async (categoryId: string, skillName: string) => {
    const cat = skills.find((c) => c.id === categoryId);
    if (!cat) return;
    const updated: SkillCategory = {
      ...cat,
      skills: cat.skills.filter((s) => s !== skillName),
    };
    await saveSkillCategoryDoc(updated);
    setSkills((prev) => prev.map((c) => (c.id === categoryId ? updated : c)));
  };

  const saveSkillCategory = async (category: SkillCategory) => {
    await saveSkillCategoryDoc(category);
    setSkills((prev) => {
      const idx = prev.findIndex((c) => c.id === category.id);
      return idx >= 0 ? prev.map((c) => (c.id === category.id ? category : c)) : [...prev, category];
    });
  };

  const deleteSkillCategory = async (id: string) => {
    await deleteSkillCategoryDoc(id);
    setSkills((prev) => prev.filter((c) => c.id !== id));
  };

  const saveExperience = async (experience: ExperienceItem) => {
    await saveExperienceDoc(experience);
    setExperiences((prev) => {
      const idx = prev.findIndex((e) => e.id === experience.id);
      return idx >= 0 ? prev.map((e) => (e.id === experience.id ? experience : e)) : [experience, ...prev];
    });
  };

  const deleteExperience = async (id: string) => {
    await deleteExperienceDoc(id);
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const saveCV = async (cv: CVDocument) => {
    await saveCVDoc(cv);
    setCvs((prev) => {
      let updated = prev;
      if (cv.isDefault) {
        updated = updated.map((item) => ({ ...item, isDefault: item.id === cv.id }));
      }
      const idx = updated.findIndex((c) => c.id === cv.id);
      return idx >= 0 ? updated.map((c) => (c.id === cv.id ? cv : c)) : [cv, ...updated];
    });
  };

  const deleteCV = async (id: string) => {
    await deleteCVDoc(id);
    setCvs((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      if (remaining.length > 0 && !remaining.some((c) => c.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
  };

  const setDefaultCV = async (id: string) => {
    await setDefaultCVDoc(id);
    setCvs((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.id === id,
      }))
    );
  };

  const seedFirestore = async () => {
    const result = await seedInitialDataToFirestore();
    if (result.success) {
      await loadData();
    }
    return result;
  };

  const isPasscodeConfigured = async (): Promise<boolean> => {
    const hash = await fetchAdminPasscodeHash();
    return !!hash;
  };

  const updatePasscode = async (newPasscode: string): Promise<void> => {
    const hash = await hashPasscode(newPasscode);
    await saveAdminPasscodeHash(hash);
  };

  const verifyPasscode = async (candidate: string): Promise<boolean> => {
    const candidateHash = await hashPasscode(candidate);
    const storedHash = await fetchAdminPasscodeHash();
    if (!storedHash) return false;
    return candidateHash === storedHash;
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        experiences,
        cvs,
        loading,
        isFirebaseConnected,
        firebaseConfig,
        adminPasscode: '',
        saveConfig,
        removeConfig,
        addProject,
        updateProject,
        deleteProject,
        addSkillToCategory,
        removeSkillFromCategory,
        saveSkillCategory,
        deleteSkillCategory,
        saveExperience,
        deleteExperience,
        saveCV,
        deleteCV,
        setDefaultCV,
        seedFirestore,
        reloadAll: loadData,
        isPasscodeConfigured,
        updatePasscode,
        verifyPasscode,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export { usePortfolio } from './usePortfolio';
