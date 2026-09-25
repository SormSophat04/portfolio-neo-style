import React from 'react';
import type { Project } from '../types';
import { BrutalCard } from './BrutalCard';
import { BrutalButton } from './BrutalButton';
import { ExternalLink, BookOpen, CheckSquare, Layers, Cpu } from 'lucide-react';
import { GitHubIcon } from './Icons';

export interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const accentBanners = {
    yellow: 'bg-[#FFD84D] text-[#111111]',
    blue: 'bg-[#4D7CFE] text-white',
    green: 'bg-[#B7F34A] text-[#111111]',
    pink: 'bg-[#FF6B9D] text-[#111111]',
    white: 'bg-white text-[#111111]',
  };

  return (
    <BrutalCard
      variant="white"
      shadow="lg"
      borderThick
      className="flex flex-col h-full overflow-hidden transition-all duration-200"
    >
      {/* Visual Terminal/Graphic Header */}
      <div className={`p-4 border-b-[3px] border-[#111111] flex items-center justify-between ${accentBanners[project.accentColor]}`}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#111111] inline-block border border-black" />
          <span className="w-3 h-3 bg-white inline-block border border-black" />
          <span className="font-mono text-xs font-black tracking-wider uppercase ml-1">
            SYS // {project.id.toUpperCase()}
          </span>
        </div>
        {project.featured && (
          <span className="border-2 border-[#111111] bg-white text-[#111111] px-2 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#111111]">
            FEATURED
          </span>
        )}
      </div>

      {/* Decorative Technical Banner */}
      <div className="bg-[#111111] text-[#F5F0E8] px-5 py-3 border-b-[3px] border-[#111111] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#FFD84D]" />
          <span className="text-gray-300">ARCHITECTURE:</span>
          <span className="text-[#FFD84D] font-bold">DISTRIBUTED / MICROSERVICES</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400">
          <Layers className="w-3.5 h-3.5" />
          <span>PRODUCTION-READY</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mb-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-mono text-xs font-bold text-[#4D7CFE] uppercase mb-4 tracking-wide">
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="font-sans text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Features */}
          <div className="mb-6 bg-[#F5F0E8] border-2 border-[#111111] p-4 shadow-[3px_3px_0px_#111111]">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-2.5 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-[#111111]" />
              Core Capabilities:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-1.5 font-mono text-xs text-[#111111] font-semibold">
                  <span className="text-[#111111] font-black">▸</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Stack */}
          <div className="mb-6">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]/70 mb-2">
              Tech Stack:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 border-2 border-[#111111] bg-white font-mono text-xs font-bold text-[#111111] shadow-[2px_2px_0px_#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t-2 border-[#111111] flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <BrutalButton
              variant="white"
              size="sm"
              href={project.githubUrl}
              target="_blank"
              icon={<GitHubIcon className="w-4 h-4" />}
              iconPosition="left"
              aria-label={`View ${project.title} on GitHub`}
            >
              Source
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
              aria-label={`Live Demo of ${project.title}`}
            >
              Live Demo
            </BrutalButton>
          )}

          <BrutalButton
            variant="blue"
            size="sm"
            onClick={() => onOpenCaseStudy?.(project)}
            icon={<BookOpen className="w-4 h-4" />}
            iconPosition="left"
            aria-label={`View Case Study for ${project.title}`}
          >
            Case Study
          </BrutalButton>
        </div>
      </div>
    </BrutalCard>
  );
};
