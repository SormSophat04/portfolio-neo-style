import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { EXPERIENCES } from '../data/experience';
import { Landmark, CheckSquare, MapPin, Terminal } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          title="PROFESSIONAL EXPERIENCE"
          subtitle="Direct software engineering internship background in the financial technology sector."
          accentColor="yellow"
        />

        <div className="max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BrutalCard variant="white" shadow="lg" borderThick className="overflow-hidden">
                {/* Header Banner */}
                <div className="bg-[#4D7CFE] text-white p-5 border-b-[3px] border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border-2 border-[#111111] bg-[#FFD84D] text-[#111111] shadow-[2px_2px_0px_#111111]">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/90">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border-2 border-[#111111] bg-white text-[#111111] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111]">
                      {exp.type}
                    </span>
                    <span className="border-2 border-[#111111] bg-[#B7F34A] text-[#111111] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111]">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Role Details */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 border-2 border-[#111111] bg-[#FFD84D] font-mono text-xs font-black uppercase mb-1">
                      POSITION HELD
                    </div>
                    <h4 className="text-2xl font-black uppercase text-[#111111]">
                      {exp.role}
                    </h4>
                    <p className="font-sans text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  </div>

                  {/* Grounded Responsibilities (strictly accurate) */}
                  <div className="bg-[#F5F0E8] border-2 border-[#111111] p-5 shadow-[3px_3px_0px_#111111]">
                    <h5 className="font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-[#111111]" />
                      Core Development Responsibilities:
                    </h5>
                    <ul className="space-y-2.5 font-mono text-xs md:text-sm text-[#111111]">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-semibold">
                          <span className="text-[#4D7CFE] font-black text-base leading-none">▪</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Employed */}
                  <div>
                    <h5 className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]/70 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      Applied Technology Domain:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 border-2 border-[#111111] bg-white font-mono text-xs font-bold text-[#111111] shadow-[2px_2px_0px_#111111]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BrutalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
