import React from 'react';

export interface BrutalCardProps {
  children: React.ReactNode;
  variant?: 'white' | 'yellow' | 'blue' | 'green' | 'pink' | 'cream';
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  borderThick?: boolean;
  badge?: string;
  badgeColor?: 'yellow' | 'blue' | 'green' | 'pink' | 'black';
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  variant = 'white',
  className = '',
  shadow = 'md',
  hoverable = false,
  borderThick = false,
  badge,
  badgeColor = 'yellow',
}) => {
  const variantBg = {
    white: 'bg-white text-[#111111]',
    yellow: 'bg-[#FFD84D] text-[#111111]',
    blue: 'bg-[#4D7CFE] text-white',
    green: 'bg-[#B7F34A] text-[#111111]',
    pink: 'bg-[#FF6B9D] text-[#111111]',
    cream: 'bg-[#F5F0E8] text-[#111111]',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-[3px_3px_0px_#111111]',
    md: 'shadow-[5px_5px_0px_#111111]',
    lg: 'shadow-[8px_8px_0px_#111111]',
    xl: 'shadow-[12px_12px_0px_#111111]',
  };

  const badgeBg = {
    yellow: 'bg-[#FFD84D] text-[#111111]',
    blue: 'bg-[#4D7CFE] text-white',
    green: 'bg-[#B7F34A] text-[#111111]',
    pink: 'bg-[#FF6B9D] text-[#111111]',
    black: 'bg-[#111111] text-[#F5F0E8]',
  };

  const hoverStyles = hoverable
    ? 'transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111]'
    : '';

  const borderClass = borderThick ? 'border-[4px] border-[#111111]' : 'border-[3px] border-[#111111]';

  return (
    <div
      className={`relative ${borderClass} ${variantBg[variant]} ${shadowStyles[shadow]} ${hoverStyles} ${className}`}
    >
      {badge && (
        <div
          className={`absolute -top-3.5 left-4 border-2 border-[#111111] px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111111] ${badgeBg[badgeColor]}`}
        >
          {badge}
        </div>
      )}
      {children}
    </div>
  );
};
