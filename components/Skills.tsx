"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Layers, ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';

// Icons imports
import JavaScriptIcon from '@/public/img/icons/javascript-programming-language-icon.svg';
import TypeScriptIcon from '@/public/img/icons/typescript-programming-language-icon.svg';
import PythonIcon from '@/public/img/icons/python-programming-language-icon.svg';
import CppIcon from '@/public/img/icons/c-plus-plus-programming-language-icon.svg';
import PhpIcon from '@/public/img/icons/php.svg';
import HTMLIcon from '@/public/img/icons/html-icon.svg';
import ReactIcon from '@/public/img/icons/react-js-icon.svg';
import NextJsIcon from '@/public/img/icons/nextjs-icon.svg';
import ReactNativeIcon from '@/public/img/icons/react-native-app-icon.svg';
import NodeIcon from '@/public/img/icons/node-js-icon.svg';
import ExpressIcon from '@/public/img/icons/express-js-icon.svg';
import FastAPIIcon from '@/public/img/icons/FastAPI.svg';
import FlaskIcon from '@/public/img/icons/icons8-flask.svg';
import PostgresIcon from '@/public/img/icons/PostgreSQL.svg';
import MsSqlIcon from '@/public/img/icons/mssql.svg';
import TailwindIcon from '@/public/img/icons/tailwind-css-icon.svg';
import ReduxIcon from '@/public/img/icons/redux.svg';
import ZustandIcon from '@/public/img/icons/zustand.svg';
import LottieIcon from '@/public/img/icons/lottiefiles.svg';
import GitIcon from '@/public/img/icons/git-icon.svg';
import VSCodeIcon from '@/public/img/icons/icons8-visual-studio-code-2019.svg';
import DockerIcon from '@/public/img/icons/icons8-docker.svg';
import PostmanIcon from '@/public/img/icons/postman-icon.svg';
import JetBrainsIcon from '@/public/img/icons/icons8-jetbrains.svg';
import N8NIcon from '@/public/img/icons/n8n.svg';
import BetterAuthIcon from '@/public/img/icons/Better Auth_light.svg';

// NEW ICONS
import ReactHookFormIcon from '@/public/img/icons/react-hooj-form-icon.svg';
import StripeIcon from '@/public/img/icons/stripe-icon.svg';

const ExperienceLevel = {
  BEGINNER: "Beginner",
  BASIC: "Basic",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert"
};

const SkillCategory = {
  LANGUAGE: "Languages",
  FRAMEWORK: "Frameworks",
  LIBRARY: "Libraries",
  BACKEND: "Backend",
  DATABASE: "Databases",
  TOOLS: "Tools"
};

