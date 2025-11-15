'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUpRight } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/#about' },
      { title: 'Skills', href: '/#skills' },
      { title: 'Projects', href: '/projects' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { title: 'Get in Touch', href: '/contact' },
      { title: 'Email', href: 'mailto:pukaluk.adam505@gmail.com' },
      { title: 'Phone', href: 'tel:+48695031104' },
    ],
  },
  {
    label: 'Quick Info',
    links: [
      { title: 'Lublin, Poland', href: 'https://share.google/2wsH0hlMaxFJFtw2R' },
      { title: 'TechniSchools', href: 'https://technischools.com' },
      { title: 'Available for Work', href: '/contact' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'GitHub', href: 'https://github.com/Adam903PL/', icon: Github },
      { title: 'Twitter', href: 'https://x.com/adam_p903', icon: Twitter },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/', icon: Linkedin },
      { title: 'Email', href: 'mailto:pukaluk.adam505@gmail.com', icon: Mail },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      {/* Gradient line at top */}
      <div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />
      
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-t-4xl md:rounded-t-6xl">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-800/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-700/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">
        {/* Brand Section */}
        <AnimatedContainer className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-3">
              Adam Pukaluk
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              16-year-old developer passionate about creating exceptional digital experiences. 
              Student at TechniSchools Lublin, specializing in full-stack development and modern web technologies.
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500/20 bg-green-500/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs text-green-400 font-medium">Available for work</span>
          </div>

          <p className="text-gray-400 text-sm pt-4">
            © {currentYear} Adam Pukaluk. All rights reserved.
          </p>
        </AnimatedContainer>

        {/* Links Grid */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                  {section.label}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-white inline-flex items-center gap-1 transition-all duration-300 text-sm group"
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.title}
                        {!link.icon && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>using Next.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Footer;