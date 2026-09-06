import { motion } from 'framer-motion'
import {
  Camera,
  Mic,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  Image as ImageIcon,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react'

/**
 * A hand-built 3D-style phone mockup rendering the actual
 * ShilpSetu app experience: PHOTO + VOICE → AI → CATALOG + PRICE + MARKET.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Glow behind the phone */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indian-green/10 blur-3xl" />

      {/* Phone body */}
      <div
        className="relative rounded-[3rem] border-[6px] border-navy-darker bg-navy-darker shadow-[0_50px_120px_-30px_rgba(11,31,58,0.55)]"
        style={{ transform: 'rotate(1.5deg)' }}
      >
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[14px] z-30 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black/90" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.6rem] bg-navy-darker p-2">
          {/* App UI */}
          <div className="relative overflow-hidden rounded-[2.1rem] bg-cream">
            {/* App header */}
            <div className="flex items-center justify-between px-5 pb-2 pt-6">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-navy">
                  Shilp<span className="text-saffron">Setu</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indian-green" />
                <span className="text-[9px] font-semibold text-indian-green">Online</span>
              </div>
            </div>

            {/* Product image */}
            <div className="mx-5 mt-1 overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] w-full">
                {/* Handcrafted product illustration (Indian brass lamp) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7C873] via-[#E8A44A] to-[#B9762E]">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]">
                    {/* Diya / handcrafted lamp silhouette */}
                    <svg viewBox="0 0 120 90" width="120" height="90" className="drop-shadow-lg">
                      <path
                        d="M60 14c9 10 14 20 14 30a14 14 0 0 1-28 0c0-10 5-20 14-30Z"
                        fill="url(#diya-grad)"
                      />
                      <path d="M54 40c0 4 2.5 7 6 7s6-3 6-7" fill="#7C4E1E" />
                      <rect x="38" y="56" width="44" height="7" rx="3.5" fill="#8A5A24" />
                      <rect x="48" y="63" width="24" height="10" rx="2" fill="#7C4E1E" />
                      <defs>
                        <radialGradient id="diya-grad" cx="0.4" cy="0.3">
                          <stop offset="0%" stopColor="#FFE9B0" />
                          <stop offset="60%" stopColor="#F4A63C" />
                          <stop offset="100%" stopColor="#C87E2E" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  {/* VOICE badge */}
                  <div className="absolute right-2 top-2 rounded-lg bg-black/35 px-1.5 py-1 backdrop-blur">
                    <span className="text-[8px] font-semibold text-white/90">📸 Original Photo</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* Voice waveform */}
            <div className="mx-5 mt-3 rounded-2xl border border-navy/8 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/15">
                  <Mic className="h-4 w-4 text-saffron-dark" />
                </div>
                <div className="flex flex-1 items-center gap-[2px] py-1">
                  {[0.4, 0.8, 0.5, 1, 0.65, 0.9, 0.45, 0.75, 0.55, 0.95, 0.6, 0.85, 0.4, 0.7, 0.5, 0.9].map(
                    (h, i) => (
                      <motion.span
                        key={i}
                        className="w-[3px] origin-center rounded-full bg-indian-green"
                        style={{ height: `${h * 18}px` }}
                        animate={{ scaleY: [0.4, 1, 0.5, 0.9, 0.4] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: i * 0.06,
                          ease: 'easeInOut',
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
              <p className="mt-1.5 text-[10px] text-navy/75">
                "Pital ka diya, handcrafted by artisans of Muzaffarnagar…"
              </p>
            </div>

            {/* AI processing strip */}
            <div className="mx-5 mt-3 flex items-center gap-2.5 rounded-2xl border border-indian-green/15 bg-gradient-to-r from-indian-green/8 to-saffron/8 px-3 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-navy">AI Catalog Generation</p>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-navy/8">
                  <motion.div
                    className="h-full w-2/3 rounded-full bg-gradient-to-r from-saffron to-indian-green"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                  />
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-saffron" />
            </div>

            {/* Generated catalog result */}
            <div className="mx-5 mt-3 rounded-2xl border border-navy/8 bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-indian-green" />
                <p className="text-[11px] font-bold text-navy">Handcrafted Brass Diya</p>
              </div>
              <p className="mt-1 text-[9px] leading-snug text-navy/75">
                Artisan-crafted bell metal diya · traditional motifs · 24cm diameter
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-navy/70">Suggested price</p>
                  <p className="text-sm font-bold text-indian-green">₹649</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-saffron/10 px-2 py-1">
                  <ImageIcon className="h-3 w-3 text-saffron-dark" />
                  <span className="text-[8px] font-semibold text-saffron-dark">Enhanced</span>
                </div>
              </div>
            </div>

            {/* Generate catalog button */}
            <div className="px-5 pb-6 pt-3.5">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-[11px] font-bold text-cream shadow-lg shadow-navy/20">
                Generate Catalog
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Floating feature cards that orbit the phone */
export function FloatingCards() {
  const cards = [
    {
      icon: ImageIcon,
      label: 'AI Image Enhancement',
      sub: 'Auto-enhanced photos',
      position: 'top-[8%] -left-4 md:-left-20',
      animation: { float: [0, -10, 0], rotate: [0, 2, 0] },
      delay: 0,
    },
    {
      icon: Mic,
      label: 'Voice-to-Catalog',
      sub: 'Speak in your language',
      position: 'top-[32%] -right-3 md:-right-16',
      animation: { float: [0, 12, 0] },
      delay: 1.2,
    },
    {
      icon: Camera,
      label: 'Smart Pricing',
      sub: '₹ Live market intelligence',
      position: 'bottom-[24%] -left-6 md:-left-20',
      animation: { float: [0, 10, 0] },
      delay: 2,
    },
    {
      icon: ShoppingBag,
      label: 'Digital Storefront',
      sub: 'Share & sell directly',
      position: 'bottom-[6%] -right-3 md:-right-12',
      animation: { float: [0, -8, 0] },
      delay: 0.6,
    },
  ]

  return (
    <>
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          className={`absolute z-20 hidden sm:block ${card.position}`}
          animate={card.animation}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/75 px-4 py-3 shadow-card backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/12 text-saffron-dark">
              <card.icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-navy">{card.label}</p>
              <p className="text-[10px] text-navy/75">{card.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Small floating notifications on mobile */}
      <div className="absolute left-1/2 top-full mt-6 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-4 py-2.5 shadow-card backdrop-blur-md sm:hidden">
        <MessageCircle className="h-4 w-4 text-indian-green" />
        <p className="text-[11px] font-semibold text-navy">WhatsApp → Catalog ready</p>
      </div>
    </>
  )
}