const allSkills = [
  // Languages
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.LANGUAGE],
    details: "Core language mastery (2+ years). Expert in ES6+ features, async/await patterns, closure utilization, and Promise chaining. Daily driver for production projects."
  },
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.LANGUAGE],
    details: "Primary language for 1+ year. Advanced type system implementations, interface design, and generic programming. Full-stack integration with modern frameworks."
  },
  {
    name: "Python",
    icon: PythonIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.LANGUAGE],
    details: "2022-2023 main focus. Web scraping automation, data analysis pipelines, and scripting solutions. Currently maintaining legacy projects while transitioning to JS/TS stack."
  },
  {
    name: "C++",
    icon: CppIcon,
    level: ExperienceLevel.BASIC,
    projects: "Few",
    categories: [SkillCategory.LANGUAGE],
    details: "Hobbyist-level exploration of memory management, STL containers, and pointer arithmetic. Experimenting with low-level system concepts."
  },
  {
    name: "PHP",
    icon: PhpIcon,
    level: ExperienceLevel.BASIC,
    projects: "Several",
    categories: [SkillCategory.LANGUAGE],
    details: "Vocational exam preparation (2024). Building basic CMS systems and REST APIs with Laravel. Learning modern practices and OOP patterns."
  },
  {
    name: "HTML",
    icon: HTMLIcon,
    level: ExperienceLevel.EXPERT,
    projects: "Many",
    categories: [SkillCategory.LANGUAGE],
    details: "Semantic markup, accessibility best practices, and modern HTML5 APIs. Foundation of all web development work."
  },
  
  // Frameworks & Libraries
  {
    name: "React",
    icon: ReactIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 7,
    categories: [SkillCategory.FRAMEWORK, SkillCategory.LIBRARY],
    details: "Hooks architecture, Context API, performance optimization, Concurrent Mode. Custom hooks and component composition patterns."
  },
  {
    name: "Next.js",
    icon: NextJsIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 3,
    categories: [SkillCategory.FRAMEWORK, SkillCategory.BACKEND],
    details: "App Router, SSR/ISR, API routes, middleware, and server actions. Modern Next.js patterns and best practices."
  },
  {
    name: "React Native",
    icon: ReactNativeIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 2,
    categories: [SkillCategory.FRAMEWORK],
    details: "Cross-platform mobile development, native modules integration, gesture handling, and React Navigation."
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Several",
    categories: [SkillCategory.FRAMEWORK, SkillCategory.LIBRARY],
    details: "JIT compiler, custom plugins, responsive design patterns. Daily driver for styling modern web applications."
  },
  {
    name: "Redux Toolkit",
    icon: ReduxIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Several",
    categories: [SkillCategory.LIBRARY],
    details: "Slice patterns, RTK Query for API management, middleware configuration. Complex state management solutions."
  },
  {
    name: "Zustand",
    icon: ZustandIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.LIBRARY],
    details: "Simplified state management, reactive stores, TypeScript integration. Lightweight alternative to Redux for smaller projects."
  },
  {
    name: "Lottie",
    icon: LottieIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    categories: [SkillCategory.LIBRARY],
    details: "Complex animations, After Effects integration, dynamic SVG manipulation. Creating engaging user experiences with motion."
  },
  // NEW: React Hook Form
  {
    name: "React Hook Form",
    icon: ReactHookFormIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Several",
    categories: [SkillCategory.LIBRARY],
    details: "Form handling in React with excellent performance. Schema validation integration (e.g. Zod/Yup), dynamic forms, and complex controlled/uncontrolled input scenarios."
  },
  
  // Backend & APIs
  {
    name: "Node.js",
    icon: NodeIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.BACKEND, SkillCategory.FRAMEWORK],
    details: "Daily driver for building production-grade REST APIs, WebSocket servers, and microservices. Expert in event loop optimization and NPM ecosystem."
  },
  {
    name: "Express.js",
    icon: ExpressIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.BACKEND, SkillCategory.FRAMEWORK],
    details: "Advanced middleware patterns, RESTful routing architecture, and database-agnostic service implementations. Authentication middleware and error handling layers."
  },
  {
    name: "FastAPI",
    icon: FastAPIIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    categories: [SkillCategory.BACKEND, SkillCategory.FRAMEWORK],
    details: "2023 primary tool for building high-performance asynchronous endpoints with auto-generated Swagger docs. Strong experience with Pydantic models."
  },
  {
    name: "Flask",
    icon: FlaskIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    categories: [SkillCategory.BACKEND, SkillCategory.FRAMEWORK],
    details: "2022-2023 projects focused on lightweight RESTful services and prototype development. Custom middleware implementations and Jinja2 templating."
  },
  {
    name: "BetterAuth",
    icon: BetterAuthIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 3,
    categories: [SkillCategory.BACKEND, SkillCategory.LIBRARY],
    details: "Modern authentication system implementation using BetterAuth, integrated with Next.js App Router. Session handling, middleware, and custom authentication providers."
  },
  // NEW: Stripe
  {
    name: "Stripe",
    icon: StripeIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Several",
    categories: [SkillCategory.BACKEND, SkillCategory.TOOLS],
    details: "Implemented payment flows using Stripe. Checkout sessions, webhooks handling, subscription logic and integration with full-stack applications."
  },
  
  // Databases
  {
    name: "PostgreSQL",
    icon: PostgresIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    categories: [SkillCategory.DATABASE],
    details: "Advanced query optimization, index management, and ORM integrations. Proficient in complex joins and window functions."
  },
  {
    name: "MS SQL",
    icon: MsSqlIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    categories: [SkillCategory.DATABASE],
    details: "Expert-level T-SQL development, complex stored procedures, and query optimization. Extensive 2023 focus on SSIS packages and data warehousing."
  },
  
  // Tools & DevOps
  {
    name: "Git",
    icon: GitIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Daily",
    categories: [SkillCategory.TOOLS],
    details: "Version control virtuoso - can resolve merge conflicts in my sleep. Comfortable with interactive rebasing, cherry-picking, and stash management."
  },
  {
    name: "VS Code",
    icon: VSCodeIcon,
    level: ExperienceLevel.EXPERT,
    projects: "Daily",
    categories: [SkillCategory.TOOLS],
    details: "My digital canvas - customized to pixel-perfect precision. Extension collection curated over years for the ultimate developer experience."
  },
  {
    name: "Docker",
    icon: DockerIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Several",
    categories: [SkillCategory.TOOLS, SkillCategory.BACKEND],
    details: "Containerization for development and deployment. Docker Compose for multi-container applications and microservices architecture."
  },
  {
    name: "Postman",
    icon: PostmanIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    categories: [SkillCategory.TOOLS],
    details: "API whisperer - crafting request collections that tell stories. Environment variables for seamless context switching between development environments."
  },
  {
    name: "JetBrains",
    icon: JetBrainsIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Frequently",
    categories: [SkillCategory.TOOLS],
    details: "IDE powerhouse - leveraging intelligent code completion and refactoring tools. Database tools integration that makes SQL feel like poetry."
  },
  {
    name: "n8n",
    icon: N8NIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    categories: [SkillCategory.TOOLS, SkillCategory.BACKEND],
    details: "Workflow automation, API integrations, and backend scenarios without extensive coding. Building complex automation workflows and business processes."
  },
  // NEW: Conventional Commits (custom div logo)
  {
    name: "Conventional Commits",
    icon: null,
    customIcon: "conventional-commits",
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    categories: [SkillCategory.TOOLS],
    details: "Consistent commit message conventions across projects. Helps generate changelogs, semantic versioning and keeps git history clean and searchable."
  }
];

