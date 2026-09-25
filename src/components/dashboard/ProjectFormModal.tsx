import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import { X, Plus, Trash2, Save, Layers } from 'lucide-react';

interface ProjectFormModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => Promise<void>;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    longDescription: '',
    technologies: [],
    features: [],
    githubUrl: '',
    liveUrl: '',
    caseStudyUrl: '',
    accentColor: 'yellow',
    featured: false,
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        id: `project-${Date.now()}`,
        title: '',
        subtitle: '',
        description: '',
        longDescription: '',
        technologies: ['Spring Boot', 'Java'],
        features: ['API Endpoints', 'Database Integration'],
        githubUrl: 'https://github.com/SormSophat04',
        liveUrl: '',
        caseStudyUrl: '',
        accentColor: 'yellow',
        featured: false,
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleAddTech = () => {
    const val = techInput.trim();
    if (val && !formData.technologies.includes(val)) {
      setFormData({ ...formData, technologies: [...formData.technologies, val] });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleAddFeature = () => {
    const val = featureInput.trim();
    if (val && !formData.features.includes(val)) {
      setFormData({ ...formData, features: [...formData.features, val] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feat),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    setSaving(true);
    try {
      await onSave({
        ...formData,
        id: formData.id || `project-${Date.now()}`,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-heading"
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
              <Layers className="w-5 h-5 text-[#111111]" />
              <span id="project-modal-heading" className="font-mono text-sm font-black uppercase">
                {project ? 'EDIT PROJECT RECORD' : 'ADD NEW PROJECT TO REPOSITORY'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Distributed Payment Gateway"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                  SUBTITLE / DOMAIN
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Microservices & Event Streams"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                SHORT DESCRIPTION *
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Concise overview for the portfolio card..."
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                DETAILED CASE STUDY / ARCHITECTURE NOTE
              </label>
              <textarea
                rows={3}
                value={formData.longDescription || ''}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Deep dive into system topology, async events, or DB schema..."
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Tech Tags Input */}
            <div className="border-2 border-[#111111] bg-[#F5F0E8] p-4">
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-2">
                TECHNOLOGY TAGS
              </label>
              <div className="flex gap-2 mb-3">
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
                  placeholder="Add technology (e.g. Redis, Docker) and press Enter"
                  className="flex-1 border-2 border-[#111111] p-2 font-mono text-xs bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-3 border-2 border-[#111111] bg-[#FFD84D] font-mono text-xs font-black uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 inline" /> ADD
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-[#111111] bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(t)}
                      className="text-red-600 hover:text-black font-black ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Features List Input */}
            <div className="border-2 border-[#111111] bg-[#F5F0E8] p-4">
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-2">
                CORE FEATURES / CAPABILITIES
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Add capability (e.g. Asynchronous Kafka dispatch)"
                  className="flex-1 border-2 border-[#111111] p-2 font-mono text-xs bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 border-2 border-[#111111] bg-[#B7F34A] font-mono text-xs font-black uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 inline" /> ADD
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center justify-between p-2 border border-[#111111] bg-white font-mono text-xs"
                  >
                    <span>▸ {feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feat)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Links and Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                  GITHUB URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full border-2 border-[#111111] p-2 font-mono text-xs bg-[#F5F0E8]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                  LIVE DEMO URL
                </label>
                <input
                  type="text"
                  value={formData.liveUrl || ''}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://... or #"
                  className="w-full border-2 border-[#111111] p-2 font-mono text-xs bg-[#F5F0E8]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                  ACCENT COLOR
                </label>
                <select
                  value={formData.accentColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accentColor: e.target.value as 'yellow' | 'blue' | 'green' | 'pink' | 'white',
                    })
                  }
                  className="w-full border-2 border-[#111111] p-2 font-mono text-xs bg-[#F5F0E8] uppercase font-bold"
                >
                  <option value="yellow">Yellow (#FFD84D)</option>
                  <option value="blue">Blue (#4D7CFE)</option>
                  <option value="green">Green (#B7F34A)</option>
                  <option value="pink">Pink (#FF6B9D)</option>
                  <option value="white">White (#FFFFFF)</option>
                </select>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 pt-2">
              <input
                id="featured-checkbox"
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 border-2 border-[#111111] accent-[#111111]"
              />
              <label htmlFor="featured-checkbox" className="font-mono text-xs font-bold uppercase cursor-pointer">
                MARK AS FEATURED ON PORTFOLIO HOME
              </label>
            </div>

            {/* Buttons */}
            <div className="border-t-2 border-[#111111] pt-4 flex justify-end gap-3">
              <BrutalButton variant="white" size="sm" onClick={onClose} type="button">
                CANCEL
              </BrutalButton>
              <BrutalButton
                variant="yellow"
                size="sm"
                type="submit"
                disabled={saving}
                icon={<Save className="w-4 h-4" />}
                iconPosition="left"
              >
                {saving ? 'SAVING RECORD...' : 'SAVE PROJECT'}
              </BrutalButton>
            </div>
          </form>
        </BrutalCard>
      </div>
    </div>
  );
};
