
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  placeholderColor?: string;
}

const SmoothImage: React.FC<SmoothImageProps> = ({
  src,
  alt,
  className,
  imgClassName,
  placeholderColor = 'bg-slate-200',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById(`image-${props.id}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [props.id]);
  
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div
      id={`image-${props.id}`}
      className={cn(
        'overflow-hidden relative',
        className
      )}
    >
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'transition-all duration-700 ease-in-out',
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105',
            imgClassName
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      {(!isLoaded || !isInView || hasError) && (
        <div className={cn("absolute inset-0 animate-pulse", placeholderColor)} />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">{alt}</span>
        </div>
      )}
    </div>
  );
};

export default SmoothImage;
