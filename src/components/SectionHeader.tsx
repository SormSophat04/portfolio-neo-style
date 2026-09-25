import React from 'react';

export interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  accentColor?: 'yellow' | 'blue' | 'green' | 'pink';
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  accentColor = 'yellow',
  align = 'left',
  className = '',
}) => {
  const accentBadgeBg = {
    yellow: 'bg-[#FFD84D] text-[#111111]',
    blue: 'bg-[#4D7CFE] text-white',
    green: 'bg-[#B7F34A] text-[#111111]',
    pink: 'bg-[#FF6B9D] text-[#111111]',
  };

  const accentLine = {
    yellow: 'bg-[#FFD84D]',
    blue: 'bg-[#4D7CFE]',
    green: 'bg-[#B7F34A]',
    pink: 'bg-[#FF6B9D]',
  };

  return (
    <div
      className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      <div
        className={`inline-flex items-center gap-2 mb-3 border-2 border-[#111111] px-3 py-1 font-mono text-xs md:text-sm font-black uppercase tracking-widest shadow-[3px_3px_0px_#111111] ${accentBadgeBg[accentColor]}`}
      >
        <span>SECTION // {number}</span>
      </div>

      <div className={`flex items-baseline gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="mt-3 max-w-2xl font-mono text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-4 h-2 w-20 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] ${accentLine[accentColor]} ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  );
};
