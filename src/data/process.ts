export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
  icon: string;
}

export const processData: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand your requirements, goals, audience, and challenges.",
    details: "We start by dissecting the operational friction, target audience profile, and business objectives to establish measurable targets.",
    icon: "Compass"
  },
  {
    number: "02",
    title: "PLAN",
    description: "Define the solution, technology stack, and project roadmap.",
    details: "Architectural blueprints, data schema maps, API specifications, and phased delivery milestones are crystallized before writing code.",
    icon: "Map"
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Create the user experience, interaction system, and visual direction.",
    details: "High-fidelity wireframes, interactive component states, typography hierarchy, and motion prototypes that reflect executive polish.",
    icon: "Palette"
  },
  {
    number: "04",
    title: "BUILD",
    description: "Develop the website, application, automation, or dashboard.",
    details: "Writing clean, scalable, type-safe code using modern engineering frameworks, modular components, and automated tests.",
    icon: "Code2"
  },
  {
    number: "05",
    title: "TEST",
    description: "Test functionality, responsiveness, usability, and performance.",
    details: "Rigorous cross-browser evaluation, mobile device testing, load verification, formula validation, and accessibility compliance checks.",
    icon: "CheckCircle2"
  },
  {
    number: "06",
    title: "DELIVER",
    description: "Launch and hand over the completed solution with 100% client ownership.",
    details: "Production deployment, domain setup, repository transfer, environment provisioning, and complete client handover with documentation.",
    icon: "Rocket"
  },
  {
    number: "07",
    title: "SUPPORT",
    description: "Provide ongoing communication and support when required.",
    details: "Post-launch maintenance, optimization reviews, scheduled data pipeline monitoring, and responsive assistance when business needs grow.",
    icon: "LifeBuoy"
  }
];
