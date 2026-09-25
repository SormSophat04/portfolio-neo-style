import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import { ProjectFormModal } from './ProjectFormModal';
import { FirebaseSettingsTab } from './FirebaseSettingsTab';
import { ChangePasscodeCard } from './ChangePasscodeCard';
import type { Project, SkillCategory, ExperienceItem } from '../../types';
import {
  FolderGit2,
  Terminal,
  Briefcase,
  Flame,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft,
  Lock,
  Unlock,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const {
    projects,
    skills,
    experiences,
    isFirebaseConnected,
    addProject,
    updateProject,
    deleteProject,
    addSkillToCategory,
    removeSkillFromCategory,
    saveSkillCategory,
    deleteSkillCategory,
    saveExperience,
    deleteExperience,
    verifyPasscode,
  } = usePortfolio();

  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('neo_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience' | 'security' | 'firebase'>('projects');

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Skill category input states
  const [newSkillText, setNewSkillText] = useState<{ [categoryId: string]: string }>({});
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatColor, setNewCatColor] = useState<'yellow' | 'blue' | 'green' | 'pink'>('yellow');

  // Experience modal/edit state
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passcode)) {
      setIsAuthenticated(true);
      localStorage.setItem('neo_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('neo_admin_auth');
  };

  // --- Skill Handlers ---
  const handleAddSkillToCat = (catId: string) => {
    const text = newSkillText[catId]?.trim();
    if (!text) return;
    addSkillToCategory(catId, text);
    setNewSkillText({ ...newSkillText, [catId]: '' });
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    const newCat: SkillCategory = {
      id: newCatTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: newCatTitle.trim(),
      accentColor: newCatColor,
      skills: [],
      description: 'Custom technology category managed via Admin Dashboard.',
    };
    saveSkillCategory(newCat);
    setNewCatTitle('');
  };

  // --- Experience Handler ---
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpRole || !newExpCompany) return;
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: newExpRole,
      company: newExpCompany,
      period: newExpPeriod || 'Present',
      type: 'Full-time / Internship',
      location: 'Phnom Penh, Cambodia',
      description: newExpDesc || 'Engineered scalable backend solutions.',
      responsibilities: [
        'Built and maintained backend services and REST APIs.',
        'Collaborated on database architecture and enterprise workflows.',
      ],
      technologies: ['Java', 'Spring Boot', 'SQL'],
    };
    saveExperience(newExp);
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpPeriod('');
    setNewExpDesc('');
  };

  /* ==============================================================
     UNAUTHENTICATED GATE: PASSCODE PROTECTION
     ============================================================== */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <BrutalCard variant="white" shadow="xl" borderThick className="w-full max-w-md p-8">
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111] mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 border-2 border-[#111111] bg-[#FFD84D]">
                <Lock className="w-5 h-5 text-[#111111]" />
              </span>
              <span className="font-mono text-xs font-black uppercase">
                ADMIN ACCESS // AUTHENTICATION
              </span>
            </div>
            <button
              onClick={onExit}
              className="font-mono text-xs font-bold hover:underline cursor-pointer"
            >
              ← RETURN
            </button>
          </div>

          <h3 className="text-2xl font-black uppercase text-[#111111] mb-2">
            PORTFOLIO CMS DASHBOARD
          </h3>
          <p className="font-mono text-xs text-[#111111]/75 mb-6">
            Enter passcode to manage portfolio records, skills, and Firestore cloud synchronization.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1">
                PASSCODE (DEFAULT: <code className="bg-[#FFD84D] px-1 border border-[#111111]">admin123</code>)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#111111]"
              />
              {authError && (
                <p className="font-mono text-xs font-bold text-red-600 mt-1">
                  Invalid passcode. Use "admin123" for demo mode.
                </p>
              )}
            </div>

            <BrutalButton
              variant="yellow"
              size="md"
              type="submit"
              icon={<Unlock className="w-4 h-4" />}
              iconPosition="right"
              className="w-full"
            >
              AUTHENTICATE ACCESS
            </BrutalButton>

            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(true);
                localStorage.setItem('neo_admin_auth', 'true');
              }}
              className="w-full text-center font-mono text-xs font-bold text-gray-500 hover:text-black pt-2 cursor-pointer"
            >
              Quick Dev Mode Bypass →
            </button>
          </form>
        </BrutalCard>
      </div>
    );
  }

  /* ==============================================================
     AUTHENTICATED DASHBOARD
     ============================================================== */
  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Top Navbar */}
      <header className="border-b-[4px] border-[#111111] bg-white sticky top-0 z-30 shadow-[0_4px_0_#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-2 border-2 border-[#111111] bg-[#FFD84D] hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#111111]"
              title="Return to Public Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="font-mono text-xs font-black uppercase text-[#4D7CFE]">
                CMS CONTROL PANEL
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase text-[#111111] leading-tight">
                PORTFOLIO DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cloud Status Indicator */}
            <div className="flex items-center gap-2 border-2 border-[#111111] bg-[#F5F0E8] px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isFirebaseConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>{isFirebaseConnected ? 'FIRESTORE: LIVE' : 'LOCAL CACHE'}</span>
            </div>

            <BrutalButton variant="white" size="sm" onClick={handleLogout}>
              LOCK / LOGOUT
            </BrutalButton>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <BrutalCard variant="yellow" shadow="sm" className="p-4">
            <span className="font-mono text-xs font-bold text-[#111111]/70 uppercase">
              TOTAL PROJECTS
            </span>
            <p className="text-3xl font-black text-[#111111]">{projects.length}</p>
          </BrutalCard>

          <BrutalCard variant="blue" shadow="sm" className="p-4">
            <span className="font-mono text-xs font-bold text-white/80 uppercase">
              SKILL CATEGORIES
            </span>
            <p className="text-3xl font-black text-white">{skills.length}</p>
          </BrutalCard>

          <BrutalCard variant="green" shadow="sm" className="p-4">
            <span className="font-mono text-xs font-bold text-[#111111]/70 uppercase">
              TOTAL TECH SKILLS
            </span>
            <p className="text-3xl font-black text-[#111111]">
              {skills.reduce((acc, c) => acc + c.skills.length, 0)}
            </p>
          </BrutalCard>

          <BrutalCard variant="pink" shadow="sm" className="p-4">
            <span className="font-mono text-xs font-bold text-[#111111]/70 uppercase">
              EXPERIENCES
            </span>
            <p className="text-3xl font-black text-[#111111]">{experiences.length}</p>
          </BrutalCard>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b-2 border-[#111111] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>PROJECTS ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>SKILLS ({skills.length} CATEGORIES)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>EXPERIENCE ({experiences.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            <KeyRound className="w-4 h-4 text-[#FFD84D]" />
            <span>SECURITY / PASSCODE</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('firebase')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] flex items-center gap-2 ${
              activeTab === 'firebase'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>FIREBASE & SYNC</span>
          </button>
        </div>

        {/* ==============================================================
           TAB 1: PROJECTS
           ============================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black uppercase text-[#111111]">
                  CATALOGUED PROJECTS
                </h3>
                <p className="font-mono text-xs text-[#111111]/70 font-semibold">
                  Add, modify, or remove projects displayed on your portfolio home.
                </p>
              </div>

              <BrutalButton
                variant="yellow"
                size="md"
                onClick={() => {
                  setSelectedProject(null);
                  setProjectModalOpen(true);
                }}
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
              >
                ADD NEW PROJECT
              </BrutalButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <BrutalCard key={proj.id} variant="white" shadow="md" borderThick className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-3">
                      <span className="font-mono text-xs font-black uppercase bg-[#FFD84D] px-2 py-0.5 border border-[#111111]">
                        {proj.id}
                      </span>
                      {proj.featured && (
                        <span className="font-mono text-xs font-bold bg-[#B7F34A] px-2 py-0.5 border border-[#111111]">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-black uppercase text-[#111111] mb-1">
                      {proj.title}
                    </h4>
                    {proj.subtitle && (
                      <p className="font-mono text-xs font-bold text-[#4D7CFE] uppercase mb-2">
                        {proj.subtitle}
                      </p>
                    )}
                    <p className="font-sans text-xs md:text-sm text-[#111111]/80 font-medium mb-4 line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border border-[#111111] bg-[#F5F0E8] font-mono text-[11px] font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-[#111111] flex items-center justify-between">
                    <div className="flex gap-2">
                      <BrutalButton
                        variant="white"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(proj);
                          setProjectModalOpen(true);
                        }}
                        icon={<Edit3 className="w-3.5 h-3.5" />}
                        iconPosition="left"
                      >
                        EDIT
                      </BrutalButton>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 border-2 border-[#111111] bg-white hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs font-bold text-gray-600 hover:text-black flex items-center gap-1"
                      >
                        Repo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </BrutalCard>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================
           TAB 2: SKILLS
           ============================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-black uppercase text-[#111111]">
                SKILLS & TECHNOLOGIES
              </h3>
              <p className="font-mono text-xs text-[#111111]/70 font-semibold">
                Manage tech tags under each domain. Add new tags or create new categories.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <BrutalCard key={cat.id} variant="white" shadow="md" borderThick className="p-6">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
                    <h4 className="font-mono text-base font-black uppercase text-[#111111]">
                      {cat.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete entire category "${cat.title}"?`)) {
                          deleteSkillCategory(cat.id);
                        }
                      }}
                      className="text-red-600 hover:text-black font-mono text-xs font-bold cursor-pointer"
                    >
                      Delete Category
                    </button>
                  </div>

                  {/* Existing Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[48px]">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-[#111111] bg-[#F5F0E8] font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkillFromCategory(cat.id, skill)}
                          className="text-red-600 hover:text-black font-black"
                          title="Remove skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Skill to this Category */}
                  <div className="flex gap-2 pt-2 border-t border-[#111111]/20">
                    <input
                      type="text"
                      value={newSkillText[cat.id] || ''}
                      onChange={(e) =>
                        setNewSkillText({ ...newSkillText, [cat.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkillToCat(cat.id);
                        }
                      }}
                      placeholder={`Add to ${cat.title}...`}
                      className="flex-1 border-2 border-[#111111] p-1.5 font-mono text-xs bg-white focus:outline-none"
                    />
                    <BrutalButton
                      variant="yellow"
                      size="sm"
                      onClick={() => handleAddSkillToCat(cat.id)}
                    >
                      + ADD
                    </BrutalButton>
                  </div>
                </BrutalCard>
              ))}
            </div>

            {/* Create New Category Card */}
            <BrutalCard variant="cream" shadow="md" borderThick className="p-6">
              <h4 className="font-mono text-sm font-black uppercase text-[#111111] mb-3">
                CREATE NEW SKILL CATEGORY
              </h4>
              <form onSubmit={handleCreateCategory} className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  required
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  placeholder="Category Name (e.g. Cloud & Monitoring)"
                  className="flex-1 min-w-[200px] border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                />
                <select
                  value={newCatColor}
                  onChange={(e) =>
                    setNewCatColor(e.target.value as 'yellow' | 'blue' | 'green' | 'pink')
                  }
                  className="border-2 border-[#111111] p-2 font-mono text-xs bg-white uppercase font-bold"
                >
                  <option value="yellow">Yellow Accent</option>
                  <option value="blue">Blue Accent</option>
                  <option value="green">Green Accent</option>
                  <option value="pink">Pink Accent</option>
                </select>
                <BrutalButton variant="green" size="sm" type="submit">
                  + CREATE CATEGORY
                </BrutalButton>
              </form>
            </BrutalCard>
          </div>
        )}

        {/* ==============================================================
           TAB 3: EXPERIENCE
           ============================================================== */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-black uppercase text-[#111111]">
                PROFESSIONAL EXPERIENCE
              </h3>
              <p className="font-mono text-xs text-[#111111]/70 font-semibold">
                Manage work history, internships, and company roles.
              </p>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <BrutalCard key={exp.id} variant="white" shadow="md" borderThick className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#111111] mb-3 gap-2">
                    <div>
                      <h4 className="text-xl font-black uppercase text-[#111111]">
                        {exp.role} — <span className="text-[#4D7CFE]">{exp.company}</span>
                      </h4>
                      <p className="font-mono text-xs font-bold text-gray-600">
                        {exp.period} | {exp.location}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete experience entry for ${exp.company}?`)) {
                          deleteExperience(exp.id);
                        }
                      }}
                      className="p-1.5 border-2 border-[#111111] bg-white hover:bg-red-500 hover:text-white transition-colors cursor-pointer self-start sm:self-center"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-[#111111]/85 mb-3 font-medium">
                    {exp.description}
                  </p>

                  <div className="bg-[#F5F0E8] border border-[#111111] p-3 mb-3">
                    <span className="font-mono text-[11px] font-black uppercase text-gray-600 block mb-1">
                      Responsibilities:
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-[#111111]">
                      {exp.responsibilities.map((r, idx) => (
                        <li key={idx}>▸ {r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border border-[#111111] bg-white font-mono text-[11px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </BrutalCard>
              ))}
            </div>

            {/* Quick Add Experience Form */}
            <BrutalCard variant="cream" shadow="md" borderThick className="p-6">
              <h4 className="font-mono text-sm font-black uppercase text-[#111111] mb-4">
                ADD NEW WORK EXPERIENCE
              </h4>
              <form onSubmit={handleAddExperience} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={newExpRole}
                    onChange={(e) => setNewExpRole(e.target.value)}
                    placeholder="Role (e.g. Backend Developer)"
                    className="border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                  <input
                    type="text"
                    required
                    value={newExpCompany}
                    onChange={(e) => setNewExpCompany(e.target.value)}
                    placeholder="Company (e.g. LOLC Bank)"
                    className="border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={newExpPeriod}
                    onChange={(e) => setNewExpPeriod(e.target.value)}
                    placeholder="Period (e.g. 2024 - Present)"
                    className="border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  value={newExpDesc}
                  onChange={(e) => setNewExpDesc(e.target.value)}
                  placeholder="Overview of responsibilities..."
                  className="w-full border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                />
                <BrutalButton variant="yellow" size="sm" type="submit">
                  + ADD EXPERIENCE RECORD
                </BrutalButton>
              </form>
            </BrutalCard>
          </div>
        )}

        {/* ==============================================================
           TAB 4: SECURITY & PASSCODE
           ============================================================== */}
        {activeTab === 'security' && <ChangePasscodeCard />}

        {/* ==============================================================
           TAB 5: FIREBASE SETTINGS & SYNC
           ============================================================== */}
        {activeTab === 'firebase' && <FirebaseSettingsTab />}
      </div>

      {/* Modal for adding/editing project */}
      <ProjectFormModal
        isOpen={projectModalOpen}
        project={selectedProject}
        onClose={() => setProjectModalOpen(false)}
        onSave={async (proj) => {
          if (selectedProject) {
            await updateProject(proj);
          } else {
            await addProject(proj);
          }
        }}
      />
    </div>
  );
};
