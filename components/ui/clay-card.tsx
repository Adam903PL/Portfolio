"use client";

import React, { ReactNode } from 'react';

interface ClayCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hasGlow?: boolean;
}

export default function ClayCard({ 
  children, 
  className = "", 
  glowColor = "rgba(255,255,255,0.1)",
  hasGlow = true 
}: ClayCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      {hasGlow && (
        <div 
          className="absolute inset-0 -m-3 rounded-2xl opacity-0 filter blur-xl pointer-events-none
                     transition-all duration-500 ease-out
                     group-hover:opacity-100 group-hover:-m-4"
          style={{ backgroundColor: glowColor }}
        ></div>
      )}
      
      {/* Clay/Glass card */}
      <div className="relative z-10 
                      backdrop-blur-md
                      bg-gradient-to-br from-white/10 to-white/5
                      border border-white/20
                      rounded-2xl
                      shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                      transition-all duration-300
                      hover:border-white/30
                      hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.5)]
                      p-6">
        {children}
      </div>
    </div>
  );
}