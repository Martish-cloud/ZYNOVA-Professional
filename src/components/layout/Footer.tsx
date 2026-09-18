import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { ArrowUp, Sparkles, MapPin, Clock, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Data & BI", href: "#data-solutions" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-zynova" },
    { name: "Contact", href: "#contact" }
  ];

  const serviceLinks = [
    { name: "Full-Stack MERN Development", href: "#services" },
    { name: "Mobile Apps (Flutter & React Native)", href: "#services" },
    { name: "Enterprise Backend Architecture", href: "#services" },
    { name: "Excel Data Cleaning & Automation", href: "#data-solutions" },
    { name: "Advanced Power BI Dashboards", href: "#data-solutions" },
    { name: "Blockchain & Web3 Integrations", href: "#services" },
    { name: "Shopify & E-Commerce Engineering", href: "#services" }
  ];

  const platformKeys: Array<keyof typeof siteConfig.freelancePlatforms> = [
    "upwork",
    "fiverr",
    "freelancer",
    "peoplePerHour",
    "truelancer"
  ];

  return (
    <footer className="relative bg-transparent border-t border-slate-800/80 pt-20 pb-12 overflow-hidden text-slate-400">
      {/* Ambient glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-cyan-500/15 to-transparent blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#hero"
              onMouseEnter={() => setCursor("link")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#090b14] rounded-[6px] flex items-center justify-center">
                  <span className="font-heading font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-sm">
                    Z
                  </span>
                </div>
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-wider text-white flex items-center gap-1">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_6px_#38bdf8]" />
              </span>
            </a>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Premium digital technology and software solutions studio. We engineer resilient digital architectures, automated systems, and data intelligence that drive tangible business growth.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email Zynova at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="text-slate-200 hover:text-cyan-300 transition-colors hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded py-1 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call Zynova at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="text-slate-200 hover:text-cyan-300 transition-colors hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded py-1 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* WhatsApp Community */}
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the Zynova WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="text-slate-200 hover:text-cyan-300 transition-colors hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded py-1 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  Join our WhatsApp Group &rarr;
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-200 py-0.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 text-slate-200 py-0.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Response Guarantee: {siteConfig.contact.responseGuarantee}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="text-slate-300 hover:text-cyan-300 transition-colors inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Capabilities */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="text-slate-300 hover:text-purple-300 transition-colors inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Available Platforms */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Freelance Hubs</span>
            </h4>
            <p className="text-xs text-slate-300 mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Engage Zynova securely via leading contract and freelance platforms:
            </p>
            <div className="flex flex-wrap gap-2">
              {platformKeys.map((key) => {
                const url = siteConfig.freelancePlatforms[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 transition-all capitalize shadow-md"
                  >
                    {key}
                  </a>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
              <span className="text-[11px] text-slate-400 block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Direct Inquiries:
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    aria-label={`Email Zynova at ${siteConfig.contact.email}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="text-cyan-400 hover:text-cyan-300 hover:underline drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] inline-flex items-center min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    aria-label={`Call Zynova at ${siteConfig.contact.phone}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="text-slate-300 hover:text-cyan-300 hover:underline drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] inline-flex items-center min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Community */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] mb-1">
                  WhatsApp Community
                </span>
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the Zynova WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="text-xs text-[#D4AF37] hover:text-[#F4E4BC] hover:underline font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] inline-flex items-center gap-1.5 py-1 min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 rounded cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Join our WhatsApp Group &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            <span>&copy; 2026 {siteConfig.brandName}. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-slate-200 font-medium">
              Founded by <span className="text-white font-semibold">{siteConfig.founder.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              BUILD &bull; AUTOMATE &bull; SCALE
            </span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-2 rounded-full bg-slate-900 border border-slate-700/70 hover:border-cyan-400 hover:text-cyan-300 text-slate-300 transition-all shadow-md cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
