import { GitFork, PlayCircle, FileText, ArrowUp, Heart } from 'lucide-react'
import { Logo } from './Logo'

const NAV = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Impact', href: '#impact' },
  { label: 'Research', href: '#research' },
]

const LINKS = [
  { icon: GitFork, label: 'GitHub', href: '#' },
  { icon: PlayCircle, label: 'Demo', href: '#home' },
  { icon: FileText, label: 'Documentation', href: '#how-it-works' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-darker text-cream">
      <div className="pattern-mandala-light absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />

      <div className="container-shilp relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">
              Crafting Livelihoods, Connecting Bharat.
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-cream/70">
              AI-powered, voice-first digital identity and market access for Indian artisans.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-light">
              Navigate
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-light">
              Project
            </h4>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    <l.icon className="h-4 w-4 text-cream/70 transition-colors group-hover:text-saffron" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm font-medium text-cream/70 sm:text-left">
            Empowering Artisans&nbsp;|&nbsp;Enabling Markets&nbsp;|&nbsp;Building an Inclusive India
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-cream/70">
              Made with <Heart className="h-3.5 w-3.5 fill-saffron text-saffron" /> for Bharat
            </span>
            <a
              href="#home"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-all hover:border-saffron hover:text-saffron"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}