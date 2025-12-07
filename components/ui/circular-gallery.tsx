'use client';
import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import Image from 'next/image';

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

    // Przy zmianie indeksu ustaw docelowy kąt
    useEffect(() => {
      const currentRotation = rotationRef.current;
      // Index rośnie -> kąt maleje -> obrót w lewo (counter-clockwise)
      const targetAngle = -currentIndex * anglePerItem;

      // Oblicz najkrótszą drogę obrotu
      const diff = targetAngle - currentRotation;
      const revolutions = Math.round(diff / 360);
      const newTargetRotation =
        currentRotation + (targetAngle - (currentRotation + revolutions * 360));

      targetRotationRef.current = newTargetRotation;
      isSnappingRef.current = true;
    }, [currentIndex, anglePerItem]);

    // Pętla animacji
    useEffect(() => {
      let animationFrameId: number;

      const animate = () => {
        if (isSnappingRef.current) {
          const current = rotationRef.current;
          const target = targetRotationRef.current;
          const delta = target - current;

          if (Math.abs(delta) < 0.1) {
            rotationRef.current = target;
            isSnappingRef.current = false;
          } else {
            // Easing
            rotationRef.current = current + delta * 0.08;
          }
        } else {
          // Ciągły obrót (teraz będzie w lewo, bo speed jest ujemny)
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

    const cardWidth = isMobile ? 200 : 300;
    const cardHeight = isMobile ? 280 : 400;
    const effectiveRadius = isMobile ? Math.min(radius * 0.7, 400) : radius;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          'relative w-full h-full flex items-center justify-center overflow-hidden',
          className,
        )}
        style={{ perspective: isMobile ? '1200px' : '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            // Obliczanie widoczności i rotacji kart
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;

            // Logika "normalizacji" kąta, aby wiedzieć która karta jest z przodu (0 deg)
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );

            // Karta z przodu ma opacity 1, z tyłu mniejsze
            const opacity = Math.max(
              0.15,
              1 - Math.pow(normalizedAngle / 150, 1.5),
            );
            const scale = Math.max(
              isMobile ? 0.7 : 0.8,
              1 - normalizedAngle / 720, // delikatniejsze skalowanie
            );

            // Ustawienie z-index, aby przednia karta była klikalna i na wierzchu
            const zIndex = 1000 - Math.round(normalizedAngle);

            return (
              <div
                key={item.photo.url + i}
                role="group"
                aria-label={item.title}
                className="absolute will-change-transform"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  backfaceVisibility: 'hidden', // wydajność
                }}
              >
                <div className="relative w-full h-full rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group border border-white/10 bg-black/80 backdrop-blur-sm">
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-lg md:text-2xl font-bold tracking-tight mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 italic mb-2">
                      {item.subtitle}
                    </p>
                    <div className="w-10 h-1 bg-white/50 rounded-full" />
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
