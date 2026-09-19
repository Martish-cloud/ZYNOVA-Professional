import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, CheckCircle2, X } from "lucide-react";

interface PaymentCelebrationModalProps {
  isOpen: boolean;
  amount: number;
  donorName?: string;
  onClose: () => void;
  autoCloseMs?: number;
}

export const PaymentCelebrationModal: React.FC<PaymentCelebrationModalProps> = ({
  isOpen,
  amount,
  donorName,
  onClose,
  autoCloseMs = 3800
}) => {
  useEffect(() => {
    if (!isOpen) return;

    // Trigger subtle luxury gold/amber confetti burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#F4E4BC", "#F59E0B", "#FBBF24", "#FFFFFF"],
        ticks: 200,
        gravity: 0.9,
        scalar: 0.9
      });
    } catch {
      // Safe fallback
    }

    // Auto dismiss after specified duration
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contribution Confirmation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Ambient background golden radiance */}
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-amber-500/20 via-yellow-500/20 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e101a] via-[#090b14] to-[#05060a] border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.25)] text-center space-y-5 animate-in zoom-in-95 duration-300"
      >
        {/* Dismiss button */}
        <button
          onClick={onClose}
          aria-label="Close thank you celebration"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-mono font-semibold tracking-wider text-amber-300 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Verified Contribution</span>
        </div>

        {/* Central Icon with Golden Halo */}
        <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-400/20 to-amber-600/20 border border-amber-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <Heart className="w-8 h-8 text-amber-300 fill-amber-300/30 animate-pulse" />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Wishing & Thank-You Headline */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
            Thank You!
          </h3>
          {donorName && donorName.trim() && donorName.toLowerCase() !== "anonymous" && (
            <p className="text-xs font-mono text-amber-300/90 font-medium">
              Dear {donorName}
            </p>
          )}
        </div>

        {/* Amount Display */}
        <div className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-500/30">
          <span className="block text-[11px] font-mono uppercase tracking-widest text-slate-400">
            Contribution Amount
          </span>
          <span className="text-3xl sm:text-4xl font-black font-heading text-amber-300 tracking-tight block mt-0.5">
            ₹{amount.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">
            &bull; Confirmed &amp; Recorded in Monthly Pool
          </span>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
          Your voluntary contribution was verified and added to the <strong className="text-amber-200">Zynova -Solutions Gives Back</strong> community transparency pool.
        </p>

        {/* Progress return notice */}
        <div className="pt-2 text-[11px] font-mono text-slate-500">
          Updating Monthly Transparency live &bull; returning to page...
        </div>
      </div>
    </div>
  );
};
