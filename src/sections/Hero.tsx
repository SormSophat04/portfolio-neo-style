import React from 'react';
import { motion } from 'framer-motion';
import { BrutalButton } from '../components/BrutalButton';
import { BrutalCard } from '../components/BrutalCard';
import {
  ArrowDown,
  Download,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle,
  Database,
  Cpu,
} from 'lucide-react';

const HERO_TECH_TAGS = [
  { name: 'Java', bg: 'bg-[#FFD84D]' },
  { name: 'Spring Boot', bg: 'bg-[#B7F34A]' },
  { name: 'Flutter', bg: 'bg-[#4D7CFE] text-white' },
  { name: 'React', bg: 'bg-[#FF6B9D]' },
  { name: 'Kafka', bg: 'bg-[#111111] text-[#F5F0E8]' },
  { name: 'Docker', bg: 'bg-[#4D7CFE] text-white' },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden" id="hero">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 -z-10 w-72 h-72 border-[4px] border-[#111111] bg-[#FFD84D]/30 rotate-3 hidden md:block" />
      <div className="absolute bottom-10 left-10 -z-10 w-48 h-48 border-[3px] border-[#111111] bg-[#B7F34A]/25 -rotate-6 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Hero Column (Left / 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 border-[3px] border-[#111111] bg-[#FFD84D] px-3.5 py-1.5 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] mb-5">
              <Sparkles className="w-4 h-4 text-[#111111]" />
              <span>BACKEND & FULL-STACK ENGINEER</span>
            </div>

            {/* Developer Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#111111] leading-[0.95] mb-3">
              SORM SOPHAT
            </h1>

            {/* Role Header */}
            <div className="inline-block border-[3px] border-[#111111] bg-[#111111] text-[#F5F0E8] px-4 py-2 font-mono text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider shadow-[4px_4px_0px_#FFD84D] mb-6">
              SOFTWARE ENGINEER
            </div>

            {/* Core Value Statement */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#111111] leading-snug mb-8 max-w-2xl border-l-[5px] border-[#FF6B9D] pl-4 py-1">
              "I build full-stack applications, backend APIs and distributed systems."
            </p>

            {/* Technology Tags */}
            <div className="w-full mb-8">
              <div className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]/70 mb-3 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>PRIMARY STACK TOOLKIT:</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {HERO_TECH_TAGS.map((tag) => (
                  <span
                    key={tag.name}
                    className={`px-3 py-1.5 border-[2.5px] border-[#111111] font-mono text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 transition-transform ${tag.bg}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <BrutalButton
                variant="yellow"
                size="lg"
                href="#projects"
                icon={<ArrowDown className="w-5 h-5" />}
                iconPosition="right"
                aria-label="View Projects"
              >
                VIEW PROJECTS
              </BrutalButton>

              <BrutalButton
                variant="white"
                size="lg"
                href="#resume"
                icon={<Download className="w-5 h-5" />}
                iconPosition="left"
                aria-label="Download CV"
              >
                DOWNLOAD CV
              </BrutalButton>
            </div>
          </motion.div>

          {/* Right Column: Neo-Brutalist Status Card & Interactive Terminal Preview (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6 w-full"
          >
            {/* Status Card (As specifically requested) */}
            <BrutalCard variant="green" shadow="lg" borderThick className="p-6 md:p-7">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#111111] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#111111]"></span>
                  </span>
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#111111]">
                    CURRENT STATUS
                  </span>
                </div>
                <span className="font-mono text-[11px] font-black border border-[#111111] bg-white px-2 py-0.5">
                  ACTIVE
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] leading-tight mb-3">
                OPEN TO SOFTWARE DEVELOPMENT OPPORTUNITIES
              </h2>

              <p className="font-mono text-xs text-[#111111]/85 font-semibold leading-relaxed mb-4">
                Ready for roles in Backend Engineering, API Services, Microservices Development, and Full-Stack Engineering.
              </p>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111111] pt-2 border-t border-[#111111]">
                <CheckCircle className="w-4 h-4 text-[#111111]" />
                <span>Internship Experience at LOLC Microfinance Bank</span>
              </div>
            </BrutalCard>

            {/* Quick Architecture Console Preview */}
            <BrutalCard variant="white" shadow="md" borderThick className="overflow-hidden">
              <div className="bg-[#111111] text-[#F5F0E8] px-4 py-2.5 border-b-2 border-[#111111] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#FF6B9D] border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#B7F34A] border border-black inline-block" />
                  <span className="text-gray-300 font-bold ml-1">SYSTEM_TERMINAL.sh</span>
                </div>
                <span className="text-[#B7F34A] font-bold">READY</span>
              </div>

              <div className="p-4 bg-white font-mono text-xs space-y-2 text-[#111111]">
                <div className="flex items-center gap-2 text-gray-500">
                  <span>$</span>
                  <span className="text-[#111111] font-bold">whoami</span>
                </div>
                <div className="pl-4 text-[#4D7CFE] font-black">
                  &gt; Sorm Sophat | Software Engineering Student
                </div>

                <div className="flex items-center gap-2 text-gray-500 pt-1">
                  <span>$</span>
                  <span className="text-[#111111] font-bold">cat /core/competencies</span>
                </div>
                <div className="pl-4 grid grid-cols-2 gap-1 text-[11px] font-semibold text-gray-800">
                  <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-[#111111]" /> Spring Boot 3</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-[#111111]" /> Microservices</span>
                  <span className="flex items-center gap-1"><Database className="w-3 h-3 text-[#111111]" /> Relational DBs</span>
                  <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-[#111111]" /> Apache Kafka</span>
                </div>

                <div className="pt-2 border-t border-[#111111]/20 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-[#111111]">Phnom Penh, Cambodia</span>
                </div>
              </div>
            </BrutalCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
