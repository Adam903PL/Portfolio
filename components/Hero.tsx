import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import ScrambledText from './ui/Scrambled-Text';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8 hover:bg-white/10 transition-all">
          <span className="text-gray-300 text-sm">Open to work</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
            Adam Pukaluk
          </span>{' '}
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-4">
          Full-Stack Developer
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          I build exceptional digital experiences that combine beautiful design
          with powerful functionality. Specializing in React, Next.js, and
          Node.js.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold 
                     hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold 
                     hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
          >
            Get in Touch
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center items-center">
          <span className="text-gray-400 text-sm">Follow me:</span>
          <a
            href="https://github.com/Adam903PL/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/adam-pukaluk-339058298/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">Scroll down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
}
