"use client";
import React, { useState, useCallback } from 'react'; // Usunięto useRef, useEffect
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ... (galleryData bez zmian) ...
const galleryData: GalleryItem[] = [
    {
        common: 'Lion',
        binomial: 'Panthera leo',
        photo: {
            url: 'https://images.unsplash.com/photo-1583499871880-de841d1ace2a?w=900&auto=format&fit=crop&q=80',
            text: 'lion couple kissing on a brown rock',
            pos: '47% 35%',
            by: 'Clément Roy'
        }
    },
    {
        common: 'Asiatic elephant',
        binomial: 'Elephas maximus',
        photo: {
            url: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?w=900&auto=format&fit=crop&q=80',
            text: 'herd of Sri Lankan elephants walking away from a river',
            pos: '75% 65%',
            by: 'Alex Azabache'
        }
    },
    {
        common: 'Red-tailed black cockatoo',
        binomial: 'Calyptorhynchus banksii',
        photo: {
            url: 'https://images.unsplash.com/photo-1619664208054-41eefeab29e9?w=900&auto=format&fit=crop&q=80',
            text: 'close-up of a black cockatoo',
            pos: '53% 43%',
            by: 'David Clode'
        }
    },
    {
        common: 'Dromedary',
        binomial: 'Camelus dromedarius',
        photo: {
            url: 'https://images.unsplash.com/photo-1662841238473-f4b137e123cb?w=900&auto=format&fit=crop&q=80',
            text: 'camel and her new born calf walking in the Sahara desert',
            pos: '65% 65%',
            by: 'Moaz Tobok'
        }
    },
    {
        common: 'Polar bear',
        binomial: 'Ursus maritimus',
        photo: {
            url: 'https://images.unsplash.com/photo-1589648751789-c8ecb7a88bd5?w=900&auto=format&fit=crop&q=80',
            text: 'polar bear on the snow, by the water, raised on the hind legs, front paws together',
            pos: '50% 25%',
            by: 'Hans-Jurgen Mager'
        }
    },
    {
        common: 'Giant panda',
        binomial: 'Ailuropoda melanoleuca',
        photo: {
            url: 'https://images.unsplash.com/photo-1659540181281-1d89d6112832?w=900&auto=format&fit=crop&q=80',
            text: 'giant panda hanging from a tree branch',
            pos: '47%',
            by: 'Jiachen Lin'
        }
    },
    {
        common: 'Grévy\'s zebra',
        binomial: 'Equus grevyi',
        photo: {
            url: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?w=900&auto=format&fit=crop&q=80',
            text: 'zebra standing on wheat field, looking back towards the camera',
            pos: '65% 35%',
            by: 'Jeff Griffith'
        }
    },
    {
        common: 'Cheetah',
        binomial: 'Acinonyx jubatus',
        photo: {
            url: 'https://images.unsplash.com/photo-1541707519942-08fd2f6480ba?w=900&auto=format&fit=crop&q=80',
            text: 'cheetah sitting in the grass under a blue sky',
            by: 'Mike Bird'
        }
    },
    {
        common: 'King penguin',
        binomial: 'Aptenodytes patagonicus',
        photo: {
            url: 'https://images.unsplash.com/photo-1595792419466-23cec2476fa6?w=900&auto=format&fit=crop&q=80',
            text: 'king penguin with a fluffy brown chick on grey rocks',
            pos: '35%',
            by: 'Martin Wettstein'
        }
    },
    {
        common: 'Red panda',
        binomial: 'Ailurus fulgens',
        photo: {
            url: 'https://images.unsplash.com/photo-1689799513565-44d2bc09d75b?w=900&auto=format&fit=crop&q=80',
            text: 'a red panda in a tree',
            by: 'Niels Baars'
        }
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
        const newIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
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
                        <p className="text-gray-200 text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            Ciągły obrót z ręcznym przeskokiem
                        </p>
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