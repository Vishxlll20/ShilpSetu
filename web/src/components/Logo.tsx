interface LogoProps {
  dark?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * ShilpSetu wordmark — 'Shilp' in navy, 'Setu' in saffron,
 * with a subtle handcrafted mark.
 */
export function Logo({ dark = false, className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="ShilpSetu home"
    >
      {/* Craft mark */}
      <TheMark dark={dark} />
      <span className={`prose-display font-semibold tracking-tight ${sizes[size]}`}>
        <span className={dark ? 'text-cream' : 'text-navy'}>Shilp</span>
        <span className="text-saffron">Setu</span>
      </span>
    </a>
  )
}

function TheMark({ dark }: { dark: boolean }) {
  const stroke = dark ? '#FFF9F0' : '#0B1F3A'
  return (
    <svg
      viewBox="0 0 32 32"
      width="30"
      height="30"
      fill="none"
      className="shrink-0 transition-transform duration-500 group-hover:rotate-12"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" stroke={stroke} strokeOpacity="0.25" strokeWidth="1.2" />
      {/* dangling leaf motif */}
      <path
        d="M16 6.5c3.5 3.6 5 7.6 5 11.2A5 5 0 0 1 11 17.7c0-3.6 1.5-7.6 5-11.2Z"
        fill="#138808"
        fillOpacity="0.9"
      />
      <path
        d="M16 6.5c0 3.2 0 8.4 0 11.2M16 6.5c-3.5 3.6-5 7.6-5 11.2"
        stroke="#FFF9F0"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
      <path d="M21 10.5c-1.6 2.2-3.2 3.4-5 3.8" stroke="#F47C20" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="22.5" r="1.3" fill="#F47C20" />
    </svg>
  )
}