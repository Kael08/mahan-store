'use client';

import { useState, useEffect } from 'react';

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: string;
}

export default function ProductImage({
  src,
  alt,
  className = '',
  fallback = 'https://via.placeholder.com/600x600?text=Нет+фото',
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  // Обновляем imgSrc при изменении src
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
    } else {
      setImgSrc(fallback);
    }
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}
