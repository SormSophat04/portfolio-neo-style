import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { BrutalButton } from '../components/BrutalButton';
import { CVSelectModal } from '../components/CVSelectModal';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  Download,
  ExternalLink,
  GitBranch,
  Star,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

export const GitHubResume: React.FC = () => {
  const { cvs } = usePortfolio();
  const [showCVModal, setShowCVModal] = useState(false);

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

          {/* Card 2: Resume Card (Multi-CV) */}
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
                  <span className="font-mono text-xs font-black border border-[#111111] bg-[#FFD84D] px-2.5 py-0.5 shadow-[1px_1px_0px_#111111] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {cvs.length} {cvs.length === 1 ? 'VERSION' : 'VERSIONS'}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-black uppercase text-[#FF6B9D]">
                    PROFESSIONAL RESUME FOR RECRUITERS & HR
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight">
                    RESUME / CV
                  </h3>
                  <p className="font-sans text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed">
                    Choose from specialized resume versions tailored for Backend Engineering, Full-Stack Development,
                    and Banking Technology roles.
                  </p>
                </div>

                {/* Available CVs Preview */}
                <div className="my-5 border-2 border-[#111111] bg-[#F5F0E8] p-4 font-mono text-xs shadow-[3px_3px_0px_#111111] space-y-2">
                  <div className="flex items-center justify-between text-[#111111] pb-2 border-b border-[#111111]/20">
                    <span className="font-black uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#4D7CFE]" />
                      Available Specializations:
                    </span>
                    <span className="text-[11px] font-bold text-gray-600">Select Below</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {cvs.slice(0, 3).map((cv) => (
                      <div
                        key={cv.id}
                        onClick={() => setShowCVModal(true)}
                        className="flex items-center justify-between p-1.5 bg-white border border-[#111111] hover:bg-[#FFD84D] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[#4D7CFE] font-black">▸</span>
                          <span className="font-bold truncate text-[11px]">{cv.title}</span>
                        </div>
                        {cv.isDefault ? (
                          <span className="border border-[#111111] bg-[#FFD84D] px-1.5 py-0.2 text-[10px] font-black uppercase shrink-0">
                            DEFAULT
                          </span>
                        ) : (
                          <span className="border border-[#111111] bg-[#F5F0E8] px-1.5 py-0.2 text-[10px] font-bold uppercase shrink-0">
                            {cv.fileSize || 'PDF'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#111111] flex flex-col sm:flex-row gap-3">
                <BrutalButton
                  variant="green"
                  size="md"
                  onClick={() => setShowCVModal(true)}
                  icon={<Eye className="w-4 h-4" />}
                  iconPosition="left"
                  className="flex-1"
                  aria-label="Preview CV Documents"
                >
                  PREVIEW CVS
                </BrutalButton>

                <BrutalButton
                  variant="black"
                  size="md"
                  onClick={() => setShowCVModal(true)}
                  icon={<Download className="w-4 h-4" />}
                  iconPosition="right"
                  className="flex-1"
                  aria-label="Select and Download CV"
                >
                  SELECT & DOWNLOAD CV
                </BrutalButton>
              </div>
            </BrutalCard>
          </motion.div>
        </div>
      </div>

      {/* Recruiter / HR Multi-CV Selection Modal */}
      <CVSelectModal
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
        cvs={cvs}
      />
    </section>
  );
};

