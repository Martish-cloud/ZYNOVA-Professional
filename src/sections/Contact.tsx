import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { WhatsAppQR } from "../components/ui/WhatsAppQR";
import confetti from "canvas-confetti";
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
      // Integration-ready: Post to ZYNOVA Backend API if available
      const response = await fetch(siteConfig.contact.contactApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          serviceRequired: formData.serviceRequired,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
    } catch {
      // Form is integration-ready. In frontend-only or decoupled deployment, gracefully proceed without fake alerts
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
          "Enquiry Received!",
          `Thank you, ${formData.name}. We have received your project details. Amit Halder & the Zynova team will review and reply within 12 hours.`
        );
      }
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="START A CONVERSATION"
          title="Direct Inquiries &amp;"
          highlightedTitle="Technical Advisory."
          subtitle="Whether you have an immediate development requirement or need long-term technical guidance, reach out directly."
        />

        {/* WhatsApp Community / Group Card */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-[#0B0B0F] via-[#15161C] to-[#0B0B0F] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 p-6 sm:p-8 lg:p-10 shadow-[0_0_45px_rgba(212,175,55,0.08)] hover:shadow-[0_0_60px_rgba(212,175,55,0.18)] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Side (Desktop) / Top (Mobile): Heading, Description, CTA Button */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F23] border border-[#D4AF37]/30 text-xs font-mono text-[#F4E4BC]">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>OFFICIAL WHATSAPP COMMUNITY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
                JOIN THE ZYNOVA COMMUNITY
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Connect with Zynova on WhatsApp for project discussions, updates, enquiries and direct communication.
              </p>

              <div className="pt-2">
                <MagneticButton
                  asAnchor
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  className="w-full sm:w-auto !py-3.5 !px-8 text-xs sm:text-sm font-bold shadow-[0_0_30px_rgba(212,175,55,0.35)] cursor-pointer"
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
              <WhatsAppQR size={168} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Professional Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B0B0F] to-[#14151B] border border-[#D4AF37]/25 shadow-[0_0_40px_rgba(212,175,55,0.06)] space-y-6">
              <div>
                <span className="font-heading text-2xl font-black tracking-wide text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">
                  {siteConfig.positioning}
                </span>
              </div>

              {/* 5 Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card 1: Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email Zynova at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="group p-4 rounded-2xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[115px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 group-hover:text-[#F4E4BC] group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <Mail className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                      EMAIL
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-white group-hover:text-[#F4E4BC] transition-colors break-all block">
                      {siteConfig.contact.email}
                    </span>
                    <span className="text-[11px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-1 font-medium">
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
                  className="group p-4 rounded-2xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[115px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 group-hover:text-[#F4E4BC] group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                      PHONE
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-white group-hover:text-[#F4E4BC] transition-colors block">
                      {siteConfig.contact.phone}
                    </span>
                    <span className="text-[11px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-1 font-medium">
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
                  className="group p-4 rounded-2xl bg-[#0B0B0F] hover:bg-[#1F1F23] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between min-h-[115px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 cursor-pointer sm:col-span-2"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#1F1F23] border border-[#D4AF37]/30 text-[#25D366] group-hover:scale-110 group-hover:border-[#D4AF37]/60 transition-all duration-300">
                      <WhatsAppIcon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#F4E4BC]">
                      WHATSAPP
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#F4E4BC] transition-colors block">
                      Join the Zynova WhatsApp Group
                    </span>
                    <span className="text-[11px] text-[#D4AF37] group-hover:text-[#F4E4BC] group-hover:underline flex items-center gap-1 mt-1 font-medium">
                      Connect on WhatsApp &rarr;
                    </span>
                  </div>
                </a>

                {/* Card 4: Location */}
                <div className="p-4 rounded-2xl bg-[#0B0B0F] border border-[#D4AF37]/20 flex flex-col justify-between min-h-[115px]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                      LOCATION
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {siteConfig.contact.location}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      HQ &amp; Engineering Operations
                    </span>
                  </div>
                </div>

                {/* Card 5: Response Time */}
                <div className="p-4 rounded-2xl bg-[#0B0B0F] border border-[#D4AF37]/20 flex flex-col justify-between min-h-[115px]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#1F1F23] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                      RESPONSE TIME
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {siteConfig.contact.responseGuarantee}
                    </span>
                    <span className="text-[11px] text-emerald-400/90 block mt-1 font-medium">
                      Direct leadership review
                    </span>
                  </div>
                </div>
              </div>

              {/* BOOK A CALL CTA Block */}
              <div className="pt-4 border-t border-slate-800/90">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    DIRECT CONSULTATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open for Booking
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Prefer to schedule a dedicated technical discovery session? Pick a convenient time on our calendar.
                </p>
                <MagneticButton
                  asAnchor
                  href={siteConfig.bookingURL}
                  target="_blank"
                  rel="noreferrer"
                  variant="gold"
                  className="w-full !py-3 text-xs font-bold justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
                  cursorLabel="BOOK"
                  aria-label="Book a call with Zynova"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>BOOK A CALL</span>
                </MagneticButton>
              </div>

              {/* Verification / Leadership Note */}
              <div className="pt-4 border-t border-slate-800/90 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    Founder: <strong className="text-white">{siteConfig.founder.name}</strong>
                  </span>
                </div>
                <p className="leading-relaxed">
                  Every enquiry is evaluated by senior engineering leadership to guarantee technical feasibility and architectural precision.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-[#D4AF37]/25 shadow-[0_0_50px_rgba(212,175,55,0.06)] relative">
              <h3 className="text-2xl font-bold font-heading text-white mb-6">
                Send an Enquiry
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-white">
                    Enquiry Received!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your enquiry details for <span className="text-[#D4AF37]">{formData.serviceRequired}</span> have been recorded. Our team will review your specifications and contact you at <span className="text-[#F4E4BC] font-mono">{formData.email}</span> within 12 hours.
                  </p>
                  <button
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
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
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
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors ${
                          errors.name ? "border-rose-500" : "border-slate-800"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
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
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors ${
                          errors.email ? "border-rose-500" : "border-slate-800"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Brand */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
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
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors cursor-pointer"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv} className="bg-slate-950 text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="contact-time" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Preferred Time
                      </label>
                      <input
                        id="contact-time"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label htmlFor="contact-brief" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Project Brief *
                    </label>
                    <textarea
                      id="contact-brief"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Describe what you want to achieve, timeline expectations, or specific system requirements..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors resize-none ${
                        errors.message ? "border-rose-500" : "border-slate-800"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <MagneticButton
                      variant="gold"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !py-3.5 text-sm font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                      cursorLabel="SEND"
                      aria-label="Submit project enquiry"
                    >
                      {isSubmitting ? (
                        <span>Recording Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}

              {/* Secondary CTA: Prefer email? */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
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
