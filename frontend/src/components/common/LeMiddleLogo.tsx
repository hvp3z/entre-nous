'use client';

interface LeMiddleLogoProps {
  className?: string;
  size?: number;
}

export function LeMiddleLogo({ className = '', size = 32 }: LeMiddleLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Converging lines from top - representing paths meeting */}
      <path 
        d="M8 4L20 16" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M32 4L20 16" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Central meeting point dot */}
      <circle cx="20" cy="16" r="2.5" fill="currentColor"/>
      
      {/* Stylized M letter */}
      <path 
        d="M8 36V22L20 32L32 22V36" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
    </svg>
  );
}

