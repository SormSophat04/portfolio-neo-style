import React from 'react';
import { ArrowUp, Heart, Terminal, Mail } from 'lucide-react';
import { BrutalButton } from './BrutalButton';
import { GitHubIcon, LinkedInIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t-[4px] border-[#111111] bg-[#111111] text-[#F5F0E8] pt-14 pb-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Upper Row: Brand & Quick Action */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b-2 border-white/20">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-white bg-[#FFD84D] text-[#111111] px-3 py-1 font-mono text-xs font-black uppercase mb-3 shadow-[3px_3px_0px_#FFFFFF]">
              <Terminal className="w-3.5 h-3.5" />
              PORTFOLIO // 2026
            </div>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              SORM SOPHAT
            </h3>
            <p className="font-mono text-sm text-gray-300 mt-1 max-w-md">
              Software Engineer specializing in Backend Systems, Microservices, and Distributed Architectures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <BrutalButton
              variant="yellow"
              size="md"
              onClick={scrollToTop}
              icon={<ArrowUp className="w-4 h-4" />}
              iconPosition="right"
              aria-label="Back to top"
            >
              BACK TO TOP
            </BrutalButton>
          </div>
        </div>

        {/* Middle Row: Links & Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b-2 border-white/20">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#FFD84D] mb-4">
              [ SITE NAVIGATION ]
            </h4>
            <ul className="space-y-2 font-mono text-sm font-bold">
              {['about', 'skills', 'projects', 'architecture', 'experience', 'contact'].map((sec) => (
                <li key={sec}>
                  <a
                    href={`#${sec}`}
                    className="hover:text-[#FFD84D] hover:underline uppercase transition-colors"
                  >
                    → {sec}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tech Specs */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#B7F34A] mb-4">
              [ STACK FOUNDATION ]
            </h4>
            <ul className="space-y-1.5 font-mono text-xs text-gray-300">
              <li>▸ Java 21 & Spring Boot 3</li>
              <li>▸ Apache Kafka Distributed Streaming</li>
              <li>▸ PostgreSQL, Oracle & MongoDB</li>
              <li>▸ Flutter & React TypeScript</li>
              <li>▸ Docker & Kubernetes Orchestration</li>
            </ul>
          </div>

          {/* Column 3: Contact & Status */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#FF6B9D] mb-4">
              [ CONNECT WITH ME ]
            </h4>
            <div className="flex flex-col gap-2.5 font-mono text-xs">
              <a
                href="https://github.com/SormSophat04"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#FFD84D] transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>github.com/SormSophat04</span>
              </a>
              <a
                href="mailto:contact@sormsophat.dev"
                className="inline-flex items-center gap-2 text-white hover:text-[#FFD84D] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contact@sormsophat.dev [Placeholder]</span>
              </a>
              <a
                href="https://linkedin.com/in/sorm-sophat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#FFD84D] transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>linkedin.com/in/sorm-sophat [Placeholder]</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Row: Copyright & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Sorm Sophat. Designed in Neo-Brutalist Architecture.</p>
          <div className="flex items-center gap-2">
            <span>Built with React, Vite, Tailwind & Framer Motion</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B9D] fill-[#FF6B9D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
