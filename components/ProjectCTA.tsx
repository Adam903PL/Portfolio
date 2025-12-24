'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ProjectCTA = () => {
  return (
    <section className="py-24 px-4 relative flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-[100px] group-hover:bg-white/30 transition-colors duration-500"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to explore my work?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto relative z-10">
            Dive into my portfolio to see how I combine technology and
            creativity to build amazing digital experiences.
          </p>

          <div className="relative z-10 inline-block">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              View My Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCTA;
