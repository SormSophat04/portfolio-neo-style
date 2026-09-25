import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SkillCard } from '../components/SkillCard';
import { usePortfolio } from '../context/PortfolioContext';
import { BrutalCard } from '../components/BrutalCard';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredCategories =
    selectedFilter === 'all'
      ? skills
      : skills.filter((cat) => cat.id === selectedFilter);

  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          title="TECHNICAL SKILLS"
          subtitle="Grounded stack expertise organized by technical domain. Real engineering tools, zero vanity metrics."
          accentColor="blue"
        />

        {/* Category Filter Pills (Neo-Brutalist) */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] ${
              selectedFilter === 'all'
                ? 'bg-[#111111] text-[#F5F0E8] -translate-y-0.5'
                : 'bg-white text-[#111111] hover:bg-[#FFD84D]'
            }`}
          >
            ALL STACKS ({skills.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {skills.map((cat) => {
            const isSelected = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3.5 py-2 border-[2.5px] border-[#111111] font-mono text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_#111111] ${
                  isSelected
                    ? 'bg-[#FFD84D] text-[#111111] -translate-y-0.5'
                    : 'bg-white text-[#111111] hover:bg-[#F5F0E8]'
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="h-full"
            >
              <SkillCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* Philosophy Card underneath */}
        <div className="mt-12">
          <BrutalCard variant="white" shadow="md" borderThick className="p-6 md:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border-2 border-[#111111] bg-[#B7F34A] shadow-[2px_2px_0px_#111111]">
                  <ShieldCheck className="w-6 h-6 text-[#111111]" />
                </div>
                <div>
                  <h4 className="font-mono text-sm md:text-base font-black uppercase text-[#111111]">
                    NO ARBITRARY PERCENTAGE BARS
                  </h4>
                  <p className="font-mono text-xs text-[#111111]/80 mt-0.5 font-medium">
                    Software engineering is about practical implementation, clean patterns, and system resilience — not 92% arbitrary progress bars.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111111] bg-[#FFD84D] border-2 border-[#111111] px-3 py-1.5 shrink-0 shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-4 h-4 text-[#111111]" />
                <span>HANDS-ON PRODUCTION CODE</span>
              </div>
            </div>
          </BrutalCard>
        </div>
      </div>
    </section>
  );
};
