'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ... twoje importy zdjęć pozostają bez zmian ...
import Image1 from '@/public/img/gallery/image_1.jpg';
import Image2 from '@/public/img/gallery/image_2.jpg';
import Image3 from '@/public/img/gallery/image_3.jpg';
import Image4 from '@/public/img/gallery/image_4.jpg';
import Image5 from '@/public/img/gallery/image_5.jpg';
import Image6 from '@/public/img/gallery/image_6.jpg';
import Image7 from '@/public/img/gallery/image_7.jpg';
import Image8 from '@/public/img/gallery/image_8.jpg';
import Image9 from '@/public/img/gallery/image_9.jpg';
import Image10 from '@/public/img/gallery/image_10.jpg';

const galleryData: GalleryItem[] = [
  {
    title: 'Madeira Cliffs',
    subtitle: 'Wild rock formations',
    photo: {
      url: Image2.src,
      text: 'Tall volcanic rocks at the Madeira coast',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Ocean Power',
    subtitle: 'Waves crashing the shore',
    photo: {
      url: Image3.src,
      text: 'Waves hitting the stones at Madeira',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Cliff View',
    subtitle: 'Standing at the seaside',
    photo: {
      url: Image4.src,
      text: 'Adam at the rocky Madeira coastline',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Wide Ocean View',
    subtitle: 'Rock pillars and open sea',
    photo: {
      url: Image5.src,
      text: 'Panoramic ocean view with sharp cliffs',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Natural Pools',
    subtitle: 'Madeira lava pools',
    photo: {
      url: Image6.src,
      text: 'Volcanic natural pools in Porto Moniz',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Coastal Cliffs',
    subtitle: 'Steep rock walls',
    photo: {
      url: Image7.src,
      text: 'Cliffside path next to the ocean',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Sarah',
    subtitle: 'My dog resting',
    photo: {
      url: Image8.src,
      text: 'Mountain top covered in clouds',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Sarah',
    subtitle: 'My dog resting',
    photo: {
      url: Image9.src,
      text: 'Sarah the dog lying calmly outside',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
  {
    title: 'Sarah Close-up',
    subtitle: 'Evening chill',
    photo: {
      url: Image10.src,
      text: 'Sarah looking to the side in the yard',
      pos: '50% 50%',
      by: 'Adam Pukaluk',
    },
  },
];

// Main Gallery Slider Component
const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ZMIANA TUTAJ: Wartość ujemna odwraca kierunek obrotu (w lewo)
  const SPIN_SPEED = -0.05;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = useCallback((newIndex) => {
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

  return (
    // ZMIANA: Poprawiono literówkę "h-scree" na "h-screen"
    <div className="relative h-screen">
      <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header */}
        <div className="text-center absolute top-4 md:top-6 z-20 px-4 w-full">
          <div className="backdrop-blur-md bg-black/40 rounded-xl md:rounded-2xl px-4 py-3 md:px-8 md:py-6 border border-white/20 shadow-2xl inline-block max-w-[90%]">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">
                Life & Moments
              </span>
            </h1>
          </div>
        </div>

        {/* Gallery */}
        <div className="w-full h-full select-none">
          <CircularGallery
            items={galleryData}
            currentIndex={currentIndex}
            continuousSpinSpeed={SPIN_SPEED}
            isMobile={isMobile}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-4 z-10 px-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex items-center gap-2 backdrop-blur-md bg-black/40 rounded-full px-4 md:px-6 border border-white/20 shadow-lg">
            <span className="text-white font-semibold text-sm md:text-base">
              {currentIndex + 1}
            </span>
            <span className="text-gray-400 text-sm md:text-base">/</span>
            <span className="text-gray-400 text-sm md:text-base">
              {galleryData.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
