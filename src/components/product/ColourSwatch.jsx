export default function ColourSwatch({ colours, selected, onSelect }) {
  const palette = {
    blush_pink: '#F2D7D5',
    crimson_red: '#8B1E1E',
    ivory_white: '#FFFFF0',
    dusty_rose: '#DCAE96',
    champagne: '#F7E7CE',
    deep_burgundy: '#800020',
    lavender: '#D5C6E0',
    coral: '#FF7F50',
  }

  if (!colours?.length) return null

  return (
    <div className="colour-swatch">
      <span className="text-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>Colour</span>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {colours.map((colour) => (
          <button
            key={colour}
            className={`colour-swatch__dot ${selected === colour ? 'colour-swatch__dot--active' : ''}`}
            onClick={() => onSelect(colour)}
            aria-label={colour.replace('_', ' ')}
            title={colour.replace('_', ' ')}
            style={{ '--swatch-color': palette[colour] || '#ccc' }}
          />
        ))}
      </div>
      <style>{`
        .colour-swatch__dot {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--swatch-color);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-spring);
          position: relative;
        }
        .colour-swatch__dot:hover {
          transform: scale(1.15);
        }
        .colour-swatch__dot--active {
          border-color: var(--color-black);
          box-shadow: 0 0 0 2px var(--color-white), 0 0 0 3.5px var(--color-black);
        }
      `}</style>
    </div>
  )
}
