'use client';

import { useState, useRef, useEffect } from 'react';

interface ProductDescripitionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescripitionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isClamped =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowButton(isClamped);
    }
  }, [description]);

  return (
    <div className="prose max-w-none">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Описание</h3>

      <div
        ref={textRef}
        className={`
          text-gray-700 leading-relaxed whitespace-pre-line
          ${!isExpanded ? 'line-clamp-4' : ''}
        `}
      >
        {description}
      </div>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          {isExpanded ? 'Свернуть' : 'Читать полностью'}
        </button>
      )}
      {/* {description.split('\n').length > 4 && (
        <button
          onClick={()=> setIsExpanded(!isExpanded)}
          className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          {isExpanded ? 'Свернуть' : 'Читать полностью'}
        </button>
      )} */}
    </div>
  );
}
