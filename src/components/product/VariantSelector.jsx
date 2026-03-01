export default function VariantSelector({ variants, selected, onSelect }) {
  if (!variants?.length) return null

  return (
    <div className="variant-selector">
      <span className="text-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>Select Variant</span>
      <div className="variant-selector__options">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={`variant-selector__option ${selected?.id === variant.id ? 'variant-selector__option--active' : ''}`}
            onClick={() => onSelect(variant)}
          >
            <span className="variant-selector__name">{variant.name}</span>
            {variant.attributes?.stem_count && (
              <span className="variant-selector__detail">{variant.attributes.stem_count} stems</span>
            )}
          </button>
        ))}
      </div>
      <style>{`
        .variant-selector__options {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .variant-selector__option {
          padding: var(--space-3) var(--space-5);
          border: 1.5px solid var(--color-light-gray);
          border-radius: var(--radius-md);
          background: var(--color-white);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
          text-align: left;
        }
        .variant-selector__option:hover {
          border-color: var(--color-primary-200);
        }
        .variant-selector__option--active {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }
        .variant-selector__name {
          font-size: var(--text-sm);
          font-weight: 500;
          display: block;
        }
        .variant-selector__detail {
          font-size: var(--text-xs);
          color: var(--color-gray);
        }
      `}</style>
    </div>
  )
}
