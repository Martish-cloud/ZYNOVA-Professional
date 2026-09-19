import React, { useState, useEffect } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { donationConfig } from "../config/donationConfig";
import { useCursor } from "../context/useCursor";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { PaymentCelebrationModal } from "../components/ui/PaymentCelebrationModal";
import {
  Heart,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  Lock,
  Coins,
  Send,
  Loader2,
  Info,
  Building,
  CreditCard
} from "lucide-react";

interface TransparencyData {
  currentMonthVerified: number;
  totalVerified: number;
  totalDistributed: number;
  latestDistribution: {
    month: string;
    amountDistributed: number;
    recipientName: string;
    cause: string;
    distributionDate: string | null;
  } | null;
  recipientStatus: string;
}

export const ZynovaGivesBack: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  // Contribution state
  const [selectedPreset, setSelectedPreset] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<string>("");

  // Current effective contribution amount
  const effectiveAmount = isCustom
    ? Number(customAmount) || 0
    : selectedPreset;

  // Validate amount whenever custom amount or preset changes
  useEffect(() => {
    if (isCustom) {
      const parsed = Number(customAmount);
      if (!customAmount || isNaN(parsed) || parsed < donationConfig.minimumDonation) {
        setAmountError(`Minimum contribution is ${donationConfig.currencySymbol}${donationConfig.minimumDonation}.`);
      } else {
        setAmountError("");
      }
    } else {
      setAmountError("");
    }
  }, [customAmount, isCustom]);

  // UPI ID copy state
  const upiId = "askfor.amithalder@okaxis";
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  const handleCopyUpi = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Optional reconciliation form state
  const [showConfirmationForm, setShowConfirmationForm] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [transactionRef, setTransactionRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Online checkout & celebration states
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    amount: number;
    donorName?: string;
  } | null>(null);

  // Monthly transparency stats from backend (Source of truth)
  const [transparency, setTransparency] = useState<TransparencyData>({
    currentMonthVerified: 0,
    totalVerified: 0,
    totalDistributed: 0,
    latestDistribution: null,
    recipientStatus: "To be announced"
  });

  // Polling for live updates every 20 seconds (Section 11)
  useEffect(() => {
    let isMounted = true;
    const fetchTransparency = async () => {
      try {
        const response = await fetch(donationConfig.api.transparency);
        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const json = await response.json();
            if (json.success && json.data && isMounted) {
              setTransparency(json.data);
            }
          }
        }
      } catch {
        // Retain last known verified figures without flashing zero or fake numbers
      }
    };

    fetchTransparency();
    const pollInterval = setInterval(fetchTransparency, 20000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  const handlePresetClick = (amount: number) => {
    setIsCustom(false);
    setSelectedPreset(amount);
    setCustomAmount("");
    setAmountError("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setIsCustom(true);
  };

  // Helper to dynamically load Razorpay Standard Checkout SDK
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Instant Verified Online Payment (Razorpay / UPI / Cards)
  const handleOnlinePayment = async () => {
    if (effectiveAmount < donationConfig.minimumDonation) {
      setAmountError(
        `Contribution amount must be at least ${donationConfig.currencySymbol}${donationConfig.minimumDonation}.`
      );
      return;
    }

    setIsCheckingOut(true);

    try {
      // 1. Create order on backend
      const orderRes = await fetch(donationConfig.api.createOrder, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency: donationConfig.currency,
          donorName: donorName.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined
        })
      });

      const orderData = await orderRes.json().catch(() => ({}));
      const orderId = orderData.orderId || `order_${Date.now()}`;
      const keyId = orderData.keyId || donationConfig.razorpayKeyId || "rzp_test_zynova";

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !(window as any).Razorpay) {
        // Fallback to manual UPI QR if script loading is blocked
        alert("Payment gateway checkout could not be loaded. Please scan the UPI QR code below to contribute.");
        setIsCheckingOut(false);
        return;
      }

      const options = {
        key: keyId,
        amount: Math.round(effectiveAmount * 100),
        currency: "INR",
        name: "ZYNOVA",
        description: "Zynova Gives Back - Verified Contribution",
        image: "/favicon.svg",
        order_id: keyId.startsWith("rzp_") && !keyId.includes("test_zynova") ? orderId : undefined,
        handler: async (response: any) => {
          // 2. Cryptographic Server-Side Verification (CRITICAL per section 5)
          try {
            const verifyRes = await fetch(donationConfig.api.verifyPayment, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
                orderId: response.razorpay_order_id || orderId,
                signature: response.razorpay_signature,
                amount: effectiveAmount,
                donorName: donorName.trim() || undefined,
                donorEmail: donorEmail.trim() || undefined
              })
            });

            const verifyData = await verifyRes.json().catch(() => ({}));

            if (verifyRes.ok && verifyData.verified) {
              // 3. Update transparency stats immediately from verified server data
              if (verifyData.stats) {
                setTransparency(verifyData.stats);
              } else {
                const fresh = await fetch(donationConfig.api.transparency).then((r) => r.json()).catch(() => ({}));
                if (fresh.data) setTransparency(fresh.data);
              }

              // 4. Trigger Wishing / Celebration animation strictly after server verification
              setCelebrationData({
                isOpen: true,
                amount: effectiveAmount,
                donorName: donorName.trim() || undefined
              });
            } else {
              alert("Payment verification could not be completed by server. If amount was deducted, it will be reconciled automatically.");
            }
          } catch (err) {
            console.error("Verification call error:", err);
          } finally {
            setIsCheckingOut(false);
          }
        },
        prefill: {
          name: donorName.trim() || undefined,
          email: donorEmail.trim() || undefined
        },
        theme: {
          color: "#D4AF37"
        },
        modal: {
          ondismiss: () => {
            // Cancelled or dismissed -> do NOT count, do NOT trigger celebration
            setIsCheckingOut(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (errResponse: any) => {
        console.warn("Payment failed:", errResponse.error);
        setIsCheckingOut(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Online checkout error:", err);
      setIsCheckingOut(false);
    }
  };

  const handleReconciliationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!transactionRef.trim()) {
      setFormError("Transaction / UTR Reference ID is required to reconcile contributions.");
      return;
    }

    if (effectiveAmount < donationConfig.minimumDonation) {
      setFormError(`Contribution amount must be at least ${donationConfig.currencySymbol}${donationConfig.minimumDonation}.`);
      return;
    }

    // Explicit security check
    const upperRef = transactionRef.toUpperCase();
    if (upperRef.includes("PIN") || upperRef.includes("OTP") || upperRef.includes("CVV")) {
      setFormError("Please enter only your transaction/reference ID. Never submit banking PIN or OTP.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(donationConfig.api.submitDonation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          donorName: donorName.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined,
          amount: effectiveAmount,
          currency: donationConfig.currency,
          transactionReference: transactionRef.trim(),
          paymentMethod: "UPI",
          anonymous: !donorName.trim()
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmissionSuccess(true);
        setTransactionRef("");
        if (data.stats) {
          setTransparency(data.stats);
        }
        // Trigger wishing celebration
        setCelebrationData({
          isOpen: true,
          amount: effectiveAmount,
          donorName: donorName.trim() || undefined
        });
      } else {
        setFormError(data.message || "Failed to submit reconciliation details. Please try again.");
      }
    } catch {
      setFormError("Network error. Your contribution was made via UPI; you can submit reference verification later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="gives-back"
      className="relative py-14 sm:py-18 md:py-20 bg-[#050609] overflow-hidden text-slate-200 border-t border-amber-500/15"
    >
      {/* Warm Ambient Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-500/[0.04] via-amber-500/[0.035] to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 right-0 w-[450px] h-[450px] bg-amber-600/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          badge={donationConfig.copy.sectionTag}
          badgeVariant="gold"
          title="Small Donation."
          highlightedTitle="Big Impact."
          subtitle={donationConfig.copy.description}
          align="center"
        />

        {/* Supporting Slogan Banner */}
        <div className="text-center -mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
              {donationConfig.copy.subheadline}
            </span>
          </div>
        </div>

        {/* Main Content Layout: Desktop 2-Columns / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 sm:mb-14">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Showcase Banner Visual & "HOW IT WORKS" Timeline */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Charity Showcase Visual */}
            <div
              className="relative group rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-amber-900/20 to-slate-900/40 border border-amber-500/25 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.12)] overflow-hidden transition-all duration-300"
              onMouseEnter={() => setCursor("image", "GIVE")}
              onMouseLeave={resetCursor}
            >
              <div className="overflow-hidden rounded-[14px] sm:rounded-[22px] bg-[#0c0d14]">
                <img
                  src={donationConfig.showcaseImage}
                  alt="Zynova Gives Back - Small Donation Big Impact"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  loading="lazy"
                />
              </div>

              {/* Subtle visual badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl bg-[#080910]/85 backdrop-blur-md border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white font-heading">
                      Zynova Community Collective
                    </h4>
                    <p className="text-[11px] text-amber-200/70">
                      100% Voluntary Contributions &bull; Transparent Allocation
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Monthly Cycle
                </span>
              </div>
            </div>

            {/* HOW IT WORKS TIMELINE */}
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-b from-slate-900/70 to-[#07080f]/90 border border-slate-800/90 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800/80">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-wide uppercase">
                  How It Works
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "CONTRIBUTE",
                    desc: "Choose any amount from ₹5 upward and contribute using the available UPI payment method."
                  },
                  {
                    step: "02",
                    title: "VERIFY",
                    desc: "Contributions are reconciled using available transaction/reference information."
                  },
                  {
                    step: "03",
                    title: "MONTHLY REVIEW",
                    desc: "At the end of each monthly cycle, the available contribution pool is reviewed."
                  },
                  {
                    step: "04",
                    title: "DISTRIBUTE",
                    desc: "Funds are allocated toward verified charitable initiatives / eligible recipients."
                  },
                  {
                    step: "05",
                    title: "REPORT",
                    desc: "Publish a monthly transparency report showing the verified collection and distribution information."
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 tracking-wider font-heading uppercase">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Amount Selection, QR Code Card & Reconciliation */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0e101b] via-[#090b14] to-[#06070d] border border-amber-500/25 shadow-[0_10px_50px_rgba(0,0,0,0.85)] space-y-4">
              {/* Header inside card */}
              <div className="border-b border-amber-500/20 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                      Choose Contribution Amount
                    </h3>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-amber-300/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Min ₹{donationConfig.minimumDonation}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Select a preset amount or type any custom contribution (minimum ₹5, no upper limit).
                </p>
              </div>

              {/* Preset Buttons Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {donationConfig.presetAmounts.map((amt) => {
                  const isActive = !isCustom && selectedPreset === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetClick(amt)}
                      onMouseEnter={() => setCursor("button", "GIVE")}
                      onMouseLeave={resetCursor}
                      className={`py-1.5 px-1 text-center rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105"
                          : "bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-amber-400/50"
                      }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="customDonationAmount"
                  className="block text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider"
                >
                  Or Enter Custom Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-amber-400 font-bold text-sm">₹</span>
                  </div>
                  <input
                    id="customDonationAmount"
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={handleCustomChange}
                    onMouseEnter={() => setCursor("input")}
                    onMouseLeave={resetCursor}
                    placeholder="Enter custom amount (e.g. 250)"
                    className={`w-full pl-7 pr-3.5 py-2 rounded-lg bg-slate-900/80 border text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all font-mono ${
                      amountError && isCustom
                        ? "border-rose-500 focus:ring-rose-500/40"
                        : "border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/30"
                    }`}
                  />
                </div>
                {amountError && isCustom && (
                  <p className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    {amountError}
                  </p>
                )}
              </div>

              {/* Active Amount Display */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300 font-mono">
                  Selected Contribution:
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-300 font-mono">
                  {effectiveAmount >= donationConfig.minimumDonation
                    ? `Contribution Amount: ₹${effectiveAmount.toLocaleString("en-IN")}`
                    : "Enter valid amount"}
                </span>
              </div>

              {/* ============================================================ */}
              {/* SCAN TO CONTRIBUTE - UPI QR Image Card */}
              {/* ============================================================ */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#06070d] border border-amber-500/30 shadow-inner space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-heading text-xs font-bold tracking-wider text-white uppercase">
                      Scan To Contribute
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Instant UPI
                  </span>
                </div>

                {/* Scannable QR Container - High contrast, uncropped quiet zone */}
                <div
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-lg bg-white shadow-xl max-w-[210px] sm:max-w-[230px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
                  onMouseEnter={() => setCursor("image", "SCAN")}
                  onMouseLeave={resetCursor}
                >
                  <img
                    src={donationConfig.qrCodeImage}
                    alt="Scan to pay via UPI"
                    className="w-full h-auto object-contain select-none pointer-events-auto"
                    style={{ imageRendering: "auto" }}
                  />
                </div>

                <p className="text-center text-xs text-slate-400 font-medium">
                  {donationConfig.copy.scanInstruction}
                </p>

                {/* 1-Click Copy UPI ID */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
                  <div className="truncate pr-2">
                    <span className="text-slate-500 block text-[10px]">UPI ID:</span>
                    <span className="text-amber-200 font-medium">{upiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    onMouseEnter={() => setCursor("button", "COPY")}
                    onMouseLeave={resetCursor}
                    className="px-2.5 py-1.5 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    aria-label="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Online Contribution Button */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleOnlinePayment}
                    disabled={isCheckingOut || effectiveAmount < donationConfig.minimumDonation}
                    onMouseEnter={() => setCursor("button", "GIVE")}
                    onMouseLeave={resetCursor}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Connecting Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-slate-950" />
                        <span>PAY ₹{effectiveAmount.toLocaleString("en-IN")} INSTANTLY (UPI / CARDS)</span>
                      </>
                    )}
                  </button>

                  {donationConfig.upiPaymentURL ? (
                    <a
                      href={donationConfig.upiPaymentURL}
                      onMouseEnter={() => setCursor("button", "GIVE")}
                      onMouseLeave={resetCursor}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>OPEN UPI INTENT APP</span>
                    </a>
                  ) : null}
                </div>

                {/* Privacy & Security Note */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200/80">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Security Notice:</strong> We will never ask for your UPI PIN, OTP, CVV, or passwords. Only use your genuine UPI app to approve payments.
                  </span>
                </div>
              </div>

              {/* ============================================================ */}
              {/* DONATION RECONCILIATION TOGGLE & FORM */}
              {/* ============================================================ */}
              <div className="pt-2 border-t border-slate-800/80 space-y-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-2.5">
                    After completing your contribution, you may use the confirmation option below.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowConfirmationForm(!showConfirmationForm)}
                    onMouseEnter={() => setCursor("button")}
                    onMouseLeave={resetCursor}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{showConfirmationForm ? "Hide Confirmation Option" : "I HAVE COMPLETED MY CONTRIBUTION"}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showConfirmationForm ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {showConfirmationForm && (
                  <form
                    onSubmit={handleReconciliationSubmit}
                    className="p-5 rounded-2xl bg-[#080912] border border-amber-500/25 space-y-4 animate-in fade-in duration-300"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                        Record Contribution Reference
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {donationConfig.copy.reconciliationNotice}
                    </p>

                    {submissionSuccess ? (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs space-y-2">
                        <div className="flex items-center gap-2 font-bold text-emerald-300">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Contribution Recorded</span>
                        </div>
                        <p className="leading-relaxed">
                          {donationConfig.copy.postSubmissionNote}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Optional Donor Name */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Your Name (Optional)
                            </label>
                            <input
                              type="text"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              placeholder="Anonymous"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          {/* Optional Donor Email */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Email (Optional)
                            </label>
                            <input
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              placeholder="For transparency updates"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Amount (prefilled) */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Contribution Amount
                            </label>
                            <input
                              type="text"
                              disabled
                              value={`₹${effectiveAmount}`}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold text-xs"
                            />
                          </div>

                          {/* Transaction Reference / UTR (Required) */}
                          <div>
                            <label className="block text-[11px] font-mono text-slate-300 mb-1">
                              Transaction / UTR ID *
                            </label>
                            <input
                              type="text"
                              required
                              value={transactionRef}
                              onChange={(e) => setTransactionRef(e.target.value)}
                              placeholder="e.g. 425619874561"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        {formError && (
                          <p className="text-xs text-rose-400 font-medium">{formError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={() => setCursor("button")}
                          onMouseLeave={resetCursor}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-heading font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Recording...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit For Reconciliation</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MONTHLY TRANSPARENCY & RECIPIENT DASHBOARD */}
        {/* ============================================================ */}
        <div
          className="p-5 sm:p-6 lg:p-7 rounded-2xl bg-gradient-to-b from-[#090a12] via-[#07080e] to-[#040508] border border-amber-500/20 shadow-2xl mb-8 sm:mb-10"
          onMouseEnter={() => setCursor("link", "VIEW")}
          onMouseLeave={resetCursor}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide">
                  Monthly Transparency
                </h3>
                <p className="text-xs text-slate-400">
                  Verified collections, allocations, and verified recipient distributions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-emerald-400">
                Audited Monthly Cycle
              </span>
            </div>
          </div>

          {/* Transparency Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {/* Current Month */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Current Month</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-white">
                <AnimatedCounter value={transparency.currentMonthVerified} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">Verified Contributions</span>
            </div>

            {/* Total Verified Contributions */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Total Verified</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-300">
                <AnimatedCounter value={transparency.totalVerified} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">All-Time Cumulative Pool</span>
            </div>

            {/* Total Distributed */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Total Distributed</span>
              <div className="text-xl sm:text-2xl font-black font-heading text-emerald-400">
                <AnimatedCounter value={transparency.totalDistributed} />
              </div>
              <span className="text-[10.5px] text-slate-500 block mt-1">Directly Allocated to Causes</span>
            </div>

            {/* Latest Distribution */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Latest Distribution</span>
              <span className="text-base sm:text-lg font-bold font-heading text-slate-300 block truncate">
                {transparency.latestDistribution ? transparency.latestDistribution.month : "Not yet available"}
              </span>
              <span className="text-[10.5px] text-slate-500 block mt-1">
                {transparency.latestDistribution
                  ? `₹${transparency.latestDistribution.amountDistributed.toLocaleString("en-IN")} Allocated`
                  : "Pending Next Cycle Review"}
              </span>
            </div>
          </div>

          {/* Charity Recipient Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900/90 to-[#0c0e18] border border-amber-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10.5px] font-mono text-amber-300/80 uppercase tracking-wider block">
                  Charity Recipient
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                  Status: {transparency.recipientStatus}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  When a verified recipient is selected for the monthly cycle, official registration details, cause, and distribution documentation will be published here.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Monthly Cycle
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* REGULATORY / TRANSPARENCY DISCLAIMER */}
        {/* ============================================================ */}
        <div className="p-5 rounded-2xl bg-[#06070d]/80 border border-slate-800/80 text-center max-w-4xl mx-auto">
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {donationConfig.copy.disclaimer}
          </p>
        </div>
      </div>

      {/* Payment Celebration / Wishing Modal */}
      {celebrationData && (
        <PaymentCelebrationModal
          isOpen={celebrationData.isOpen}
          amount={celebrationData.amount}
          donorName={celebrationData.donorName}
          onClose={() => setCelebrationData(null)}
        />
      )}
    </section>
  );
};
