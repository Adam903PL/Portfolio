'use client';
import React, { useState, useCallback } from 'react'; // Usunięto useRef, useEffect
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER_URL =
  'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark-vertical.jpg';

const galleryData: GalleryItem[] = [
  {
    common: 'Project Alpha',
    binomial: 'Design Mockup I',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Project Alpha',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Module Beta',
    binomial: 'Development Phase II',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Module Beta',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Feature Gamma',
    binomial: 'UI/UX Concept III',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Feature Gamma',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Service Delta',
    binomial: 'Integration Setup IV',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Service Delta',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Prototype Epsilon',
    binomial: 'Testing Iteration V',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Prototype Epsilon',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Project Alpha',
    binomial: 'Design Mockup I',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Project Alpha',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Module Beta',
    binomial: 'Development Phase II',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Module Beta',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Feature Gamma',
    binomial: 'UI/UX Concept III',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Feature Gamma',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Service Delta',
    binomial: 'Integration Setup IV',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Service Delta',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
  {
    common: 'Prototype Epsilon',
    binomial: 'Testing Iteration V',
    photo: {
      url: PLACEHOLDER_URL,
      text: 'Empty placeholder image for Prototype Epsilon',
      pos: '50% 50%',
      by: 'System Placeholder',
    },
  },
];
const GallerySlider = () => {
  // Stan tylko do śledzenia aktualnie wybranego elementu
  const [currentIndex, setCurrentIndex] = useState(0);
  const SPIN_SPEED = 0.03; // Stała prędkość ciągłego obrotu

  // Funkcja do aktualizacji indeksu (bez żadnych timerów czy zmian trybu)
  const handleInteraction = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  const handlePrev = () => {
    const newIndex =
      (currentIndex - 1 + galleryData.length) % galleryData.length;
    handleInteraction(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % galleryData.length;
    handleInteraction(newIndex);
  };

  const handleDotClick = (index: number) => {
    handleInteraction(index);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 pointer-events-none z-[5]" />

      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8 absolute top-16 z-10 px-4">
          <div className="backdrop-blur-md bg-black/40 rounded-2xl px-8 py-6 border border-white/20 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <p className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
                Life & Moments
              </p>
            </h1>
          </div>
        </div>

        {/* Gallery */}
        <div className="w-full h-full select-none">
          <CircularGallery
            items={galleryData}
            currentIndex={currentIndex}
            // ZAWSZE przekazujemy prędkość, by obrót był ciągły
            continuousSpinSpeed={SPIN_SPEED}
          />
        </div>

        {/* Controls (pozostają bez zmian w JSX) */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full backdrop-blur-md bg-black/40 border border-white/20 
                                   flex items-center justify-center text-white hover:bg-black/60 transition-all
                                   hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 backdrop-blur-md bg-black/40 rounded-full px-6 border border-white/20 shadow-lg">
            <span className="text-white font-semibold">{currentIndex + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">{galleryData.length}</span>
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full backdrop-blur-md bg-black/40 border border-white/20 
                                   flex items-center justify-center text-white hover:bg-black/60 transition-all
                                   hover:scale-110 active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {galleryData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
