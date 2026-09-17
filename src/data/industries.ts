export interface IndustryItem {
  name: string;
  description: string;
  icon: string;
  tag: string;
}

export const industriesData: IndustryItem[] = [
  {
    name: "E-commerce & Retail",
    description: "High-speed storefronts, custom checkout funnels, inventory syncing, and automated customer notifications.",
    icon: "ShoppingBag",
    tag: "High Conversion"
  },
  {
    name: "Technology & SaaS",
    description: "Multi-tenant cloud architectures, modern frontends, developer APIs, and resilient data processing systems.",
    icon: "Cpu",
    tag: "Scalable Core"
  },
  {
    name: "Healthcare & Wellness",
    description: "Patient appointment scheduling, digital medical intake portals, and secure telemetry data dashboards.",
    icon: "HeartPulse",
    tag: "Security First"
  },
  {
    name: "Education & EdTech",
    description: "Self-paced course portals, interactive knowledge checks, student progress dashboards, and automated certificates.",
    icon: "GraduationCap",
    tag: "Interactive UX"
  },
  {
    name: "Travel & Hospitality",
    description: "Dynamic destination itinerary explorers, interactive booking maps, seasonal rate calculators, and inquiry forms.",
    icon: "Compass",
    tag: "Immersive Design"
  },
  {
    name: "Food & Culinary",
    description: "Mobile-optimized restaurant ordering, dish modifier builders, kitchen ticket queues, and delivery tracking.",
    icon: "UtensilsCrossed",
    tag: "Real-time Flow"
  },
  {
    name: "Fitness & Lifestyle",
    description: "Workout habit trackers, interactive nutrition scorecards, member subscription engines, and coaching portals.",
    icon: "Activity",
    tag: "Engaging Motion"
  },
  {
    name: "Real Estate & Architecture",
    description: "Interactive architectural floor plans, spatial discovery filters, mortgage calculators, and viewing schedulers.",
    icon: "Building2",
    tag: "Visual Richness"
  },
  {
    name: "Professional Services",
    description: "Corporate advisory portals, automated executive PDF reports, client onboarding questionnaires, and ROI calculators.",
    icon: "Briefcase",
    tag: "Executive Trust"
  },
  {
    name: "Startups & Innovators",
    description: "Rapid MVP prototyping, investor pitch demo builds, automated workflows, and agile scalable foundations.",
    icon: "Rocket",
    tag: "Fast Go-to-Market"
  }
];
