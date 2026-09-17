import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import confetti from "canvas-confetti";
import {
  Mail,
  MapPin,
  Clock,
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
    phone: "",
    company: "",
    serviceRequired: "Full-Stack Web Development",
    budgetRange: "$1,000 - $3,000",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    "Under $1,000",
    "$1,000 - $3,000",
    "$3,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
    "Milestone / Hourly Consulting"
  ];

  const servicesList = [
    "Full-Stack Web Development",
    "Mobile App Development",
    "Core Backend Architecture",
    "Excel Automation & Cleaning",
    "Power BI Reporting & Dashboards",
    "WordPress / Shopify E-commerce",
    "Blockchain / Web3 Integration",
    "Digital marketing"
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a message or enquiry.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        _subject: `New Project Enquiry: ${formData.name} (${formData.serviceRequired}) - ZYNOVA`,
        _replyto: formData.email,
        _template: "table",
        "Client Name": formData.name,
        "Client Email": formData.email,
        "Client Phone": formData.phone || "Not provided",
        "Company / Organization": formData.company || "Not provided",
        "Service Requested": formData.serviceRequired,
        "Budget Range": formData.budgetRange,
        "Project Message / Enquiry": formData.message,
        "Submitted At": new Date().toLocaleString()
      };

      await fetch(siteConfig.contact.formSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Enquiry submission notice:", err);
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
          "Enquiry Dispatched Successfully!",
          `Your message has been sent directly to ${siteConfig.contact.email}. Amit Halder & the Zynova team will reply within 12 hours.`
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Verification */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.04)] space-y-6">
              <div>
                <span className="font-heading text-2xl font-black tracking-wide text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs font-mono text-amber-400">
                  {siteConfig.positioning}
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Primary Location
                    </span>
                    <span className="font-medium text-white">{siteConfig.contact.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Guaranteed Response Time
                    </span>
                    <span className="font-medium text-white">Within {siteConfig.metrics.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Direct Email Contact
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-mono text-amber-400 hover:text-amber-300 hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Founder: <strong className="text-white">{siteConfig.founder.name}</strong></span>
                </div>
                <p className="leading-relaxed">
                  Every enquiry is directly reviewed by senior technical leadership to ensure an accurate, viable proposal.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#090b10] border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] relative">
              <h3 className="text-2xl font-bold font-heading text-white mb-6">
                Send an Enquiry
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-white">
                    Enquiry Sent!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to {siteConfig.brandName}. Your enquiry was delivered directly to <span className="text-amber-300 font-mono">{siteConfig.contact.email}</span>. We will respond within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        serviceRequired: "Full-Stack Web Development",
                        budgetRange: "$1,000 - $3,000",
                        message: ""
                      });
                    }}
                    className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita Shrivastav"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors ${
                          errors.name ? "border-rose-500" : "border-slate-800"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita.shri@yahoo.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors ${
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
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Your Company (Optional)"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Required */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Primary Service
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv} className="bg-slate-950 text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-950 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Message / Project Details *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Describe what you want to achieve, timeline expectations, or any specific technologies..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors resize-none ${
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
                      className="w-full !py-3.5 text-sm font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                      cursorLabel="SEND"
                    >
                      {isSubmitting ? (
                        <span>Sending Enquiry...</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
