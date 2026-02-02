'use client';

import { useState } from 'react';

interface AvatarImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export default function AvatarImage({
  src,
  alt,
  className = '',
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (!src || hasError) {
    return null;
  }

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
}