const SkillLevelStars = ({ level }) => {
  let stars = 0;
  switch(level) {
    case ExperienceLevel.EXPERT: stars = 5; break;
    case ExperienceLevel.ADVANCED: stars = 4; break;
    case ExperienceLevel.INTERMEDIATE: stars = 3; break;
    case ExperienceLevel.BASIC: stars = 2; break;
    default: stars = 1;
  }
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(stars)].map((_, i) => (
        <div key={`full-${i}`} className="text-yellow-400 w-3 h-3">★</div>
      ))}
      {[...Array(5 - stars)].map((_, i) => (
        <div key={`empty-${i}`} className="text-gray-600 w-3 h-3">☆</div>
      ))}
    </div>
  );
};

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="h-full p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                    hover:bg-white/10 hover:border-white/20 transition-all duration-300
                    flex flex-col gap-3">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0
                        group-hover:scale-110 transition-transform">
            {skill.customIcon === "conventional-commits" ? (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[linear-gradient(45deg,#fe5196,#f77062)]" />
            ) : (
              <Image
                src={skill.icon}
                alt={skill.name}
                width={24}
                height={24}
                className="object-contain"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">{skill.name}</h3>
            <p className="text-gray-400 text-xs">{skill.level}</p>
          </div>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap gap-1">
          {skill.categories.map((cat) => (
            <span 
              key={cat} 
              className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-[10px] border border-white/10"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <SkillLevelStars level={skill.level} />
          <span className="text-xs text-gray-400">
            {typeof skill.projects === 'number' ? `${skill.projects} projects` : skill.projects}
          </span>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-gray-300 leading-relaxed overflow-hidden"
            >
              {skill.details}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [selectedCategories, setSelectedCategories] = useState(new Set(['All']));
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', ...Object.values(SkillCategory)];
  const levels = ['All', ...Object.values(ExperienceLevel)];

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      
      if (category === 'All') {
        return new Set(['All']);
      }
      
      newSet.delete('All');
      
      if (newSet.has(category)) {
        newSet.delete(category);
        if (newSet.size === 0) {
          return new Set(['All']);
        }
      } else {
        newSet.add(category);
      }
      
      return newSet;
    });
  };

  const filteredSkills = allSkills.filter(skill => {
    const categoryMatch = selectedCategories.has('All') || 
                         skill.categories.some(cat => selectedCategories.has(cat));
    const levelMatch = selectedLevel === 'All' || skill.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  // Reset showAll when filters change
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategories, selectedLevel]);

  // Limit to 12 skills initially (3 rows x 4 columns)
  const INITIAL_COUNT = 8;
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, INITIAL_COUNT);
  const hasMore = filteredSkills.length > INITIAL_COUNT;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-24 relative">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700/10 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            My Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-6">
            Skills & Technologies
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills across different domains
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="text-gray-400 w-4 h-4" />
              <span className="text-sm text-gray-400 font-medium">
                Categories {!selectedCategories.has('All') && `(${selectedCategories.size} selected)`}
              </span>
              {!selectedCategories.has('All') && (
                <button
                  onClick={() => setSelectedCategories(new Set(['All']))}
                  className="ml-2 text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.has(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-gradient-to-br from-white to-gray-300 text-black shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="text-gray-400 w-4 h-4" />
              <span className="text-sm text-gray-400 font-medium">Experience Level</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${selectedLevel === level
                      ? 'bg-gradient-to-br from-white to-gray-300 text-black shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 mb-8">
            <p className="text-gray-400 text-lg">No skills match your filters</p>
            <button
              onClick={() => {
                setSelectedCategories(new Set(['All']));
                setSelectedLevel('All');
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Show More/Less Button */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-16"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm
                       hover:bg-white/10 hover:border-white/30 transition-all duration-300
                       flex items-center gap-3"
            >
              <span className="text-white font-medium">
                {showAll ? 'Show Less' : `Show More (${filteredSkills.length - INITIAL_COUNT} hidden)`}
              </span>
              <motion.div
                animate={{ y: showAll ? [-2, 0, -2] : [2, 0, 2] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {showAll ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-3xl font-bold text-white mb-1">{allSkills.length}</p>
            <p className="text-xs text-gray-400">Total Skills</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-3xl font-bold text-white mb-1">
              {allSkills.filter(s => s.level === ExperienceLevel.EXPERT || s.level === ExperienceLevel.ADVANCED).length}
            </p>
            <p className="text-xs text-gray-400">Advanced+</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-3xl font-bold text-white mb-1">{Object.keys(SkillCategory).length}</p>
            <p className="text-xs text-gray-400">Categories</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-3xl font-bold text-white mb-1">3+</p>
            <p className="text-xs text-gray-400">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
