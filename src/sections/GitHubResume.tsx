import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { BrutalButton } from '../components/BrutalButton';
import {
  FileText,
  Download,
  ExternalLink,
  GitBranch,
  Star,
  CheckCircle,
  Eye,
  X,
} from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

export const GitHubResume: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="resume">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          title="CODEBASE & CREDENTIALS"
          subtitle="Direct links to my public version control activity and technical curriculum vitae."
          accentColor="blue"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <BrutalCard
              variant="white"
              shadow="xl"
              borderThick
              className="p-7 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 border-2 border-[#111111] bg-[#FFD84D] shadow-[2px_2px_0px_#111111]">
                      <GitHubIcon className="w-6 h-6 text-[#111111]" />
                    </span>
                    <span className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]">
                      OPEN SOURCE & REPOSITORIES
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold border border-[#111111] bg-[#B7F34A] px-2 py-0.5 shadow-[1px_1px_0px_#111111]">
                    PUBLIC
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-black uppercase text-[#4D7CFE]">
                    GITHUB PROFILE
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight">
                    @SormSophat04
                  </h3>
                  <p className="font-sans text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed">
                    Explore my active development repositories, backend microservice implementations, Kafka
                    event streams, and full-stack Flutter & React architectures.
                  </p>
                </div>

                {/* GitHub Terminal Stats Preview */}
                <div className="my-6 border-2 border-[#111111] bg-[#F5F0E8] p-4 font-mono text-xs shadow-[3px_3px_0px_#111111] space-y-2">
                  <div className="flex items-center justify-between text-[#111111]">
                    <span className="font-bold flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-[#111111]" />
                      Primary Repositories:
                    </span>
                    <span className="font-black bg-white px-2 py-0.5 border border-[#111111]">
                      Backend & Full-Stack
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#111111]">
                    <span className="font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#111111]" />
                      Core Focus:
                    </span>
                    <span className="font-black">Spring Boot, Kafka, Flutter</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#111111]">
                <BrutalButton
                  variant="yellow"
                  size="md"
                  href="https://github.com/SormSophat04"
                  target="_blank"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full"
                  aria-label="Visit GitHub Profile @SormSophat04"
                >
                  VISIT GITHUB // @SormSophat04
                </BrutalButton>
              </div>
            </BrutalCard>
          </motion.div>

          {/* Card 2: Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="h-full"
          >
            <BrutalCard
              variant="white"
              shadow="xl"
              borderThick
              className="p-7 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 border-2 border-[#111111] bg-[#B7F34A] shadow-[2px_2px_0px_#111111]">
                      <FileText className="w-6 h-6 text-[#111111]" />
                    </span>
                    <span className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]">
                      CURRICULUM VITAE
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold border border-[#111111] bg-[#FFD84D] px-2 py-0.5 shadow-[1px_1px_0px_#111111]">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-black uppercase text-[#FF6B9D]">
                    PROFESSIONAL RESUME
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight">
                    RESUME / CV
                  </h3>
                  <p className="font-sans text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed">
                    Detailed summary of my Software Engineering education, banking internship at LOLC
                    Microfinance Bank, primary technical competencies, and architectural projects.
                  </p>
                </div>

                {/* Highlights Summary */}
                <div className="my-6 border-2 border-[#111111] bg-[#F5F0E8] p-4 font-mono text-xs shadow-[3px_3px_0px_#111111] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-[#111111]" />
                    <span>Software Engineering Degree Candidate</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-[#111111]" />
                    <span>LOLC Microfinance Bank Internship</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-[#111111]" />
                    <span>Complete Backend & Distributed Stack</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#111111] flex flex-col sm:flex-row gap-3">
                <BrutalButton
                  variant="green"
                  size="md"
                  onClick={() => setShowResumeModal(true)}
                  icon={<Eye className="w-4 h-4" />}
                  iconPosition="left"
                  className="flex-1"
                  aria-label="View Resume Preview"
                >
                  PREVIEW CV
                </BrutalButton>

                <BrutalButton
                  variant="black"
                  size="md"
                  onClick={() => {
                    // Trigger CV download notification / modal
                    setShowResumeModal(true);
                  }}
                  icon={<Download className="w-4 h-4" />}
                  iconPosition="right"
                  className="flex-1"
                  aria-label="Download CV Document"
                >
                  DOWNLOAD CV
                </BrutalButton>
              </div>
            </BrutalCard>
          </motion.div>
        </div>
      </div>

      {/* CV Preview Modal */}
      {showResumeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <BrutalCard variant="white" shadow="xl" borderThick className="overflow-hidden">
              <div className="bg-[#FFD84D] border-b-[3px] border-[#111111] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#111111]" />
                  <span id="resume-modal-title" className="font-mono text-xs font-black uppercase">
                    CURRICULUM VITAE // SORM SOPHAT
                  </span>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close CV Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6 font-mono text-xs md:text-sm">
                <div className="border-b-2 border-[#111111] pb-4">
                  <h3 className="text-2xl font-black uppercase text-[#111111]">SORM SOPHAT</h3>
                  <p className="font-bold text-[#4D7CFE] mt-0.5">Software Engineering Student / Software Engineer</p>
                  <p className="text-gray-600 mt-1">Focus: Backend Architecture, APIs, Microservices & Distributed Systems</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black uppercase bg-[#F5F0E8] p-1.5 border border-[#111111]">
                    [ EXPERIENCE ]
                  </h4>
                  <div className="pl-2">
                    <p className="font-bold text-base text-[#111111]">Software Development Intern</p>
                    <p className="text-xs text-gray-700">LOLC Microfinance Bank</p>
                    <p className="text-xs text-gray-700 mt-1">
                      Contributed to enterprise backend development, REST API engineering, and database services in financial systems.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black uppercase bg-[#F5F0E8] p-1.5 border border-[#111111]">
                    [ TECHNICAL STACK ]
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><strong>Languages:</strong> Java, Dart, JS, TS, SQL</div>
                    <div><strong>Backend:</strong> Spring Boot, REST, Microservices, Kafka</div>
                    <div><strong>Databases:</strong> PostgreSQL, MySQL, Oracle, MongoDB</div>
                    <div><strong>DevOps:</strong> Docker, Kubernetes, Helm, AWS</div>
                  </div>
                </div>

                <div className="border-t-2 border-[#111111] pt-4 flex flex-wrap gap-3 justify-end">
                  <BrutalButton
                    variant="yellow"
                    size="sm"
                    onClick={() => {
                      alert('Download simulated: Place your resume PDF in /public/resume.pdf to enable direct download.');
                    }}
                    icon={<Download className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    DOWNLOAD PDF
                  </BrutalButton>
                  <BrutalButton
                    variant="black"
                    size="sm"
                    onClick={() => setShowResumeModal(false)}
                  >
                    CLOSE
                  </BrutalButton>
                </div>
              </div>
            </BrutalCard>
          </div>
        </div>
      )}
    </section>
  );
};
