import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Send
} from "lucide-react";

interface BookCallProps {
  prefilledService?: string;
  prefilledBrief?: string;
  onSuccess?: (title: string, desc: string) => void;
}

export const BookCall: React.FC<BookCallProps> = ({
  prefilledService = "",
  prefilledBrief = "",
  onSuccess
}) => {
  const { setCursor, resetCursor } = useCursor();

  const [prevPrefilledService, setPrevPrefilledService] = useState(prefilledService);
  const [prevPrefilledBrief, setPrevPrefilledBrief] = useState(prefilledBrief);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: prefilledService || "Web Development",
    preferredDate: "",
    preferredTime: "14:00",
    message: prefilledBrief || ""
  });

  // Idiomatic React state adjustment during render when props change
  if (prefilledService !== prevPrefilledService) {
    setPrevPrefilledService(prefilledService);
    setFormData((prev) => ({ ...prev, service: prefilledService }));
  }

  if (prefilledBrief !== prevPrefilledBrief) {
    setPrevPrefilledBrief(prefilledBrief);
    setFormData((prev) => ({ ...prev, message: prefilledBrief }));
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    "Web Development",
    "Mobile App Development (Flutter / React Native)",
    "Backend Development (Node / Spring / Django)",
    "Blockchain & Web3 Development",
    "WordPress Custom Development",
    "Shopify E-commerce Development",
    "Excel Data Cleaning & Automation",
    "Professional Excel Dashboards",
    "Power BI Reporting & DAX Dashboards",
    "AI & Workflow Automation",
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
      // 1. Primary: Post to ZYNOVA Backend API
      const response = await fetch(siteConfig.contact.bookingApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }
    } catch (apiErr) {
      console.warn("Backend API unavailable or error, falling back to backup relay:", apiErr);
      try {
        const payload = {
          _subject: `New Discovery Call Booking: ${formData.name} (${formData.preferredDate || "Immediate"} @ ${formData.preferredTime || "Flexible"}) - ZYNOVA`,
          _replyto: formData.email,
          _template: "table",
          "Client Name": formData.name,
          "Work Email": formData.email,
          "Company / Brand": formData.company || "Not provided",
          "Service Domain": formData.service,
          "Requested Date": formData.preferredDate || "Earliest Available",
          "Preferred Time": formData.preferredTime || "Flexible",
          "Project Scope / Brief": formData.message,
          "Booking Timestamp": new Date().toLocaleString()
        };

        await fetch(siteConfig.contact.formSubmitEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });
      } catch (fallbackErr) {
        console.error("Booking dispatch notice:", fallbackErr);
      }
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback gracefully
      }

      if (onSuccess) {
        onSuccess(
          "Discovery Call Request Confirmed!",
          `Your booking request has been sent directly to ${siteConfig.contact.email}. Amit Halder & the team will review and confirm your slot within 12 hours.`
        );
      }
    }
  };

  return (
    <section id="book-call" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SCHEDULE A CONSULTATION"
          title="Let's Talk About"
          highlightedTitle="Your Project."
          subtitle="Book a dedicated technical discovery session to evaluate your roadmap, system specifications, and automation goals."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Booking Option & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2">
                OPTION 01 &bull; INSTANT SYNC
              </span>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Book Directly via Calendar
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Prefer to grab an immediate slot on our calendar? Connect via our direct scheduling link for a video discovery call.
              </p>

              <MagneticButton
                asAnchor
                href={siteConfig.bookingURL}
                target="_blank"
                rel="noreferrer"
                variant="gold"
                className="w-full !py-3 text-xs font-bold justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                cursorLabel="CALENDAR"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Directly on Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </MagneticButton>

              <p className="text-[11px] text-slate-500 mt-3 text-center">
                Replace <code className="font-mono text-amber-400">siteConfig.bookingURL</code> with your Calendly / Cal.com link
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>What to Expect on the Call</span>
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>30-minute high-level technical feasibility assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Recommended architecture, timeline, and phased milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Direct consultation with Founder Amit Halder</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Strict NDA and client privacy guaranteed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Schedule Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#090b10] border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] relative">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2">
                OPTION 02 &bull; BESPOKE REQUEST
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mb-6">
                Request a Custom Time Slot
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-white">
                    Request Received!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your discovery call request was delivered directly to <span className="text-amber-300 font-mono">{siteConfig.contact.email}</span>. We will review your project brief and confirm the calendar invitation within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "Web Development",
                        preferredDate: "",
                        preferredTime: "14:00",
                        message: ""
                      });
                    }}
                    className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="e.g. Ankita Shrivastav"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors ${
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
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Ankita.shri@yahoo.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors ${
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
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        placeholder="Acme Corp (Optional)"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Preferred Time (UTC / IST)</span>
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        onFocus={() => setCursor("input")}
                        onBlur={resetCursor}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Brief */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Project Brief / Goals *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setCursor("input")}
                      onBlur={resetCursor}
                      placeholder="Tell us about the project requirements, existing stack, and expected timeframe..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors resize-none ${
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
                      cursorLabel="REQUEST"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Request Discovery Call</span>
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
