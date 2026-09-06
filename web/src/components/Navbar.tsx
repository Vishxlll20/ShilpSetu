import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Impact', href: '#impact' },
  { label: 'Technology', href: '#technology' },
  { label: 'Research', href: '#research' },
  { label: 'Team', href: '#team' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-navy/5 bg-cream/85 py-3 shadow-[0_8px_30px_-18px_rgba(11,31,58,0.35)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-shilp flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-navy/70 transition-colors hover:text-navy"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-saffron transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            className="group hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-navy-light hover:shadow-glow-saffron sm:inline-flex"
          >
            Explore ShilpSetu
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            href="/shilpsetu.apk"
            download="ShilpSetu.apk"
            aria-label="Download ShilpSetu APK"
            title="Download ShilpSetu APK"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-indian-green/25 bg-indian-green/5 text-indian-green transition-all duration-300 hover:border-indian-green/50 hover:bg-indian-green/10 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy backdrop-blur lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-navy/5 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-shilp flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy/75 transition-colors hover:bg-saffron/10 hover:text-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#how-it-works"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream"
                >
                  Explore ShilpSetu
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/shilpsetu.apk"
                  download="ShilpSetu.apk"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-indian-green/30 bg-indian-green/5 px-5 py-3 text-sm font-semibold text-indian-green"
                >
                  <Download className="h-4 w-4" />
                  Download App
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}