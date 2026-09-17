export interface SiteConfig {
  brandName: string;
  tagline: string;
  positioning: string;
  founder: {
    name: string;
    role: string;
    location: string;
    bio: string;
  };
  metrics: {
    responseTime: string;
    industriesServed: string;
    projectsServed: string;
    clientOwnership: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    responseGuarantee: string;
    formSubmitEndpoint: string;
  };
  bookingURL: string;
  freelancePlatforms: {
    fiverr: string;
    freelancer: string;
    truelancer: string;
    peoplePerHour: string;
    upwork: string;
  };
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
  };
  navigation: Array<{ name: string; href: string }>;
}

export const siteConfig: SiteConfig = {
  brandName: "ZYNOVA",
  tagline: "BUILD. AUTOMATE. SCALE.",
  positioning: "Premium Digital Solutions & Software Development",
  founder: {
    name: "Amit Halder",
    role: "Founder & Technology Specialist",
    location: "West Bengal, India",
    bio: "Engineering high-performance digital products, intelligent automation workflows, and actionable business intelligence for forward-thinking enterprises."
  },
  metrics: {
    responseTime: "12 Hours",
    industriesServed: "8+",
    projectsServed: "35+",
    clientOwnership: "100%"
  },
  contact: {
    email: "team.zynova@gmail.com",
    phone: "+91 (Connect via Discovery Call)",
    location: "West Bengal, India",
    responseGuarantee: "Response within 12 Hours",
    formSubmitEndpoint: "https://formsubmit.co/ajax/team.zynova@gmail.com"
  },
  bookingURL: "#",
  freelancePlatforms: {
    fiverr: "#",
    freelancer: "#",
    truelancer: "#",
    peoplePerHour: "#",
    upwork: "#"
  },
  socialLinks: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    instagram: "#"
  },
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Data & BI", href: "#data-solutions" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-zynova" },
    { name: "Contact", href: "#contact" }
  ]
};
