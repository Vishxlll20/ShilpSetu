/**
 * A shared craft-arch silhouette motif — subtle architectural
 * outlines derived from Indian jali / arched gateways.
 * Rendered as an SVG stroke pattern.
 */
export function ArchMotif({ className = '', opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 900 260"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {[
          { x: 0, w: 70 },
          { x: 90, w: 90 },
          { x: 210, w: 60 },
          { x: 300, w: 110 },
          { x: 460, w: 70 },
          { x: 560, w: 100 },
          { x: 700, w: 60 },
          { x: 800, w: 100 },
        ].map((a, i) => (
          <g key={i}>
            <path d={`M${a.x} 260 L${a.x} ${160 + (i % 3) * 15} Q${a.x + a.w / 2} ${80 + (i % 3) * 25} ${a.x + a.w} ${160 + (i % 3) * 15} L${a.x + a.w} 260`} />
            <circle cx={a.x + a.w / 2} cy={150 + (i % 3) * 15} r={a.w * 0.16} />
          </g>
        ))}
      </g>
    </svg>
  )
}