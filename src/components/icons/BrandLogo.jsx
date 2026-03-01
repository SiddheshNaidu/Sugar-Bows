export default function BrandLogo({ size = 'default', showText = true, className = '' }) {
  const heights = { sm: 28, default: 36, lg: 48 }
  const h = heights[size] || heights.default

  return (
    <span className={`brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      {/* Rose with Bow mark */}
      <svg width={h} height={h} viewBox="0 0 80 80" fill="none">
        {/* Rose bud */}
        <path d="M40 8c-2 0-5 3-5 6 0 4 3 7 5 8 2-1 5-4 5-8 0-3-3-6-5-6z" fill="#8B1E1E" opacity=".3"/>
        <path d="M35 16c-1 2-2 5-1 8 1 3 3 5 6 5 3 0 5-2 6-5 1-3 0-6-1-8-1 1-3 3-5 3s-4-2-5-3z" fill="#8B1E1E" opacity=".5"/>
        <path d="M33 20c0 3 1 6 3 8s4 3 4 3 2-1 4-3 3-5 3-8c-2 2-4 3-7 3s-5-1-7-3z" fill="#8B1E1E" opacity=".7"/>
        <path d="M40 32c-3 0-5-2-7-4 0 2 1 5 3 7 2 1 3 2 4 2s2-1 4-2c2-2 3-5 3-7-2 2-4 4-7 4z" fill="#8B1E1E"/>
        {/* Stem */}
        <path d="M40 35v10" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round"/>
        {/* Bow left */}
        <path d="M40 44c-2-1-12-3-16 0-4 3-3 8 0 9s8-1 12-5c1-1 3-3 4-4z" fill="#FCE9E9" stroke="#8B1E1E" strokeWidth="1"/>
        {/* Bow right */}
        <path d="M40 44c2-1 12-3 16 0 4 3 3 8 0 9s-8-1-12-5c-1-1-3-3-4-4z" fill="#FCE9E9" stroke="#8B1E1E" strokeWidth="1"/>
        {/* Bow center */}
        <circle cx="40" cy="44" r="3" fill="#8B1E1E"/>
        {/* Bow tails */}
        <path d="M37 47l-4 14" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M43 47l4 14" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {showText && (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: h * 0.5,
          fontWeight: 400,
          color: 'var(--color-primary-900)',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>
          Sugar <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>&</span> Bows
        </span>
      )}
    </span>
  )
}
