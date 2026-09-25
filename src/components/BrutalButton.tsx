import React from 'react';

export interface BrutalButtonProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'blue' | 'green' | 'pink' | 'white' | 'black';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  href,
  onClick,
  className = '',
  download,
  target,
  rel,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'right',
  'aria-label': ariaLabel,
}) => {
  const variantStyles = {
    yellow: 'bg-[#FFD84D] text-[#111111] hover:bg-[#ffe270]',
    blue: 'bg-[#4D7CFE] text-white hover:bg-[#6891fe]',
    green: 'bg-[#B7F34A] text-[#111111] hover:bg-[#c6f66c]',
    pink: 'bg-[#FF6B9D] text-[#111111] hover:bg-[#ff86b0]',
    white: 'bg-[#FFFFFF] text-[#111111] hover:bg-[#f2efe9]',
    black: 'bg-[#111111] text-[#F5F0E8] hover:bg-[#222222]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 font-bold tracking-wider',
    md: 'text-sm md:text-base px-5 py-2.5 font-extrabold tracking-wide',
    lg: 'text-base md:text-lg px-7 py-3.5 font-black tracking-wider',
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 border-[3px] border-[#111111] font-mono uppercase transition-all duration-150 cursor-pointer select-none text-center shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#111111] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2';

  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none hover:transform-none hover:shadow-[4px_4px_0px_#111111]'
    : '';

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClasses}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        aria-label={ariaLabel}
      >
        {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
