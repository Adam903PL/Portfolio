"use client"
import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  currentIndex?: number; // NOWY PROP
  onIndexChange?: (index: number) => void; // NOWY PROP
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ 
    items, 
    className, 
    radius = 600, 
    autoRotateSpeed = 0.02, 
    currentIndex, // NOWY
    onIndexChange, // NOWY
    ...props 
  }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isUserControlled, setIsUserControlled] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Jeśli currentIndex jest kontrolowany z zewnątrz, użyj go
    useEffect(() => {
      if (currentIndex !== undefined) {
        setIsUserControlled(true);
        const anglePerItem = 360 / items.length;
        const targetRotation = -currentIndex * anglePerItem;
        setRotation(targetRotation);
      }
    }, [currentIndex, items.length]);

    // Effect to handle scroll-based rotation (tylko gdy nie jest kontrolowany)
    useEffect(() => {
      if (currentIndex !== undefined) return; // Skip jeśli kontrolowany

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        // Wywołaj callback z aktualnym indexem
        if (onIndexChange) {
          const anglePerItem = 360 / items.length;
          const currentIdx = Math.round((scrollRotation % 360) / anglePerItem) % items.length;
          onIndexChange(currentIdx);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [currentIndex, items.length, onIndexChange]);

    // Effect for auto-rotation (wyłączony gdy kontrolowany)
    useEffect(() => {
      if (currentIndex !== undefined) return; // Skip jeśli kontrolowany

      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed, currentIndex]);

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-out"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));
            const scale = Math.max(0.8, 1 - (normalizedAngle / 360));

            return (
              <div
                key={item.photo.url} 
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-200px',
                  opacity: opacity,
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-white/20 bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                    <h2 className="text-xl font-bold drop-shadow-lg">{item.common}</h2>
                    <em className="text-sm italic opacity-90 drop-shadow-md">{item.binomial}</em>
                    <p className="text-xs mt-2 opacity-80 drop-shadow-md">Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };