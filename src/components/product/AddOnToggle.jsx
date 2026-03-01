import { formatPrice } from '@/lib/utils'

export default function AddOnToggle({ addon, isSelected, onToggle }) {
  return (
    <button
      className={`addon-toggle ${isSelected ? 'addon-toggle--active' : ''}`}
      onClick={() => onToggle(addon)}
    >
      <span className="addon-toggle__icon">{addon.icon || '✨'}</span>
      <span className="addon-toggle__name">{addon.name}</span>
      <span className="addon-toggle__price">+{formatPrice(addon.price)}</span>
      <style>{`
        .addon-toggle {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border: 1.5px solid var(--color-light-gray);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
          width: 100%;
          text-align: left;
        }
        .addon-toggle:hover { border-color: var(--color-primary-200); }
        .addon-toggle--active {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }
        .addon-toggle__icon { font-size: 1.2rem; }
        .addon-toggle__name {
          flex: 1;
          font-size: var(--text-sm);
          font-weight: 500;
        }
        .addon-toggle__price {
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 500;
        }
      `}</style>
    </button>
  )
}
