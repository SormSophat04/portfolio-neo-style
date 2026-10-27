import React, { useState, useEffect } from 'react';
import type { ExperienceItem } from '../../types';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import { X, Plus, Trash2, Save, Briefcase, Landmark } from 'lucide-react';

interface ExperienceFormModalProps {
  experience?: ExperienceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (exp: ExperienceItem) => Promise<void>;
}

export const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  experience,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ExperienceItem>({
    id: '',
    role: '',
    company: '',
    period: '',
    type: 'Internship',
    location: 'Phnom Penh, Cambodia',
    description: '',
    responsibilities: [],
    technologies: [],
    statusBadge: '',
  });

  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData(experience);
    } else {
      setFormData({
        id: `exp-${Date.now()}`,
        role: '',
        company: '',
        period: 'Present',
        type: 'Internship',
        location: 'Phnom Penh, Cambodia',
        description: '',
        responsibilities: [
          'Engineered backend service logic and scalable RESTful API endpoints.',
          'Collaborated on database schema optimizations and transactional consistency.',
        ],
        technologies: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
        statusBadge: 'BANKING & FINTECH EXPERIENCE',
      });
    }
    setResponsibilityInput('');
    setTechInput('');
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleAddResponsibility = () => {
    const val = responsibilityInput.trim();
    if (val && !formData.responsibilities.includes(val)) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, val],
      });
      setResponsibilityInput('');
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
  };

  const handleAddTech = () => {
    const val = techInput.trim();
    if (val && !formData.technologies.includes(val)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, val],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) {
      alert('Please provide at least a Role title and Company name.');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...formData,
        id: formData.id || `exp-${Date.now()}`,
      });
      onClose();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Failed to save experience. Check console.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <BrutalCard variant="white" shadow="xl" borderThick className="overflow-hidden">
          {/* Header */}
          <div className="bg-[#FFD84D] border-b-[3px] border-[#111111] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 border-2 border-[#111111] bg-white shadow-[2px_2px_0px_#111111]">
                <Briefcase className="w-5 h-5 text-[#111111]" />
              </span>
              <span id="experience-modal-title" className="font-mono text-sm font-black uppercase text-[#111111]">
                {experience ? `EDIT EXPERIENCE // ${experience.company}` : 'ADD NEW WORK EXPERIENCE'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Primary Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Role / Position Held *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Software Development Intern"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD84D]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Company / Organization *
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-2 border-2 border-[#111111] bg-[#F5F0E8]">
                    <Landmark className="w-4 h-4 text-[#111111]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. LOLC Microfinance Bank"
                    className="flex-1 border-2 border-[#111111] p-2.5 font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD84D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Time Period / Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="e.g. Internship Experience or Jan 2024 - Jun 2024"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD84D]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white font-bold"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Phnom Penh, Cambodia"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Status / Domain Badge
                </label>
                <input
                  type="text"
                  value={formData.statusBadge || ''}
                  onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
                  placeholder="e.g. BANKING & FINTECH EXPERIENCE"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white"
                />
              </div>
            </div>

            {/* Overview / Description */}
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1">
                Executive Overview / Role Summary
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed summary of duties, environment, and engineering achievements..."
                className="w-full border-2 border-[#111111] p-2.5 font-sans text-xs md:text-sm bg-white"
              />
            </div>

            {/* Core Responsibilities (Bullet points) */}
            <div className="border-2 border-[#111111] p-4 bg-[#F5F0E8] shadow-[3px_3px_0px_#111111]">
              <label className="block font-mono text-xs font-black uppercase mb-2">
                Core Development Responsibilities
              </label>

              <div className="space-y-2 mb-3">
                {formData.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-2 bg-white border border-[#111111] p-2 font-mono text-xs"
                  >
                    <span className="flex-1 font-medium">
                      <span className="text-[#4D7CFE] font-black mr-1.5">▪</span>
                      {resp}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveResponsibility(idx)}
                      className="text-red-600 hover:text-black font-bold px-1"
                      title="Remove responsibility"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddResponsibility();
                    }
                  }}
                  placeholder="Add specific duty (e.g. Assisted in testing RESTful API endpoints)..."
                  className="flex-1 border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                />
                <BrutalButton
                  variant="yellow"
                  size="sm"
                  type="button"
                  onClick={handleAddResponsibility}
                  icon={<Plus className="w-3.5 h-3.5" />}
                  iconPosition="left"
                >
                  ADD ITEM
                </BrutalButton>
              </div>
            </div>

            {/* Technologies Employed */}
            <div className="border-2 border-[#111111] p-4 bg-[#F5F0E8] shadow-[3px_3px_0px_#111111]">
              <label className="block font-mono text-xs font-black uppercase mb-2">
                Applied Technology Domain / Tools
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {formData.technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-[#111111] bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(t)}
                      className="text-red-600 hover:text-black font-black"
                      title="Remove technology"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  placeholder="Add tech (e.g. Spring Boot, Docker, Oracle)..."
                  className="flex-1 border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                />
                <BrutalButton
                  variant="white"
                  size="sm"
                  type="button"
                  onClick={handleAddTech}
                  icon={<Plus className="w-3.5 h-3.5" />}
                  iconPosition="left"
                >
                  ADD TECH
                </BrutalButton>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t-2 border-[#111111] flex justify-end gap-3">
              <BrutalButton
                variant="white"
                size="md"
                type="button"
                onClick={onClose}
                disabled={saving}
              >
                CANCEL
              </BrutalButton>
              <BrutalButton
                variant="yellow"
                size="md"
                type="submit"
                disabled={saving}
                icon={<Save className="w-4 h-4" />}
                iconPosition="left"
              >
                {saving ? 'SAVING...' : experience ? 'UPDATE EXPERIENCE' : 'SAVE EXPERIENCE'}
              </BrutalButton>
            </div>
          </form>
        </BrutalCard>
      </div>
    </div>
  );
};
