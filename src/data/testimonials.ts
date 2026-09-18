export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  service: string;
  review: string;
  rating: number;
  avatar: string; // Initials (e.g., "AM") or an image URL
  isSample: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-1",
    name: "Arjun Mehta",
    role: "Business Consultant",
    company: "GrowthEdge Consulting",
    country: "India",
    flag: "🇮🇳",
    service: "Business Website & Automation",
    review:
      "ZYNOVA helped us turn our ideas into a clean and professional digital solution. The communication was clear, the workflow was structured, and the final result was easy for our team to work with.",
    rating: 5.0,
    avatar: "AM",
    isSample: true
  },
  {
    id: "testimonial-2",
    name: "Priya Sharma",
    role: "Operations Manager",
    company: "NextWave Solutions",
    country: "India",
    flag: "🇮🇳",
    service: "Excel Dashboard & Reporting",
    review:
      "The Excel dashboard made our reporting process much easier to understand. The data was organized clearly and the dashboard gave our team a much better view of our operational KPIs.",
    rating: 5.0,
    avatar: "PS",
    isSample: true
  },
  {
    id: "testimonial-3",
    name: "Rahul Kapoor",
    role: "Founder",
    company: "UrbanScale Digital",
    country: "India",
    flag: "🇮🇳",
    service: "Power BI Dashboard",
    review:
      "We needed a simple way to visualize our business data, and the Power BI solution provided a much clearer picture of our performance. The dashboard was structured around the metrics that mattered to us.",
    rating: 5.0,
    avatar: "RK",
    isSample: true
  },
  {
    id: "testimonial-4",
    name: "Daniel Wilson",
    role: "Project Manager",
    company: "Northstar Business Solutions",
    country: "United Kingdom",
    flag: "🇬🇧",
    service: "Web Application Development",
    review:
      "The development process was well organized from start to finish. ZYNOVA understood the requirements quickly and delivered a modern interface with a strong focus on usability.",
    rating: 5.0,
    avatar: "DW",
    isSample: true
  },
  {
    id: "testimonial-5",
    name: "Sophia Martinez",
    role: "Marketing Director",
    company: "BrightPath Media",
    country: "United States",
    flag: "🇺🇸",
    service: "AI Automation & Workflow",
    review:
      "The automation workflow helped streamline several repetitive tasks in our process. I particularly appreciated the structured approach to understanding our requirements before implementation.",
    rating: 5.0,
    avatar: "SM",
    isSample: true
  },
  {
    id: "testimonial-6",
    name: "Lucas Moreau",
    role: "Business Analyst",
    company: "NovaCore Consulting",
    country: "France",
    flag: "🇫🇷",
    service: "Data Analytics & BI",
    review:
      "The reporting solution presented our data in a much more accessible way. The visualizations were clean, and the overall dashboard structure made it easier to identify important business metrics.",
    rating: 5.0,
    avatar: "LM",
    isSample: true
  }
];
