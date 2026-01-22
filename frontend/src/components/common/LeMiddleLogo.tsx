'use client';

import Image from 'next/image';

interface LeMiddleLogoProps {
  className?: string;
  size?: number;
}

export function LeMiddleLogo({ className = '', size = 32 }: LeMiddleLogoProps) {
  return (
    <Image 
      src="/images/logo.jpeg"
      alt="Le Middle"
      width={size}
      height={size}
      className={className}
    />
  );
}
