import React from 'react';
import type { SkillCategory } from '../types';
import { BrutalCard } from './BrutalCard';
import { Terminal, Server, Layout, Database, Cloud } from 'lucide-react';

export interface SkillCardProps {
  category: SkillCategory;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'languages':
      return <Terminal className="w-5 h-5 text-[#111111]" />;
    case 'backend':
      return <Server className="w-5 h-5 text-white" />;
    case 'frontend':
      return <Layout className="w-5 h-5 text-[#111111]" />;
    case 'databases':
      return <Database className="w-5 h-5 text-[#111111]" />;
    case 'devops':
      return <Cloud className="w-5 h-5 text-[#111111]" />;
    default:
      return <Terminal className="w-5 h-5 text-[#111111]" />;
  }
};

export const SkillCard: React.FC<SkillCardProps> = ({ category }) => {
  const headerColors = {
    yellow: 'bg-[#FFD84D] text-[#111111]',
    blue: 'bg-[#4D7CFE] text-white',
    green: 'bg-[#B7F34A] text-[#111111]',
    pink: 'bg-[#FF6B9D] text-[#111111]',
  };

  return (
    <BrutalCard variant="white" shadow="md" hoverable className="h-full flex flex-col">
      {/* Category Header */}
      <div
        className={`px-5 py-3 border-b-[3px] border-[#111111] flex items-center justify-between ${headerColors[category.accentColor]}`}
      >
        <div className="flex items-center gap-2">
          {getCategoryIcon(category.id)}
          <h3 className="font-mono text-base md:text-lg font-black uppercase tracking-wider">
            {category.title}
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[#111111] bg-white text-[#111111]">
          {category.skills.length} TECH
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {category.description && (
          <p className="font-mono text-xs text-[#111111]/75 mb-4 leading-relaxed">
            {category.description}
          </p>
        )}

        {/* Neo-brutalist tech tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1.5 border-2 border-[#111111] bg-[#F5F0E8] font-mono text-xs md:text-sm font-bold text-[#111111] shadow-[2px_2px_0px_#111111] transition-transform hover:-translate-y-0.5 hover:bg-[#FFD84D]"
            >
              <span className="w-1.5 h-1.5 bg-[#111111]" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </BrutalCard>
  );
};
