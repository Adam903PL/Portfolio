'use client';
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Users, Clock, Smartphone } from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

// Import all project images
import FlashTalkAi1 from "@/public/img/projectsImg/flashtalkai/flashtalkai1.png";
import FlashTalkAi2 from "@/public/img/projectsImg/flashtalkai/flashtalkai2.png";
import FlashTalkAI4 from "@/public/img/projectsImg/flashtalkai/flashtalkai4.png";
import TechniFees1 from "@/public/img/projectsImg/technifees/TechniFees1.png";
import TechniFees2 from "@/public/img/projectsImg/technifees/TechniFees2.png";
import TechniFees3 from "@/public/img/projectsImg/technifees/TechniFees3.png";
import TechniCloud1 from "@/public/img/projectsImg/TechniCloud/TechniCloud1.png";
import TechniCloud2 from "@/public/img/projectsImg/TechniCloud/TechniCloud2.png";
import TechniCloud3 from "@/public/img/projectsImg/TechniCloud/TechniCloud3.png";
import TechniCloud4 from "@/public/img/projectsImg/TechniCloud/TechniCloud4.png";
import TechniBank1 from "@/public/img/projectsImg/techniBank/techniBank4.png";
import TechniBank2 from "@/public/img/projectsImg/techniBank/techniBank2.png";
import TechniBank3 from "@/public/img/projectsImg/techniBank/techniBank3.png";
import TechniBank4 from "@/public/img/projectsImg/techniBank/techniBank4.png";
import TechniDev1 from "@/public/img/projectsImg/TechniDev/490985909_1734658924074139_4362106034665608999_n.jpg";
import TechniDev2 from "@/public/img/projectsImg/TechniDev/490991417_694956366383522_2853085818927815154_n.jpg";
import TechniDev3 from "@/public/img/projectsImg/TechniDev/490994152_1334489034475467_2926519540342889715_n.jpg";
import TechniDev4 from "@/public/img/projectsImg/TechniDev/491340809_1013435366961696_4223164187108586759_n(1).jpg";
import TechniDev5 from "@/public/img/projectsImg/TechniDev/491340809_1013435366961696_4223164187108586759_n.jpg";
import TaxMaster1 from "@/public/img/projectsImg/TaxMaxster/TaxMaster1.png";
import TaxMaster2 from "@/public/img/projectsImg/TaxMaxster/TaxMaster2.png";
import TaxMaster3 from "@/public/img/projectsImg/TaxMaxster/TaxMaster3.png";
import TaxMaster4 from "@/public/img/projectsImg/TaxMaxster/TaxMaster4.png";
import TaxMaster5 from "@/public/img/projectsImg/TaxMaxster/TaxMaster5.png";
import TaxMaster6 from "@/public/img/projectsImg/TaxMaxster/TaxMaster6.png";
import TaxMaster7 from "@/public/img/projectsImg/TaxMaxster/TaxMaster7.png";
import PackSmart1 from "@/public/img/projectsImg/PackSmart/PackSmart1.png";
import PackSmart2 from "@/public/img/projectsImg/PackSmart/PackSmart2.png";
import PackSmart3 from "@/public/img/projectsImg/PackSmart/PackSmart3.png";
import PackSmart4 from "@/public/img/projectsImg/PackSmart/PackSmart4.png";
import PackSmart5 from "@/public/img/projectsImg/PackSmart/PackSmart5.png";
import PackSmart6 from "@/public/img/projectsImg/PackSmart/PackSmart6.png";
import Whereiparkedmycar1 from "@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar1.jpg";
import Whereiparkedmycar2 from "@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar2.jpg";
import Whereiparkedmycar3 from "@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar3.jpg";
import Whereiparkedmycar4 from "@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar4.jpg";
import Whereiparkedmycar5 from "@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar5.jpg";
import Quietpomodoro1 from "@/public/img/projectsImg/quietpomodoro/quietpomodoro1.jpg";
import Quietpomodoro2 from "@/public/img/projectsImg/quietpomodoro/quietpomodoro2.jpg";
import Quietpomodoro3 from "@/public/img/projectsImg/quietpomodoro/quietpomodoro3.jpg";
import Quietpomodoro4 from "@/public/img/projectsImg/quietpomodoro/quietpomodoro4.jpg";

type ProjectType = "mobile" | "web" | "desktop";

interface Repository {
  name: string;
  link: string;
}

