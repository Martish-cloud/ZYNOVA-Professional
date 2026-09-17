export interface TechnologyItem {
  id: string;
  name: string;
  category: "AI & Automation" | "Frontend" | "Backend" | "Ecosystem & CMS";
  brandColor: string;
}

export const technologiesData: TechnologyItem[] = [
  // AI & Automation
  { id: "openai", name: "OpenAI", category: "AI & Automation", brandColor: "#10A37F" },
  { id: "claude", name: "Claude", category: "AI & Automation", brandColor: "#D97757" },
  { id: "gemini", name: "Gemini", category: "AI & Automation", brandColor: "#4E8DF5" },
  { id: "n8n", name: "n8n", category: "AI & Automation", brandColor: "#EA4B71" },
  { id: "python", name: "Python", category: "AI & Automation", brandColor: "#3776AB" },
  { id: "powerbi", name: "Power BI", category: "AI & Automation", brandColor: "#F2C811" },
  { id: "excel", name: "Excel", category: "AI & Automation", brandColor: "#107C41" },

  // Frontend & Mobile
  { id: "react", name: "React.js", category: "Frontend", brandColor: "#61DAFB" },
  { id: "nextjs", name: "Next.js", category: "Frontend", brandColor: "#FFFFFF" },
  { id: "reactnative", name: "React Native", category: "Frontend", brandColor: "#61DAFB" },
  { id: "typescript", name: "TypeScript", category: "Frontend", brandColor: "#3178C6" },
  { id: "javascript", name: "JavaScript", category: "Frontend", brandColor: "#F7DF1E" },
  { id: "html", name: "HTML5", category: "Frontend", brandColor: "#E34F26" },
  { id: "css", name: "CSS3", category: "Frontend", brandColor: "#1572B6" },

  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend", brandColor: "#5FA04E" },
  { id: "express", name: "Express.js", category: "Backend", brandColor: "#FFFFFF" },
  { id: "nestjs", name: "NestJS", category: "Backend", brandColor: "#E0234E" },
  { id: "php", name: "PHP", category: "Backend", brandColor: "#777BB4" },
  { id: "laravel", name: "Laravel", category: "Backend", brandColor: "#FF2D20" },

  // Ecosystem & CMS
  { id: "wordpress", name: "WordPress", category: "Ecosystem & CMS", brandColor: "#21759B" },
  { id: "git", name: "Git", category: "Ecosystem & CMS", brandColor: "#F05032" }
];
