import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { PROJECTS } from '../data/projects';
import type { Project } from '../types';
import { FolderGit2, Info } from 'lucide-react';
import { BrutalCard } from '../components/BrutalCard';

export const Projects: React.FC = () => {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeader
            number="03"
            title="FEATURED PROJECTS"
            subtitle="Full-stack systems, event-driven backends, and multi-tenant domain applications built with enterprise rigor."
            accentColor="green"
            className="mb-0 md:mb-0"
          />

          <div className="hidden lg:flex items-center gap-2 border-2 border-[#111111] bg-white px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#111111]">
            <FolderGit2 className="w-4 h-4 text-[#111111]" />
            <span>4 PROJECTS CATALOGUED</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                onOpenCaseStudy={(proj) => setActiveProjectModal(proj)}
              />
            </motion.div>
          ))}
        </div>

        {/* Informational Banner */}
        <div className="mt-12">
          <BrutalCard variant="cream" shadow="sm" className="p-4 sm:p-5 border-2">
            <div className="flex items-start gap-3">
              <div className="p-1 border border-[#111111] bg-[#FFD84D] shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-[#111111]" />
              </div>
              <p className="font-mono text-xs text-[#111111]/85 leading-relaxed font-semibold">
                <strong>Configurable Architecture:</strong> All project cards are completely data-driven from{' '}
                <code className="bg-white px-1.5 py-0.5 border border-[#111111] text-[#111111]">
                  src/data/projects.ts
                </code>
                . The E-Commerce Platform entry is provided as a placeholder that can be immediately replaced with your own repositories or descriptions.
              </p>
            </div>
          </BrutalCard>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