interface Contributor {
  name: string;
  link: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  usedTechnology: string[];
  pictures: StaticImageData[];
  repositories: Repository[];
  liveLink: string;
  type: ProjectType;
  contributors: Contributor[];
  developmentTime?: string;
  playStoreLink?: string;
  comingSoonPlayStore?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Where I Parked My Car",
    description: "A smart mobile app that helps you remember where you parked your car. Save your parking location with just one tap and never lose your car again!",
    usedTechnology: ["React Native", "Expo", "Google Maps API", "AsyncStorage"],
    pictures: [Whereiparkedmycar1, Whereiparkedmycar2, Whereiparkedmycar3, Whereiparkedmycar4, Whereiparkedmycar5],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/WhereIParkedMyCar" },
    ],
    liveLink: "",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.adampukaluk.whereiparkedmycar&pcampaignid=web_share",
    type: "mobile",
    contributors: [{ name: "Adam903PL", link: "https://github.com/Adam903PL" }],
    developmentTime: "1 month",
  },
  {
    id: 2,
    name: "Quiet Pomodoro",
    description: "A minimalist Pomodoro timer app designed to help you focus and boost productivity. Simple, elegant, and distraction-free time management.",
    usedTechnology: ["React Native", "Expo", "AsyncStorage", "React Native Notifications"],
    pictures: [Quietpomodoro1, Quietpomodoro2, Quietpomodoro3, Quietpomodoro4],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/QuietPomodoro" },
    ],
    liveLink: "",
    comingSoonPlayStore: true,
    type: "mobile",
    contributors: [{ name: "Adam903PL", link: "https://github.com/Adam903PL" }],
    developmentTime: "2 weeks",
  },
  {
    id: 3,
    name: "TaxMaster",
    description: "An AI-powered app to assist users in navigating tax laws and financial aspects, providing personalized insights and recommendations.",
    usedTechnology: ["NextJS", "FastAPI", "TreeJS", "Ollama"],
    pictures: [TaxMaster1, TaxMaster2, TaxMaster3, TaxMaster4, TaxMaster5, TaxMaster6, TaxMaster7],
    repositories: [
      { name: "Frontend", link: "https://github.com/Adam903PL/TaxMaster-Frontend" },
      { name: "AI Backend", link: "https://github.com/Adam903PL/TaxMaster-Backend" }
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" },
      { name: "Nejzk", link: "https://github.com/nejzk" }
    ],
    developmentTime: "24h"
  },
  {
    id: 4,
    name: "TechniDev",
    description: "An app to connect developers with people looking to hire them.",
    usedTechnology: ["ReactNative", "Expo"],
    pictures: [TechniDev1, TechniDev2, TechniDev3, TechniDev4, TechniDev5],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/TechniDev" },
    ],
    liveLink: "",
    type: "mobile",
    contributors: [{ name: "Adam903PL", link: "https://github.com/Adam903PL" }],
    developmentTime: "3h",
  },
  {
    id: 5,
    name: "FlashTalkAI",
    description: "AI-powered language learning platform",
    usedTechnology: ["React", "TailwindCSS", "Express.JS", "PostgreSQL", "ChatGPT API"],
    pictures: [FlashTalkAi1, FlashTalkAi2, FlashTalkAI4],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/FlashTalkAI" },
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" },
    ],
    developmentTime: "1 month",
  },
  {
    id: 6,
    name: "PackSmart",
    description: "A web app for sending and receiving parcels via smart lockers.",
    usedTechnology: ["NextJS", "Django"],
    pictures: [PackSmart1, PackSmart2, PackSmart3, PackSmart4, PackSmart5, PackSmart6],
    repositories: [
      {
        name: "Main Repo",
        link: "https://github.com/technischools-lublin/projekt-i-grupa-a-2024-2025-adampukaluk_marcelikarman",
      },
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" },
    ],
    developmentTime: "1 week",
  },
  {
    id: 7,
    name: "TechniFees",
    description: "TechniFees is my first simple app for managing school fees, built with Python, Tkinter",
    usedTechnology: ["Python", "Tkinter", "smtplib", "PostgreSQL"],
    pictures: [TechniFees1, TechniFees2, TechniFees3],
    repositories: [
      { name: "Source Code", link: "https://github.com/Adam903PL/TechniFees" },
    ],
    liveLink: "",
    type: "web",
    contributors: [{ name: "Adam903PL", link: "https://github.com/Adam903PL" }],
  },
  {
    id: 8,
    name: "TechniCloud",
    description: "Basic Mobile APP in React Native",
    usedTechnology: ["React Native"],
    pictures: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/Native-Cloud" },
    ],
    liveLink: "",
    type: "mobile",
    contributors: [{ name: "Adam903PL", link: "https://github.com/Adam903PL" }],
    developmentTime: "2 days",
  },
  {
    id: 9,
    name: "TechniBank",
    description: "Banking system for personal finance management",
    usedTechnology: ["HTML5", "CSS", "JS"],
    pictures: [TechniBank1, TechniBank2, TechniBank3, TechniBank4],
    repositories: [
      { name: "Frontend", link: "https://github.com/Karman1818/TechniBank" },
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" },
    ],
    developmentTime: "1 month",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProjectCard = ({ project, index, hovered, setHovered }: ProjectCardProps) => {
  const isHovered = hovered === index;
  const isMobile = project.type === 'mobile';
  const [activeImage, setActiveImage] = useState(0);

  // Auto-cycle images every 3 seconds when hovered
  useEffect(() => {
    if (!isHovered || project.pictures.length <= 1) {
      setActiveImage(0); // Reset to first image when not hovered
      return;
    }

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.pictures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, project.pictures.length]);
  
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-300 h-[500px]
        ${isMobile ? 'md:col-span-1' : 'md:col-span-1'}
        ${isHovered ? 'scale-[1.02] z-10' : hovered !== null ? 'scale-95 blur-sm brightness-50' : ''}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.pictures[activeImage]}
          alt={project.name}
          fill
          className={`transition-opacity duration-500 ${isMobile ? 'object-contain bg-gray-900' : 'object-cover'}`}
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 space-y-4">
        {/* Play Store Badge - HIGHLIGHTED */}
        {project.playStoreLink && (
          <div className="absolute top-4 left-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white blur-xl opacity-50 animate-pulse"></div>
              <span className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black rounded-full text-xs font-bold shadow-lg shadow-white/50 border-2 border-gray-300">
                <Smartphone className="w-4 h-4 animate-bounce" />
                Available on Play Store
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
          {project.description}
        </p>

        {/* Image Slider Dots */}
        {project.pictures.length > 1 && (
          <div className="flex gap-2 pt-1">
            {project.pictures.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImage(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeImage ? 'bg-white w-8' : 'bg-white/30 w-6'
                }`}
                aria-label={`Show image ${i + 1} of ${project.name}`}
              />
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.usedTechnology.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20"
            >
              {tech}
            </span>
          ))}
          {project.usedTechnology.length > 4 && (
            <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20">
              +{project.usedTechnology.length - 4} more
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {project.developmentTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{project.developmentTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.contributors.length} contributor{project.contributors.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.repositories.map((repo, i) => (
            <a
              key={i}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20 hover:border-white/40 group"
            >
              <Github className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{repo.name}</span>
            </a>
          ))}
          
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/30 hover:border-white/50"
            >
              <ExternalLink className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Live Demo</span>
            </a>
          )}

          {project.playStoreLink && (
            <a
              href={project.playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 backdrop-blur-sm rounded-lg transition-all border-2 border-gray-300/50 hover:border-gray-200 shadow-lg shadow-white/30">
                <Smartphone className="w-4 h-4 text-black" />
                <span className="text-black text-sm font-bold">Download on Play Store</span>
              </div>
            </a>
          )}

          {project.comingSoonPlayStore && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 backdrop-blur-sm rounded-lg border border-gray-500/30">
              <span className="text-gray-300 text-sm font-medium">Coming Soon to Play Store</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProjectsFocusCards() {
  const [hoveredWeb, setHoveredWeb] = useState<number | null>(null);
  const [hoveredMobile, setHoveredMobile] = useState<number | null>(null);

  const webProjects = projects.filter(p => p.type === 'web');
  const mobileProjects = projects.filter(p => p.type === 'mobile');

  return (
    <section className="w-full px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Web Projects Section */}
        <div>
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Web Applications
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-4">
              Full-Stack Web Projects
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl">
              Modern web applications built with React, Next.js, and cutting-edge technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                hovered={hoveredWeb}
                setHovered={setHoveredWeb}
              />
            ))}
          </div>
        </div>

        {/* Mobile Projects Section */}
        <div>
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Mobile Applications
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-4">
              React Native Apps
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl">
              Cross-platform mobile applications with native performance and beautiful UX.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mobileProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                hovered={hoveredMobile}
                setHovered={setHoveredMobile}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}