import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Architecture } from './sections/Architecture';
import { Experience } from './sections/Experience';
import { GitHubResume } from './sections/GitHubResume';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#111111] flex flex-col selection:bg-[#FFD84D] selection:text-[#111111]">
      {/* Top Banner Ticker */}
      <div className="bg-[#111111] text-[#F5F0E8] py-1.5 px-4 font-mono text-[11px] font-bold border-b-2 border-[#111111] overflow-hidden whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B7F34A] animate-pulse" />
            <span className="text-[#FFD84D]">PORTFOLIO // SORM SOPHAT</span>
            <span className="hidden sm:inline text-gray-400">| SOFTWARE ENGINEER</span>
            <span className="hidden md:inline text-gray-400">| JAVA • SPRING BOOT • KAFKA • FLUTTER • REACT</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#B7F34A] font-black">STATUS: AVAILABLE</span>
            <a
              href="#contact"
              className="text-[#FFD84D] hover:underline underline-offset-2 hidden sm:inline"
            >
              [ CONNECT ]
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full" id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Experience />
        <GitHubResume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
