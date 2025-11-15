"use client";

import EducationJourney from "@/components/Education";

import { 
  GraduationCap, School, Gamepad, Bot, 
  FileCode, Award
} from "lucide-react";

// ===== ICON MAP (ikon nie przekazujesz jako JSX!) =====
export const iconMap = {
  robot: Bot,
  gamepad: Gamepad,
  python: FileCode,
  school: School,
  "graduation-cap": GraduationCap,
};

// ============ Education Data ============
const ExperienceLevel = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert"
};

const educationData = [
  {
    year: "2015 - 2018",
    title: "Early Programming – Robotics",
    institution: "Self-Learning (LEGO Mindstorms EVO)",
    description:
      "Started programming at age 9 using LEGO Mindstorms EVO. Built autonomous robots, learning logic, problem-solving and basic programming foundations.",
    skills: ["Robotics", "Logic", "LEGO", "Automation"],
    level: ExperienceLevel.ADVANCED,
    icon: "robot",
    color: "from-purple-500 to-pink-500",
    bgGlow: "rgba(168, 85, 247, 0.2)",
  },
  {
    year: "2021",
    title: "Scratch – Creative Coding",
    institution: "Self-Learning",
    description:
      "Transitioned to Scratch, creating interactive games and animations while improving logical thinking and game design fundamentals.",
    skills: ["Scratch", "Game Design", "Animation"],
    level: ExperienceLevel.EXPERT,
    icon: "gamepad",
    color: "from-orange-500 to-yellow-500",
    bgGlow: "rgba(251, 146, 60, 0.2)",
  },
  {
    year: "2022",
    title: "Python & Unreal Engine",
    institution: "Self-Learning",
    description:
      "Learned Python basics and explored Unreal Engine scripting. Created simple 3D interactions and game mechanics.",
    skills: ["Python", "Unreal Engine", "Game Development"],
    level: ExperienceLevel.ADVANCED,
    icon: "python",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "rgba(59, 130, 246, 0.2)",
  },
  {
    year: "2015 - 2018",
    title: "Primary School No. 32",
    institution: "Lublin",
    description:
      "First years of formal education. Foundation years in mathematics, creativity and basic computer skills.",
    skills: ["Elementary Education"],
    level: ExperienceLevel.EXPERT,
    icon: "school",
    color: "from-green-500 to-emerald-500",
    bgGlow: "rgba(34, 197, 94, 0.2)",
  },
  {
    year: "2018 - 2023",
    title: "Primary School No. 15",
    institution: "Lublin",
    description:
      "Completed middle education. Strengthened analytical thinking and early programming interest.",
    skills: ["General Education"],
    level: ExperienceLevel.EXPERT,
    icon: "school",
    color: "from-[#00bd95] to-[#00FFC9]",
    bgGlow: "rgba(0, 189, 149, 0.2)",
  },
  {
    year: "2023 - Present",
    title: "Technischools – Full-Stack Development",
    institution: "Technischools Lublin",
    description:
      "Currently studying programming, IT systems, and full-stack development. Building real applications and improving modern web development skills.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "SQL","Python",'Kotlin',"React Native","And more..."],
    level: ExperienceLevel.ADVANCED,
    icon: "graduation-cap",
    color: "from-[#00FFC9] to-[#00bd95]",
    bgGlow: "rgba(0, 255, 201, 0.2)",
  },
];

// ============ Stats ============
const stats = [
  {
    icon: GraduationCap,
    value: 6,
    label: "Education Stages"
  },
  {
    icon: Award,
    value: 2,
    label: "Intermediate+"
  },
];

// ============ PAGE ============
export default function Page() {
  return (
    <EducationJourney
      data={educationData}
      iconMap={iconMap}  // <-- WAŻNE!
      header={{
        subtitle: "My Journey",
        title: "Education & Learning Path",
        description: "From fundamentals to practical full-stack development",
      }}
      stats={stats}
      showStats={true}
      showStars={true}
      levelConfig={{
        Expert: 5,
        Advanced: 4,
        Intermediate: 3,
        Basic: 2,
        Beginner: 1,
      }}
    />
  );
}
