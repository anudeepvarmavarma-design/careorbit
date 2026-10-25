import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false, size = 'md' }) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 42 : 34;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}>
      {/* Connected Orbit SVG Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Main outer ring */}
          <circle cx="18" cy="18" r="15" stroke="#0F766E" strokeWidth="2.5" className="opacity-90" />
          
          {/* Tilted elliptical orbit */}
          <ellipse
            cx="18"
            cy="18"
            rx="15"
            ry="7"
            stroke="#10B981"
            strokeWidth="2.2"
            strokeDasharray="4 2"
            transform="rotate(-28 18 18)"
          />
          
          {/* Central medical core pulse */}
          <circle cx="18" cy="18" r="4.5" fill="#0F766E" />
          <circle cx="18" cy="18" r="2" fill="#FFFFFF" />
          
          {/* Satellite Care Node */}
          <circle cx="27" cy="12" r="3" fill="#10B981" />
          <circle cx="9" cy="24" r="2" fill="#0D9488" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`${textSize} font-extrabold tracking-tight text-navy-950 font-sans`}>
            Care<span className="text-teal-600 font-black">Orbit</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mb-0.5 animate-pulse"></span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-teal-800 font-medium tracking-wide mt-0.5 hidden sm:block">
            Smart Healthcare Platform
          </span>
        )}
      </div>
    </Link>
  );
};
