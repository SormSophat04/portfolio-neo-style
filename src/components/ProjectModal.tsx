import React from 'react';
import type { Project } from '../types';
import { BrutalCard } from './BrutalCard';
import { BrutalButton } from './BrutalButton';
import { X, CheckCircle2, Terminal, ExternalLink, Layers } from 'lucide-react';
import { GitHubIcon } from './Icons';

export interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-[2px] animate-fadeIn"
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
              <span className="w-3 h-3 bg-[#111111] border border-black inline-block" />
              <span className="font-mono text-xs font-black uppercase tracking-wider">
                DEEP DIVE // ARCHITECTURAL BREAKDOWN
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 border-2 border-[#111111] bg-[#B7F34A] font-mono text-xs font-black uppercase mb-2">
                SYSTEM SPECS
              </div>
              <h3 id="modal-project-title" className="text-3xl font-black uppercase text-[#111111]">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="font-mono text-sm font-bold text-[#4D7CFE] uppercase">
                  {project.subtitle}
                </p>
              )}
            </div>

            <p className="font-sans text-base text-[#111111]/90 font-medium leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            <div className="border-[3px] border-[#111111] bg-[#F5F0E8] p-5 shadow-[4px_4px_0px_#111111]">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#111111]" />
                <h4 className="font-mono text-sm font-black uppercase tracking-wider">
                  Key Architectural Patterns
                </h4>
              </div>
              <ul className="space-y-2 font-mono text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#4D7CFE] font-black">▸</span>
                  <span><strong>Asynchronous Messaging:</strong> Event streaming via Kafka to maintain eventual consistency across microservice boundaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4D7CFE] font-black">▸</span>
                  <span><strong>Database Per Service:</strong> Strict domain encapsulation with isolated transactional data models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4D7CFE] font-black">▸</span>
                  <span><strong>Secure Endpoints:</strong> Stateless authentication, fine-grained RBAC authorization, and input validation filters.</span>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-mono text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7F34A]" />
                Delivered Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#111111] bg-white p-2.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]"
                  >
                    ✓ {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-mono text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#111111]" />
                Technologies Implemented
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 border-2 border-[#111111] bg-[#FFD84D] font-mono text-xs font-extrabold shadow-[2px_2px_0px_#111111]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t-2 border-[#111111] flex flex-wrap gap-3 justify-end">
              {project.githubUrl && (
                <BrutalButton
                  variant="white"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                  icon={<GitHubIcon className="w-4 h-4" />}
                  iconPosition="left"
                >
                  GitHub Repository
                </BrutalButton>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <BrutalButton
                  variant="yellow"
                  size="sm"
                  href={project.liveUrl}
                  target="_blank"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                >
                  View Deployment
                </BrutalButton>
              )}
              <BrutalButton variant="black" size="sm" onClick={onClose}>
                Close Overview
              </BrutalButton>
            </div>
          </div>
        </BrutalCard>
      </div>
    </div>
  );
};
