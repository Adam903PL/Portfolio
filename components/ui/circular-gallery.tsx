'use client';
import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface GalleryItem {
  title: string;
  subtitle: string;
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
  currentIndex: number;
  continuousSpinSpeed: number;
  isMobile?: boolean;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      currentIndex,
      continuousSpinSpeed,
      isMobile = false,
      ...props
    },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const rotationRef = useRef(0);
    const targetRotationRef = useRef(0);
    const isSnappingRef = useRef(false);

    const anglePerItem = items.length > 0 ? 360 / items.length : 0;

    // Przy zmianie indeksu ustaw docelowy kąt, do którego mamy płynnie "dociągnąć"
    useEffect(() => {
      const currentRotation = rotationRef.current;
      const targetAngle = -currentIndex * anglePerItem;

      // minimalny obrót do nowej pozycji
      const diff = targetAngle - currentRotation;
      const revolutions = Math.round(diff / 360);
      const newTargetRotation =
        currentRotation + (targetAngle - (currentRotation + revolutions * 360));

      targetRotationRef.current = newTargetRotation;
      isSnappingRef.current = true;
    }, [currentIndex, anglePerItem]);

    // Ciągły obrót + płynne przejście do nowego indeksu
    useEffect(() => {
      let animationFrameId: number;

      const animate = () => {
        if (isSnappingRef.current) {
          const current = rotationRef.current;
          const target = targetRotationRef.current;
          const delta = target - current;

          // jeśli bardzo blisko celu – zakończ "snap"
          if (Math.abs(delta) < 0.5) {
            rotationRef.current = target;
            isSnappingRef.current = false;
          } else {
            // easing w stronę docelowego kąta
            rotationRef.current = current + delta * 0.15;
          }
        } else {
          // zwykły ciągły obrót
          rotationRef.current += continuousSpinSpeed;
        }

        setRotation(rotationRef.current);
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [continuousSpinSpeed]);

    // Dostosowane wymiary dla mobile - większy promień, mniejsze karty
    const cardWidth = isMobile ? 200 : 300;
    const cardHeight = isMobile ? 280 : 400;
    const effectiveRadius = isMobile ? Math.min(radius * 0.7, 400) : radius;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          'relative w-full h-full flex items-center justify-center',
          className,
        )}
        style={{ perspective: isMobile ? '1200px' : '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.2, 1 - normalizedAngle / 180);
            const scale = Math.max(
              isMobile ? 0.7 : 0.8,
              1 - normalizedAngle / 360,
            );

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.title}
                className="absolute"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  opacity,
                  transition: 'none',
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-white/20 bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                    <h2 className="text-base md:text-xl font-bold drop-shadow-lg">
                      {item.title}
                    </h2>
                    <em className="text-xs md:text-sm italic opacity-90 drop-shadow-md">
                      {item.subtitle}
                    </em>
                    <p className="text-xs mt-1 md:mt-2 opacity-80 drop-shadow-md">
                      Photo by: {item.photo.by}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
