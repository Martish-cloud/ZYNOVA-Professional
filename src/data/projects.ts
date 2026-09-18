export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Web" | "E-commerce" | "Business" | "Data" | "UI/UX";
  filterCategory: "web" | "ecommerce" | "business" | "data" | "ui-ux";
  shortDesc: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  gradientTheme: string;
  badge: string;
  image: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "bookverse",
    title: "BookVerse",
    subtitle: "Curated Literary Experience & Bookstore",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Digital bookstore featuring interactive excerpt previews, reader reviews, curated staff picks, and personalized reading shelves.",
    overview: "BookVerse was designed to recreate the tactile joy of exploring an independent bookstore in a digital space, highlighting author spotlights, sample chapters, and reading lists.",
    challenge: "Balancing editorial typography with efficient e-commerce mechanics and digital excerpt readers without visual noise.",
    solution: "Designed an elegant serif-enhanced reading typography system with an in-browser sample previewer and custom recommendation engine.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    keyFeatures: [
      "In-browser interactive sample chapter reader",
      "Curated editorial staff picks and seasonal reading challenges",
      "Audiobook sample snippet player with persistent mini-player",
      "User wishlist and reading shelf categorizer",
      "Author interview and bibliography showcases"
    ],
    gradientTheme: "from-amber-950/40 via-orange-950/40 to-slate-900/50",
    badge: "Book Platform",
    image: "/projects/BookVerse.webp"
  },
  {
    id: "travelaya",
    title: "Travelaya",
    subtitle: "Curated Itineraries & Destination Portal",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Immersive travel planning and booking concept with interactive map routes, day-by-day itineraries, flight bookings, and package estimates.",
    overview: "Travelaya guides prospective travelers through evocative photo essays, curated multi-day journey roadmaps, and modular activity bookings across international destinations.",
    challenge: "Presenting multi-destination itineraries with interactive route maps and customizable excursion packages in a cohesive UI.",
    solution: "Built an interactive map timeline showing journey progression, flight search, stay details, and optional excursion add-ons.",
    technologies: ["React.js", "Leaflet / Maps API", "Tailwind CSS", "Framer Motion"],
    keyFeatures: [
      "Interactive day-by-day trip roadmap with map pins",
      "Dynamic cost calculator based on group size and season",
      "Curated travel advice, weather forecasts, and visa guides",
      "Offline itinerary export to PDF format",
      "Inquiry routing for custom bespoke travel requests"
    ],
    gradientTheme: "from-sky-950/40 via-blue-950/40 to-slate-900/50",
    badge: "Travel Platform",
    image: "/projects/TraveLaya.webp"
  },
  {
    id: "bizgrow",
    title: "BizGrow",
    subtitle: "Enterprise Advisory & Growth Portal",
    category: "Business",
    filterCategory: "business",
    shortDesc: "Authoritative corporate business website highlighting enterprise consulting, business intelligence, case studies, and strategic growth pipelines.",
    overview: "BizGrow offers an executive digital presence for consulting firms and B2B enterprises needing to project authority, data analytics, institutional trust, and client value.",
    challenge: "Creating an engaging B2B experience that guides corporate prospects toward booking qualified advisory calls and reviewing strategic outcomes.",
    solution: "Structured a value-first narrative with clear ROI pillars, sector breakdown filters, and integrated consultation scheduling.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Lucide Icons", "Data Analytics"],
    keyFeatures: [
      "Interactive ROI calculator for client business cases",
      "Filtered case study library with strategic outcome breakdowns",
      "Executive leadership profiles with speaking credentials",
      "Multi-step corporate consultation booking form",
      "Compliance, governance, and CSR report download portal"
    ],
    gradientTheme: "from-zinc-900 via-slate-950 to-neutral-900",
    badge: "Business Advisory",
    image: "/projects/BizGrow.webp"
  },
  {
    id: "fitlife",
    title: "FitLife",
    subtitle: "Holistic Health & Fitness Web App",
    category: "UI/UX",
    filterCategory: "ui-ux",
    shortDesc: "Engaging fitness and workout tracker platform featuring workout plans, meal logging, exercise libraries, and progress milestone analytics.",
    overview: "FitLife connects fitness enthusiasts with structured training regimens, macro-tracking dashboards, and comprehensive workout video libraries.",
    challenge: "Motivating consistent daily user interaction through clean visual progress tracking and gamified milestone states.",
    solution: "Crafted high-contrast dark-mode workout displays with animated streak counters, timer components, and calorie progress charts.",
    technologies: ["React.js", "Chart.js", "Tailwind CSS", "Motion"],
    keyFeatures: [
      "Custom interval timer and exercise set logger",
      "Macro and caloric balance interactive breakdown charts",
      "Video exercise demonstrations with form cues",
      "Weekly progression comparison and body stat logging",
      "Community leaderboard and accountability badges"
    ],
    gradientTheme: "from-rose-950/40 via-red-950/40 to-slate-900/50",
    badge: "Fitness Portal",
    image: "/projects/FitLife.webp"
  },
  {
    id: "bloom-beauty",
    title: "Bloom Beauty",
    subtitle: "Luxury Cosmetics & Skincare Commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Sensory e-commerce experience for premium skincare featuring ingredient transparency, skin diagnostic quizzes, and routine builders.",
    overview: "Bloom Beauty celebrates mindful skincare rituals through delicate aesthetics, ingredient glossaries, and custom regimen builder tools.",
    challenge: "Helping consumers determine suitable products for their specific skin type and complexion online.",
    solution: "Engineered an interactive 4-step skin diagnostic quiz that automatically populates an AM/PM regimen bundle with one-click cart addition.",
    technologies: ["Shopify Liquid / React", "Tailwind CSS", "JavaScript", "Framer Motion"],
    keyFeatures: [
      "Interactive 4-step personalized skincare routine builder",
      "Detailed ingredient glossary with benefit explanations",
      "Complexion swatch comparisons in different lighting models",
      "Subscription cadence selection (30, 60, 90 days) with savings",
      "Clean beauty certification indicators and cruelty-free badges"
    ],
    gradientTheme: "from-pink-950/40 via-rose-950/30 to-slate-900/50",
    badge: "Cosmetics E-Commerce",
    image: "/projects/bloom-beauty.webp"
  },
  {
    id: "tastybites",
    title: "TastyBites",
    subtitle: "Artisan Food Delivery & Kitchen Ordering",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Fast, mouth-watering food ordering interface with dish customizations, live order tracking, dietary filters, and express checkout.",
    overview: "TastyBites connects gourmet cloud kitchens and restaurants directly to diners with instant menu browsing and dish modifier customizers.",
    challenge: "Handling complex food customization options (toppings, spice levels, allergens) without friction during checkout.",
    solution: "Created an intuitive modal modifier interface with real-time price updates and dietary tag filtering (Vegan, Gluten-Free, Keto).",
    technologies: ["React.js", "Node.js", "Express.js", "Tailwind CSS"],
    keyFeatures: [
      "Interactive dish customization modal with real-time subtotal updates",
      "Strict allergen and dietary exclusion filtering toggles",
      "Live order cooking and delivery status progress stepper",
      "Instant re-order from previous dining history",
      "Tip calculation and contactless delivery note configurations"
    ],
    gradientTheme: "from-orange-950/40 via-red-950/30 to-slate-900/50",
    badge: "Food Ordering",
    image: "/projects/tastybites.webp"
  },
  {
    id: "mediwell",
    title: "MediWell",
    subtitle: "Modern Patient Portal & Healthcare System",
    category: "Business",
    filterCategory: "business",
    shortDesc: "HIPAA-aware healthcare platform concept featuring specialist appointment booking, medical records, symptom triage, and telemedicine.",
    overview: "MediWell streamlines the healthcare journey for clinical practices and patients, offering secure appointment scheduling and prescription management.",
    challenge: "Designing an accessible interface for patients of all ages while upholding strict healthcare confidentiality principles.",
    solution: "Implemented high-contrast accessible typography, multi-specialist filtering, slot calendars, and simplified document access.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    keyFeatures: [
      "Specialist doctor directory with verified credentials & reviews",
      "Interactive appointment scheduler with calendar sync",
      "Encrypted lab result and prescription download repository",
      "Symptom checker questionnaire with triage recommendations",
      "Telehealth video consultation access portal"
    ],
    gradientTheme: "from-teal-950/40 via-cyan-950/40 to-slate-900/50",
    badge: "Healthcare Platform",
    image: "/projects/MediWell.webp"
  },
  {
    id: "homex",
    title: "HomeX",
    subtitle: "Architectural Real Estate Showcase",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Contemporary real estate discovery portal with virtual property tours, neighborhood amenity scores, architectural floor plans, and mortgage estimators.",
    overview: "HomeX elevates residential and commercial real estate marketing with panoramic imagery, floor plans, and financial calculation tools.",
    challenge: "Presenting multi-faceted property data, high-resolution imagery, and financial models without overwhelming the house-hunter.",
    solution: "Built a split-screen map-and-listing view with interactive mortgage sliders and categorized floor plan overlays.",
    technologies: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    keyFeatures: [
      "Split-screen interactive map and synchronized listing cards",
      "Dynamic mortgage & amortization monthly payment calculator",
      "Interactive architectural floor plan room explorer",
      "Neighborhood walkability, school, and transit score index",
      "Instant private viewing appointment booking form"
    ],
    gradientTheme: "from-stone-900 via-neutral-950 to-slate-950",
    badge: "Real Estate Portal",
    image: "/projects/HomeX.webp"
  },
  {
    id: "petcare",
    title: "PetCare",
    subtitle: "Complete Veterinary & Pet Supplies Hub",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Compassionate pet wellness platform offering veterinary appointment scheduling, breed-specific supplies, auto-ship nutrition, and health profiles.",
    overview: "PetCare serves devoted pet owners by unifying clinic appointments, recurring diet deliveries, and vaccination tracking into one friendly portal.",
    challenge: "Serving dual business models: physical clinical services (vet care) alongside physical retail e-commerce goods.",
    solution: "Designed a pet profile switcher allowing pet parents to manage health appointments and tailored nutrition in a unified dashboard.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "MongoDB"],
    keyFeatures: [
      "Multi-pet health record profiles with vaccination reminders",
      "Vet consultation and grooming appointment booking system",
      "Auto-ship subscription discounts for pet food and medication",
      "Breed and life-stage nutrition recommendation filter",
      "Emergency 24/7 clinic locator with one-tap directions"
    ],
    gradientTheme: "from-yellow-950/30 via-amber-950/30 to-slate-900/50",
    badge: "Pet Care Platform",
    image: "/projects/PetCare.webp"
  },
  {
    id: "trendzo",
    title: "Trendzo",
    subtitle: "Next-Gen Fashion E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "High-converting modern fashion commerce platform with dynamic catalog filtering, instant cart sync, and fluid responsive aesthetics.",
    overview: "Trendzo is a modern fashion e-commerce concept engineered for boutique and high-end apparel brands seeking an editorial aesthetic with high-speed browsing and seamless transactional flows.",
    challenge: "Fashion shoppers demand instantaneous image rendering, fluid size/color selector interactions, and zero-friction checkout flows across both mobile and desktop screens.",
    solution: "Engineered a headless React architecture paired with optimized static image delivery, optimistic cart updates, and an intuitive minimal checkout drawer.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Stripe API", "Framer Motion"],
    keyFeatures: [
      "Dynamic multi-attribute product filtering (size, color, price)",
      "Instant cart slide-out drawer with optimistic state updates",
      "Lookbook gallery with tagged product hotspots",
      "Mobile-first gesture-driven navigation",
      "Optimized Core Web Vitals achieving sub-second page transitions"
    ],
    gradientTheme: "from-purple-900/40 via-indigo-950/40 to-slate-900/50",
    badge: "E-Commerce Concept",
    image: "/projects/Trendzo.webp"
  },
  {
    id: "freshmart",
    title: "FreshMart",
    subtitle: "Hyperlocal Grocery & Produce Platform",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Real-time grocery and fresh produce ordering web platform featuring delivery slot booking, smart categorized search, and one-click re-orders.",
    overview: "FreshMart delivers an intuitive grocery shopping experience designed to handle large-item baskets, recurring orders, and localized delivery time slot allocations.",
    challenge: "Managing extensive category trees and rapid multi-item cart adjustments without causing UI lag or confusing the consumer.",
    solution: "Developed an optimized categorized grid layout with quick-add stepper controls, persistent sticky mini-cart summaries, and automated address verification.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL"],
    keyFeatures: [
      "Categorized fresh produce browse with unit pricing calculators",
      "Automated delivery slot selection & order cut-off reminders",
      "Smart search with instant autocomplete suggestions",
      "One-click repeat order capability for recurring staples",
      "Order status timeline tracking with SMS/email notifications"
    ],
    gradientTheme: "from-emerald-950/40 via-teal-950/40 to-slate-900/50",
    badge: "Grocery Platform",
    image: "/projects/FreshMart.webp"
  },
  {
    id: "techzone",
    title: "TechZone",
    subtitle: "High-Performance Electronics Hub",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Sleek consumer electronics storefront with spec comparisons, warranty add-ons, 360 rotators, and technical product breakdowns.",
    overview: "TechZone bridges technical precision with consumer appeal, presenting detailed technical specifications, interactive side-by-side device comparisons, and bundle discounts.",
    challenge: "Presenting dense technical specifications without overwhelming the buyer or slowing down mobile performance.",
    solution: "Implemented an interactive spec comparison matrix with collapsible technical tabs and high-resolution multi-angle device zooms.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Tailwind CSS"],
    keyFeatures: [
      "Side-by-side spec comparison tool for up to 4 devices",
      "Interactive 360-degree product image rotators",
      "Tiered warranty and accessory bundle selectors",
      "Stock availability checker by postal code",
      "Verified customer review rating breakdown with photo filters"
    ],
    gradientTheme: "from-blue-950/40 via-cyan-950/40 to-slate-900/50",
    badge: "Electronics Store",
    image: "/projects/TechZone.webp"
  },
  {
    id: "learnhub",
    title: "LearnHub",
    subtitle: "Interactive E-Learning Academy",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Modular course platform featuring video lessons, code playground sandboxes, quiz assessments, and certificate generation.",
    overview: "LearnHub provides self-paced technical and creative education through bite-sized modules, interactive coding environments, and progress tracking.",
    challenge: "Maintaining high student engagement and completion rates through clear module hierarchy and progress reinforcement.",
    solution: "Built a distraction-free course player with chapter navigation, note-taking sidebars, and automated completion certificates.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Express.js"],
    keyFeatures: [
      "Distraction-free video lecture theater with adjustable playback speeds",
      "Interactive knowledge check quizzes with instant answer feedback",
      "Gamified course progress bar and chapter completion badges",
      "Downloadable course resource attachments and lecture notes",
      "Automated verification-backed course completion certificates"
    ],
    gradientTheme: "from-violet-950/40 via-purple-950/40 to-slate-900/50",
    badge: "E-Learning Academy",
    image: "/projects/LearnHub.webp"
  },
  {
    id: "amit-halder-portfolio",
    title: "Amit Halder",
    subtitle: "Personal Portfolio & Technology Showcase",
    category: "Business",
    filterCategory: "business",
    shortDesc: "Authoritative personal engineering portfolio highlighting foundational software architectures, GenAI automation, and data analytics leadership.",
    overview: "The personal portfolio for Amit Halder, Founder of Zynova, presenting technical capabilities, engineering philosophy, and cross-disciplinary expertise across AI, automation, web, and business data platforms.",
    challenge: "Communicating multifaceted technical competence (full-stack, automation, data engineering) in a clear, cohesive personal narrative.",
    solution: "Structured a clean developer narrative highlighting verified technical capabilities, architectural principles, and strategic solutions.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Lucide React", "GenAI"],
    keyFeatures: [
      "Executive developer biography and technology expertise breakdown",
      "Curated engineering project highlights with architectural rationales",
      "Direct consultation inquiry form and discovery call linkage",
      "Minimalist dark-mode typography with high readability contrast",
      "Responsive design optimized for international executive viewing"
    ],
    gradientTheme: "from-indigo-950/40 via-slate-900 to-slate-950",
    badge: "Founder Portfolio",
    image: "/projects/amit-halder-portfolio.webp"
  }
];
