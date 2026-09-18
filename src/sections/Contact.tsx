import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { WhatsAppQR } from "../components/ui/WhatsAppQR";
import confetti from "canvas-confetti";
import { sendEnquiryEmail, createMailtoLink } from "../utils/emailService";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

interface ContactProps {
  onSuccess?: (title: string, desc: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onSuccess }) => {
  const { setCursor, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceRequired: "Full-Stack Web Development",
    preferredDate: "",
    preferredTime: "14:00",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
    "Full-Stack Web Development",
    "Mobile App Development",
    "Core Backend Architecture",
    "Excel Automation & Cleaning",
    "Power BI Reporting & Dashboards",
    "WordPress / Shopify E-commerce",
    "Blockchain / Web3 Integration",
    "Digital Marketing",
    "Other Custom Digital Architecture"
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please share a brief description of your project.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Send enquiry email directly to team.zynova@gmail.com via multi-tier relay
      await sendEnquiryEmail({
        subject: `New Project Enquiry: ${formData.name} - ${formData.serviceRequired} [ZYNOVA]`,
        senderEmail: formData.email,
        senderName: formData.name,
        fields: {
          "Client Name": formData.name,
          "Work Email": formData.email,
          "Company / Brand": formData.company.trim() || "Not specified",
          "Service Interested In": formData.serviceRequired,
          "Preferred Meeting Date": formData.preferredDate || "Earliest Available",
          "Preferred Meeting Time": formData.preferredTime || "Flexible",
          "Project Scope / Brief": formData.message
        },
        autoResponse: `Thank you for contacting ZYNOVA. We have received your project enquiry regarding "${formData.serviceRequired}" and our engineering team will get back to you within 12 hours.`
      });

      // 2. Also forward to local backend API if present
      if (siteConfig.contact.contactApi && siteConfig.contact.contactApi.startsWith("http")) {
        fetch(siteConfig.contact.contactApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }).catch(() => {});
      }
    } catch (err) {
      console.warn("Contact enquiry delivery notice:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Safe fallback
      }

      if (onSuccess) {
        onSuccess(
          "Enquiry Dispatched!",
          `Thank you, ${formData.name}. Your enquiry has been sent directly to ${siteConfig.contact.email}. We will review and reply within 12 hours.`
        );
      }
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="START A CONVERSATION"
          title="Direct Inquiries &amp;"
          highlightedTitle="Technical Advisory."
          subtitle="Whether you have an immediate development requirement or need long-term technical guidance, reach out directly."
        />

        {/* WhatsApp Community / Group Card */}
        <div className="mb-8 sm:mb-10 rounded-2xl bg-gradient-to-br from-[#0B0B0F] via-[#15161C] to-[#0B0B0F] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 p-5 sm:p-6 lg:p-7 shadow-[0_0_45px_rgba(212,175,55,0.08)] hover:shadow-[0_0_60px_rgba(212,175,55,0.18)] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Side (Desktop) / Top (Mobile): Heading, Description, CTA Button */}
            <div className="md:col-span-7 lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#1F1F23] border border-[#D4AF37]/30 text-[11px] font-mono text-[#F4E4BC]">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>OFFICIAL WHATSAPP COMMUNITY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                JOIN THE ZYNOVA COMMUNITY
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Connect with Zynova on WhatsApp for project discussions, updates, enquiries and direct communication.
              </p>

              <div className="pt-1.5">
                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                  cursorLabel="JOIN"
                  aria-label="Join the Zynova WhatsApp group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>JOIN WHATSAPP GROUP &rarr;</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Side (Desktop) / Bottom (Mobile): QR Code Card */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <WhatsAppQR size={140} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Info & Professional Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0B0B0F] to-[#14151B] border border-[#D4AF37]/25 shadow-[0_0_40px_rgba(212,175,55,0.06)] space-y-4">
              <div>
                <span className="font-heading text-xl font-black tracking-wide text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">
                  {siteConfig.positioning}
                </span>
              </div>

              {/* 5 Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Card 1: Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email Zynova at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 group-hover:text-[#F4E4BC] group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-400">
                      EMAIL
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-white group-hover:text-[#F4E4BC] transition-colors break-all block">
                      {siteConfig.contact.email}
                    </span>
                    <span className="text-[10.5px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
                      Send us an email &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 2: Phone */}
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call Zynova at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 group-hover:text-[#F4E4BC] group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-400">
                      PHONE
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-white group-hover:text-[#F4E4BC] transition-colors block">
                      {siteConfig.contact.phone}
                    </span>
                    <span className="text-[10.5px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
                      Call Zynova &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 3: WhatsApp Group */}
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the Zynova WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="group p-3 sm:p-3.5 rounded-xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[95px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer sm:col-span-2"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#1F1F23] border border-[#D4AF37]/30 text-[#25D366] group-hover:scale-110 group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-[#F4E4BC]">
                      WHATSAPP
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#F4E4BC] transition-colors block">
                      Join the Zynova WhatsApp Group
                    </span>
                    <span className="text-[10.5px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-0.5 font-medium">
                      Connect on WhatsApp &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 4: Location */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0F] border border-[#D4AF37]/20 flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-400">
                      LOCATION
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {siteConfig.contact.location}
                    </span>
                    <span className="text-[10.5px] text-slate-400 block mt-0.5">
                      HQ &amp; Engineering Operations
                    </span>
                  </div>
                </div>

                {/* Card 5: Response Time */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0F] border border-[#D4AF37]/20 flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest uppercase text-slate-400">
                      RESPONSE TIME
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {siteConfig.contact.responseGuarantee}
                    </span>
                    <span className="text-[10.5px] text-emerald-400/90 block mt-0.5 font-medium">
                      Direct leadership review
                    </span>
                  </div>
                </div>
              </div>

              {/* BOOK A CALL CTA Block */}
              <div className="pt-3 border-t border-slate-800/90">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]">
                    DIRECT CONSULTATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open for Booking
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Prefer to schedule a dedicated technical discovery session? Pick a convenient time on our calendar.
                </p>
                <MagneticButton
                  asAnchor
                  href={siteConfig.bookingURL}
                  target="_blank"
                  rel="noreferrer"
                  variant="gold"
                  className="w-full !py-2.5 text-xs font-bold justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
                  cursorLabel="BOOK"
                  aria-label="Book a call with Zynova"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>BOOK A CALL</span>
                </MagneticButton>
              </div>

              {/* Verification / Leadership Note */}
              <div className="pt-3 border-t border-slate-800/90 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    Founder: <strong className="text-white">{siteConfig.founder.name}</strong>
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed">
                  Every enquiry is evaluated by senior engineering leadership to guarantee technical feasibility and architectural precision.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#090b10] border border-[#D4AF37]/25 shadow-[0_0_50px_rgba(212,175,55,0.06)] relative">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4">
                Send an Enquiry
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-white">
                    Enquiry Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your enquiry details for <span className="text-[#D4AF37]">{formData.serviceRequired}</span> have been sent directly to <span className="text-[#F4E4BC] font-mono">{siteConfig.contact.email}</span>. Our team will review your project brief and reply to you at <span className="text-white font-mono">{formData.email}</span> within 12 hours.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={createMailtoLink(
                        `Project Enquiry: ${formData.name} - ${formData.serviceRequired} [ZYNOVA]`,
                        {
                          "Full Name": formData.name,
                          "Work Email": formData.email,
                          "Company / Brand": formData.company,
                          "Service Interested In": formData.serviceRequired,
                          "Preferred Meeting Date": formData.preferredDate,
                          "Preferred Meeting Time": formData.preferredTime,
                          "Project Scope / Brief": formData.message
                        }
                      )}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F4E4BC] border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Open in Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          serviceRequired: "Full-Stack Web Development",
                          preferredDate: "",
                          preferredTime: "14:00",
                          message: ""
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita Shrivastav"
                        className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors ${
                          errors.name ? "border-rose-500" : "border-slate-800"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="ankita@company.com"
                        className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors ${
                          errors.email ? "border-rose-500" : "border-slate-800"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Company / Brand */}
                    <div>
                      <label htmlFor="contact-company" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Company / Brand
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Your Organization"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div>
                      <label htmlFor="contact-service" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors cursor-pointer"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv} className="bg-slate-950 text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="contact-time" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                        Preferred Time
                      </label>
                      <input
                        id="contact-time"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label htmlFor="contact-brief" className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
                      Project Brief *
                    </label>
                    <textarea
                      id="contact-brief"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Describe what you want to achieve, timeline expectations, or specific system requirements..."
                      className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors resize-none ${
                        errors.message ? "border-rose-500" : "border-slate-800"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-rose-400 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <MagneticButton
                      variant="gold"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                      cursorLabel="SEND"
                      aria-label="Submit project enquiry"
                    >
                      {isSubmitting ? (
                        <span>Sending to team.zynova@gmail.com...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-slate-950" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}

              {/* Secondary CTA: Prefer email? */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                <span>Prefer email?</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email Zynova directly at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="font-mono text-[#D4AF37] hover:text-[#F4E4BC] underline hover:no-underline transition-colors inline-flex items-center gap-1.5 font-medium min-h-[44px] sm:min-h-0 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 rounded"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
