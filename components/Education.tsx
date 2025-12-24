'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

// ============ ACETERNITY UI - Timeline Component ============
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto pt-0 pb-20 px-4 md:px-8 lg:px-10">
        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-white border border-white/50 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + 'px',
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-white via-white/50 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ ACETERNITY UI - 3D Card Component ============
const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseEntered) setIsMouseEntered(true);
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    e.currentTarget.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(false);
    e.currentTarget.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <div className={containerClassName} style={{ perspective: '1000px' }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-all duration-200 ease-linear ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
};

const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`h-full w-full ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsMouseEntered(true);
    const handleMouseLeave = () => setIsMouseEntered(false);
    const parent = ref.current?.parentElement?.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', handleMouseEnter);
      parent.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        parent.removeEventListener('mouseenter', handleMouseEnter);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transform: isMouseEntered
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
          : 'translateX(0px) translateY(0px) translateZ(0px)',
        transition: 'all 0.5s ease-out',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ============ Types ============
export interface EducationItem {
  id?: string; // Unikalne ID (opcjonalne, będzie auto-generowane)
  year: string;
  title: string;
  institution: string;
  description: string;
  skills: string[];
  grade?: string;
  level: string;
  icon?: string; // Klucz z iconMap
  color?: string;
  bgGlow?: string;
}

export interface EducationJourneyProps {
  data: EducationItem[];
  iconMap?: Record<string, LucideIcon>; // Mapa ikon
  header?: {
    subtitle?: string;
    title?: string;
    description?: string;
  };
  stats?: {
    icon: LucideIcon;
    value: string | number;
    label: string;
  }[];
  showStats?: boolean;
  showStars?: boolean;
  levelConfig?: {
    [key: string]: number;
  };
}

// ============ Skill Level Stars Component ============
const SkillLevelStars = ({
  level,
  levelConfig,
}: {
  level: string;
  levelConfig?: { [key: string]: number };
}) => {
  const defaultConfig = {
    Expert: 5,
    Advanced: 4,
    Intermediate: 3,
    Basic: 2,
    Beginner: 1,
  };

  const config = levelConfig || defaultConfig;
  const stars = config[level] || 3;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(stars)].map((_, i) => (
        <div key={`full-${i}`} className="text-yellow-400 w-3 h-3">
          ★
        </div>
      ))}
      {[...Array(5 - stars)].map((_, i) => (
        <div key={`empty-${i}`} className="text-gray-600 w-3 h-3">
          ☆
        </div>
      ))}
    </div>
  );
};

// ============ Main Component ============
const EducationJourney: React.FC<EducationJourneyProps> = ({
  data,
  iconMap = {},
  header = {
    subtitle: 'My Journey',
    title: 'Education & Certifications',
    description:
      'From fundamentals to advanced expertise - tracking my continuous learning journey in technology',
  },
  stats,
  showStats = true,
  showStars = true,
  levelConfig,
}) => {
  // Generuj unikalne ID dla każdego itemu
  const dataWithIds = data.map((item, index) => ({
    ...item,
    id:
      item.id ||
      `${item.year}-${item.title}-${index}`.replace(/\s+/g, '-').toLowerCase(),
  }));

  const timelineData = dataWithIds.map((item) => {
    const IconComponent = item.icon && iconMap[item.icon];

    return {
      title: item.year,
      content: (
        <CardContainer className="w-full" key={item.id}>
          <CardBody className="relative group/card border border-white/10 bg-white/5 backdrop-blur-sm w-full h-auto rounded-xl p-6 hover:border-white/20 transition-all">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-white mb-2"
            >
              {item.title}
            </CardItem>

            <CardItem
              translateZ="60"
              className="text-gray-300 text-sm mb-4 flex items-center gap-2"
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              {item.institution}
            </CardItem>

            <CardItem translateZ="100" className="w-full mb-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </CardItem>

            <CardItem
              translateZ="80"
              className="flex items-center justify-between mb-4 pb-4 border-b border-white/10"
            >
              {showStars && (
                <SkillLevelStars level={item.level} levelConfig={levelConfig} />
              )}

              {item.grade && (
                <span className="text-xs text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  {item.grade}
                </span>
              )}
            </CardItem>

            <CardItem translateZ="70" className="flex flex-wrap gap-2">
              {item.skills.map((skill, i) => (
                <span
                  key={`${item.id}-skill-${i}`}
                  className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {skill}
                </span>
              ))}
            </CardItem>
          </CardBody>
        </CardContainer>
      ),
    };
  });

  return (
    <section className="w-full relative">
      {/* Header */}
      {header && (
        <div className="text-center pt-32 pb-10 px-4">
          {header.subtitle && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {header.subtitle}
            </h2>
          )}
          {header.title && (
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-6">
              {header.title}
            </h3>
          )}
          {header.description && (
            <p className="text-gray-400 max-w-2xl mx-auto">
              {header.description}
            </p>
          )}
        </div>
      )}

      {/* Timeline */}
      <Timeline data={timelineData} />

      {/* Stats */}
      {showStats && stats && stats.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div
            className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-4`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 text-white/60 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationJourney;
