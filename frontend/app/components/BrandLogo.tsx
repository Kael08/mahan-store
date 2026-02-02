'use client';

import { useState } from 'react';

interface BrandLogoProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export default function BrandLogo({
  src,
  alt,
  className = '',
}: BrandLogoProps) {
  const [showLogo, setShowLogo] = useState(!!src);

  if (!src || !showLogo) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setShowLogo(false)}
    />
  );
}
