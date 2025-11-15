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
  currentIndex: number;
  continuousSpinSpeed: number; // Teraz wymagany
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ 
    items, 
    className, 
    radius = 600, 
    currentIndex,
    continuousSpinSpeed, 
    ...props 
  }, ref) => {
    
    const [rotation, setRotation] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false); // NOWY STAN
    const rotationRef = useRef(rotation); 
    const isContinuousSpinning = true; // ZAWSZE true
    const anglePerItem = items.length > 0 ? 360 / items.length : 0;


    // EFEKT 1: Obsługa ręcznego przeskoku
    useEffect(() => {
      // Jeśli jesteśmy już w trakcie przejścia, ignoruj kolejne zmiany
      if (isTransitioning) return;

      const targetAngle = -(currentIndex) * anglePerItem;
      const currentRotation = rotationRef.current;
      
      // Obliczanie minimalnej odległości kątowej. 
      // Jest to kluczowe, aby przeskok był w tym samym kierunku, co ciągły obrót
      // i jednocześnie minimalnie zmieniał aktualną rotację.
      const diff = targetAngle - currentRotation;
      const revolutions = Math.round(diff / 360); 
      const newTargetRotation = currentRotation + (targetAngle - (currentRotation + revolutions * 360));

      // Jeśli nowa docelowa rotacja jest inna niż aktualna rotacja:
      if (Math.abs(newTargetRotation - currentRotation) > 0.01) {
        setIsTransitioning(true);
        setRotation(newTargetRotation); // Uruchomienie przejścia CSS
        rotationRef.current = newTargetRotation;
      }
    }, [currentIndex, anglePerItem, isTransitioning]);

    // EFEKT 3: Resetowanie flagi przejścia
    useEffect(() => {
      let transitionTimer: NodeJS.Timeout;
      if (isTransitioning) {
        // Po upływie czasu przejścia CSS (np. 700ms) zresetuj flagę
        transitionTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 700); 
      }
      return () => clearTimeout(transitionTimer);
    }, [isTransitioning]);


    // EFEKT 2: Pętla `requestAnimationFrame` (ciągły obrót)
    useEffect(() => {
      // Kontynuujemy obracanie, tylko jeśli nie trwa przejście CSS
      if (isTransitioning) {
          return;
      }
      
      let animationFrameId: number;
      
      const animate = () => {
        rotationRef.current += continuousSpinSpeed;
        setRotation(rotationRef.current);
        animationFrameId = requestAnimationFrame(animate);
      };

      // Rozpocznij pętlę animacji
      animationFrameId = requestAnimationFrame(animate);

      // Funkcja czyszcząca - zatrzymaj pętlę przy odmontowaniu
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
      
    }, [isTransitioning, continuousSpinSpeed]); // Zależne od flagi isTransitioning

    
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
          // Przejście CSS tylko, gdy jest ręczna interakcja (isTransitioning)
          className={cn(
            "relative w-full h-full",
            isTransitioning && "transition-transform duration-700 ease-out" 
          )}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            // Obliczenia kąta, przezroczystości i skali (bez zmian)
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
                  
                  // Przejścia są wyłączone dla elementów, aby nie kolidowały z ciągłym obrotem, 
                  // ale w trybie przejścia ich brak nie ma dużego znaczenia.
                  transition: 'none' 
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