import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { BrutalButton } from './BrutalButton';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ARCHITECTURE', href: '#architecture' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<{ onOpenAdmin?: () => void }> = ({ onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'architecture', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3 bg-[#F5F0E8]/90 backdrop-blur-md">
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto border-[3px] border-[#111111] bg-white px-4 sm:px-6 py-3 shadow-[5px_5px_0px_#111111] flex items-center justify-between"
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          aria-label="Sorm Sophat - Homepage"
        >
          <div className="w-9 h-9 border-2 border-[#111111] bg-[#FFD84D] flex items-center justify-center font-mono font-black text-base shadow-[2px_2px_0px_#111111] group-hover:-translate-y-0.5 transition-transform">
            <Code2 className="w-5 h-5 text-[#111111]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-base font-black tracking-tight uppercase text-[#111111]">
              SORM SOPHAT
            </span>
            <span className="font-mono text-[10px] font-bold text-[#111111]/70 -mt-1 tracking-wider">
              SOFTWARE ENGINEER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider border-2 transition-all ${
                  isActive
                    ? 'border-[#111111] bg-[#FFD84D] text-[#111111] shadow-[2px_2px_0px_#111111] -translate-y-0.5'
                    : 'border-transparent text-[#111111] hover:border-[#111111] hover:bg-[#F5F0E8]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <BrutalButton
            variant="green"
            size="sm"
            href="#contact"
            icon={<ArrowUpRight className="w-4 h-4" />}
            aria-label="Navigate to contact section"
          >
            LET'S TALK
          </BrutalButton>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="px-2.5 py-1.5 border-2 border-[#111111] bg-[#FFD84D] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 transition-transform cursor-pointer"
            title="Open Admin CMS Dashboard"
          >
            CMS / ADMIN ⚡
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 border-2 border-[#111111] bg-[#FFD84D] shadow-[2px_2px_0px_#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X className="w-6 h-6 text-[#111111]" /> : <Menu className="w-6 h-6 text-[#111111]" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="lg:hidden mt-2 border-[3px] border-[#111111] bg-white p-4 shadow-[5px_5px_0px_#111111] animate-fadeIn"
          role="region"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`p-2.5 font-mono text-sm font-black uppercase tracking-wider border-2 flex items-center justify-between ${
                    isActive
                      ? 'border-[#111111] bg-[#FFD84D] text-[#111111] shadow-[2px_2px_0px_#111111]'
                      : 'border-[#111111]/30 hover:border-[#111111] hover:bg-[#F5F0E8]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs">▸</span>
                </a>
              );
            })}
            <div className="pt-2 border-t-2 border-[#111111] flex gap-2">
              <BrutalButton
                variant="yellow"
                size="sm"
                href="#contact"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                GET IN TOUCH
              </BrutalButton>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin?.();
                }}
                className="px-3 border-2 border-[#111111] bg-[#FF6B9D] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer shrink-0"
              >
                ADMIN ⚡
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
