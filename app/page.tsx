
import Hero from '@/components/Hero'
import GallerySlider from '@/components/Slider'
import About from '@/components/About-Me'
import React from 'react'
import Skills from '@/components/Skills'

const Home = () => {
  return (
    <>
      <Hero />
      <About/>
      <GallerySlider/>
      <Skills/>
    </>
  )
}

export default Home