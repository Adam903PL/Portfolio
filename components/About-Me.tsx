'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Code2,
  Palette,
  Rocket,
  User,
  Calendar,
  Briefcase,
  Phone,
  Check,
  Mail,
  Dumbbell,
  Code,
  ArrowRight,
} from 'lucide-react';

const About = () => {
  const [copied, setCopied] = useState(false);

  const skills = [
    { icon: <Code2 className="w-5 h-5" />, label: 'Full-Stack Development' },
    { icon: <Palette className="w-5 h-5" />, label: 'UI/UX Design' },
    { icon: <Rocket className="w-5 h-5" />, label: 'Performance Optimization' },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('pukaluk.adam505@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section
      id="about"
      className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gr  adient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/10 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left side - Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-600/10 to-gray-800/10 backdrop-blur-sm flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                <Image
                  src="/img/me-santa.png"
                  alt="Adam Pukaluk"
                  fill
                  priority
                  sizes="(max-width: 768px) 200px, 300px"
                  className="object-cover rounded-2xl shadow-2xl shadow-black/40"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/20" />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-white/80" />
                <div>
                  <p className="text-xl font-bold text-white">16</p>
                  <p className="text-xs text-gray-400">Years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                About Me
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-4">
                Crafting Digital Experiences
              </h3>
            </div>

            <p className="text-base text-gray-300 leading-relaxed">
              I'm a 16-year-old student at{' '}
              <a
                href="https://technischools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline decoration-gray-400/30 hover:decoration-white transition-colors font-medium"
              >
                TechniSchools
              </a>
              . I've been programming for over 3 years, developing skills across
              multiple IT domains.
            </p>

            <p className="text-base text-gray-300 leading-relaxed">
              My expertise spans from Frontend and Backend development to
              automation with n8n/PowerShell, and even cybersecurity with Kali
              Linux. I love exploring different areas of technology and
              continuously expanding my skill set to tackle diverse challenges.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 gap-3 pt-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div className="text-white/80 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Currently Working On */}
            <div className="mt-5 p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-white/80" />
                Currently Working On
              </p>
              <a
                href="https://github.com/promptversioncontrol-org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-white font-medium hover:text-gray-300 transition-colors"
              >
                <span>promptversioncontrol-org</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Briefcase className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white mb-0.5">3+</p>
                <p className="text-xs text-gray-400">Years Exp</p>
              </div>
              <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Code2 className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white mb-0.5">15+</p>
                <p className="text-xs text-gray-400">Projects</p>
              </div>
              <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Dumbbell className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white mb-0.5">105kg</p>
                <p className="text-xs text-gray-400">Bench Press</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              {/* Phone Number */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Phone className="w-5 h-5 text-white/80" />
                <a
                  href="tel:+48695031104"
                  className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  +48 695 031 104
                </a>
              </div>

              {/* Copy Email Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Copy Email Button */}
                <div className="relative group w-full">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 -m-2 rounded-lg
                                bg-white
                                opacity-30 filter blur-lg pointer-events-none
                                transition-all duration-300 ease-out
                                group-hover:opacity-50 group-hover:blur-xl group-hover:-m-3"
                  ></div>

                  {/* Button */}
                  <button
                    onClick={handleCopyEmail}
                    className="relative z-10 w-full px-4 py-3 text-sm font-semibold 
                             text-black bg-gradient-to-br from-white to-gray-300 
                             rounded-lg hover:from-gray-100 hover:to-gray-400 
                             transition-all duration-200
                             shadow-lg flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Email Copied!</span>
                      </>
                    ) : (
                      <span>Copy Email</span>
                    )}
                  </button>
                </div>

                {/* Send Email Button */}
                <a
                  href="mailto:pukaluk.adam505@gmail.com"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold 
                           text-white border border-white/20 bg-white/5 backdrop-blur-sm
                           rounded-lg hover:bg-white/10 hover:border-white/40
                           transition-all duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
