import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { QrCode } from "lucide-react";

interface WhatsAppQRProps {
  className?: string;
  size?: number;
}

export const WhatsAppQR: React.FC<WhatsAppQRProps> = ({
  className = "",
  size = 168
}) => {
  const { setCursor, resetCursor } = useCursor();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`flex flex-col items-center text-center ${className}`}
      onMouseEnter={() => setCursor("image", "SCAN")}
      onMouseLeave={resetCursor}
    >
      {/* Label Above QR */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-xs font-mono font-bold tracking-widest text-[#F4E4BC] uppercase">
          SCAN TO JOIN
        </span>
      </div>

      {/* QR Code Container with subtle animated glow border */}
      <div className="group relative p-3.5 sm:p-4 rounded-2xl bg-white shadow-[0_0_25px_rgba(212,175,55,0.22)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]/50 hover:ring-[#D4AF37] transition-all duration-300 transform hover:scale-[1.02]">
        {/* Subtle glowing ambient aura behind container */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#F4E4BC]/30 to-[#D4AF37]/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />

        {/* Static, sharp QR Display */}
        <div className="relative bg-white flex items-center justify-center overflow-hidden rounded-lg">
          {!imgError ? (
            <img
              src="/zynova-whatsapp-qr.png"
              alt="ZYNOVA DIGITAL PROFESSIONALS WhatsApp Group QR Code"
              width={size}
              height={size}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain block select-none"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <QRCodeSVG
              value={siteConfig.whatsappGroupURL}
              size={size}
              bgColor="#FFFFFF"
              fgColor="#0B0B0F"
              level="M"
              marginSize={2}
              title="ZYNOVA DIGITAL PROFESSIONALS WhatsApp Group QR Code"
              className="block select-none"
            />
          )}
        </div>
      </div>

      {/* Label Below QR */}
      <p className="text-[11px] sm:text-xs text-slate-400 mt-3 max-w-[220px] leading-relaxed">
        Scan this QR code with your phone camera or WhatsApp to join the ZYNOVA DIGITAL PROFESSIONALS group.
      </p>
    </div>
  );
};
