import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { testimonialsData } from "../data/testimonials";
import { useCursor } from "../context/useCursor";
import { Star, CheckCircle2, Globe2, Sparkles } from "lucide-react";

const ClientAvatar: React.FC<{ name: string; avatar: string; image?: string }> = ({
  name,
  avatar,
  image
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[1.5px] shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
      <div className="w-full h-full rounded-full bg-[#080a12] flex items-center justify-center overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-heading font-extrabold text-xs text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
            {avatar}
          </span>
        )}
      </div>
    </div>
  );
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((starNum) => {
          const isFull = rating >= starNum;
          const isHalf = !isFull && rating >= starNum - 0.5;

          if (isFull) {
            return (
              <Star
                key={starNum}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]"
              />
            );
          }
          if (isHalf) {
            return (
              <span key={starNum} className="relative inline-block w-3.5 h-3.5 overflow-hidden">
                <Star className="w-3.5 h-3.5 text-amber-400/25" />
                <span className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]" />
                </span>
              </span>
            );
          }
          return (
            <Star
              key={starNum}
              className="w-3.5 h-3.5 text-amber-400/25"
            />
          );
        })}
      </div>
      <span className="text-[11px] font-mono font-bold text-amber-300/90 ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const globalMarkets = [
    { name: "India", flag: "🇮🇳" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" },
    { name: "France", flag: "🇫🇷" }
  ];

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-amber-500/10 overflow-hidden text-slate-200"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/[0.035] via-yellow-500/[0.02] to-transparent rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-600/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge="CLIENT TESTIMONIALS"
          title="What Our Clients"
          highlightedTitle="Say."
          subtitle="Feedback from businesses and professionals who have worked with ZYNOVA across technology, automation, data analytics and digital solutions."
          badgeVariant="gold"
          align="center"
        />

        {/* Testimonials 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setCursor("project", "READ")}
              onMouseLeave={resetCursor}
              className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900/85 via-[#090b14]/90 to-[#06070d]/95 border border-amber-500/20 hover:border-amber-400/55 p-4.5 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.14)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
            >
              {/* Large Subtle Decorative Quotation Watermark */}
              <span
                aria-hidden="true"
                className="absolute -top-3 right-4 font-serif text-6xl sm:text-7xl text-amber-400/[0.06] group-hover:text-amber-400/[0.12] transition-colors pointer-events-none select-none leading-none z-0"
              >
                &ldquo;
              </span>

              {/* Inner Card Top Content */}
              <div className="relative z-10 space-y-3">
                {/* Client Profile Header & Rating */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar with Image and Initials Fallback */}
                    <ClientAvatar
                      name={item.name}
                      avatar={item.avatar}
                      image={item.image}
                    />

                    {/* Client Name & Designation */}
                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {!item.isSample && (
                          <span
                            title="Verified Client"
                            className="text-amber-400 inline-flex items-center"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </h3>
                      <p className="text-[11.5px] text-slate-400 font-medium">
                        {item.role}
                      </p>
                      <p className="text-[10.5px] font-mono text-slate-400/90 flex items-center gap-1 mt-0.5">
                        <span>{item.company}</span>
                        <span>&bull;</span>
                        <span>{item.flag}</span>
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars & Numeric Value */}
                  <RatingStars rating={item.rating} />
                </div>

                {/* Review Narrative Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic font-sans font-normal pt-0.5">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Card Footer: Service Pill Badge */}
              <div className="relative z-10 pt-3.5 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25 group-hover:border-amber-400/40 transition-colors">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{item.service}</span>
                </span>

                <span className="text-[10.5px] font-mono text-slate-500">
                  {item.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Market Footprint Trust Indicator */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900/80 via-[#0a0c16] to-slate-900/80 border border-amber-500/20 max-w-4xl mx-auto text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 font-heading mb-2.5">
            <Globe2 className="w-4 h-4 text-amber-400" />
            <span>Supporting clients across India &amp; global markets</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {globalMarkets.map((market) => (
              <span
                key={market.name}
                className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-sm"
              >
                <span>{market.flag}</span>
                <span>{market.name}</span>
              </span>
            ))}
          </div>

          <p className="text-[10.5px] text-slate-400 font-mono mt-2.5">
            Available for remote collaboration, contract engagements, and international client projects.
          </p>
        </div>
      </div>
    </section>
  );
};
