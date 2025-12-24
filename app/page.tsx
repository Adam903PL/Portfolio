import Hero from '@/components/Hero';
import GallerySlider from '@/components/Slider';
import About from '@/components/About-Me';
import React from 'react';
import Skills from '@/components/Skills';
import ProjectCTA from '@/components/ProjectCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GallerySlider />
      <ProjectCTA />
    </>
  );
};

export default Home;
