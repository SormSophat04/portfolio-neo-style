import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { Server, Landmark, Layers, GitBranch, ArrowRight } from 'lucide-react';
import { BrutalButton } from '../components/BrutalButton';

export const About: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          title="ABOUT ME"
          subtitle="Engineering backend services, distributed systems, and real-world software solutions."
          accentColor="yellow"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 flex flex-col"
          >
            <BrutalCard variant="white" shadow="lg" borderThick className="p-7 md:p-9 h-full flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 border-2 border-[#111111] bg-[#FFD84D] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111]">
                  <span>ENGINEERING MINDSET</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] leading-tight">
                  Software Engineering Student Focused on Scalable Systems & High-Reliability APIs.
                </h3>

                <p className="font-sans text-base text-[#111111]/90 font-medium leading-relaxed">
                  I am a passionate Software Engineering student dedicated to mastering backend architecture,
                  full-stack development, and enterprise distributed systems. My primary focus revolves around
                  designing resilient RESTful APIs, decoupled microservices, and asynchronous event pipelines.
                </p>

                <p className="font-sans text-base text-[#111111]/90 font-medium leading-relaxed">
                  With hands-on development experience in financial technology systems during my internship at{' '}
                  <span className="font-black bg-[#FFD84D] px-1 py-0.5 border border-[#111111]">
                    LOLC Microfinance Bank
                  </span>
                  , I prioritize clean API contracts, database transaction safety (ACID), and robust service decoupling
                  using Spring Boot, Java, and Apache Kafka.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-[#111111] flex flex-wrap items-center gap-4">
                <BrutalButton
                  variant="blue"
                  size="sm"
                  href="#skills"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  EXPLORE MY SKILLS
                </BrutalButton>
                <div className="font-mono text-xs font-bold text-[#111111]/70">
                  // Always learning, building, and optimizing
                </div>
              </div>
            </BrutalCard>
          </motion.div>

          {/* Quick Focus Grid (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {/* Focus 1: Backend & Microservices */}
            <BrutalCard variant="cream" shadow="sm" className="p-5 border-[3px]">
              <div className="flex items-start gap-3">
                <div className="p-2 border-2 border-[#111111] bg-[#FFD84D] shrink-0 shadow-[2px_2px_0px_#111111]">
                  <Server className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-black uppercase text-[#111111]">
                    Backend & Microservices
                  </h4>
                  <p className="font-mono text-xs text-[#111111]/80 mt-1 leading-normal font-medium">
                    Designing modular Spring Boot services with JWT security, role-based authorization, and fault tolerance.
                  </p>
                </div>
              </div>
            </BrutalCard>

            {/* Focus 2: Event-Driven & Distributed */}
            <BrutalCard variant="cream" shadow="sm" className="p-5 border-[3px]">
              <div className="flex items-start gap-3">
                <div className="p-2 border-2 border-[#111111] bg-[#4D7CFE] shrink-0 shadow-[2px_2px_0px_#111111]">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-black uppercase text-[#111111]">
                    Event-Driven Architecture
                  </h4>
                  <p className="font-mono text-xs text-[#111111]/80 mt-1 leading-normal font-medium">
                    Streamlining asynchronous communication across services using Apache Kafka topics and event partitioning.
                  </p>
                </div>
              </div>
            </BrutalCard>

            {/* Focus 3: Fintech & Practical Systems */}
            <BrutalCard variant="cream" shadow="sm" className="p-5 border-[3px]">
              <div className="flex items-start gap-3">
                <div className="p-2 border-2 border-[#111111] bg-[#B7F34A] shrink-0 shadow-[2px_2px_0px_#111111]">
                  <Landmark className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-black uppercase text-[#111111]">
                    Fintech & Transaction Safety
                  </h4>
                  <p className="font-mono text-xs text-[#111111]/80 mt-1 leading-normal font-medium">
                    Banking API structures, payment handling (KHQR), ledger consistency, and relational database integrity.
                  </p>
                </div>
              </div>
            </BrutalCard>

            {/* Focus 4: Full-Stack Integration */}
            <BrutalCard variant="cream" shadow="sm" className="p-5 border-[3px]">
              <div className="flex items-start gap-3">
                <div className="p-2 border-2 border-[#111111] bg-[#FF6B9D] shrink-0 shadow-[2px_2px_0px_#111111]">
                  <Layers className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-black uppercase text-[#111111]">
                    Full-Stack & Client Interfaces
                  </h4>
                  <p className="font-mono text-xs text-[#111111]/80 mt-1 leading-normal font-medium">
                    Creating responsive web and mobile interfaces in Flutter, React, and TypeScript that seamlessly bind to backend APIs.
                  </p>
                </div>
              </div>
            </BrutalCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
