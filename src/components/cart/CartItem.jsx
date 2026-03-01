import { formatPrice } from '@/lib/utils'
import { IconBouquet, IconTrash, IconMinus, IconPlus } from '@/components/icons/Icons'
import './CartItem.css'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.productName} />
        ) : (
          <div className="cart-item__placeholder">
            <IconBouquet size={28} color="var(--color-primary)" />
          </div>
        )}
      </div>
      <div className="cart-item__details">
        <h4 className="cart-item__name">{item.productName}</h4>
        <p className="cart-item__variant">{item.variantName}</p>
        {item.addons?.length > 0 && (
          <p className="cart-item__addons">
            + {item.addons.map(a => a.name).join(', ')}
          </p>
        )}
        {item.customisationId && (
          <span className="badge badge--primary" style={{ marginTop: 'var(--space-1)' }}>Customised</span>
        )}
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__qty">
          <button
            className="cart-item__qty-btn"
            onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <IconMinus size={14} />
          </button>
          <span className="cart-item__qty-value">{item.quantity}</span>
          <button
            className="cart-item__qty-btn"
            onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <IconPlus size={14} />
          </button>
        </div>
        <span className="cart-item__price text-price">{formatPrice(item.price * item.quantity)}</span>
        <button
          className="cart-item__remove"
          onClick={() => onRemove(item.variantId)}
          aria-label="Remove item"
        >
          <IconTrash size={16} />
        </button>
      </div>
    </div>
  )
}
