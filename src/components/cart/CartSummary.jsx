import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartSummary({ subtotal, discount, deliveryFee = 0, onCheckout }) {
  const total = subtotal - discount + deliveryFee

  return (
    <div className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>
      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="cart-summary__row cart-summary__row--discount">
            <span>Discount</span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="cart-summary__row">
          <span>Delivery</span>
          <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}</span>
        </div>
        <div className="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span className="text-price text-price--lg">{formatPrice(total)}</span>
        </div>
      </div>
      <Button variant="primary" size="lg" fullWidth onClick={onCheckout}>
        Proceed to Checkout
      </Button>
      <style>{`
        .cart-summary {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          border: 1px solid var(--color-light-gray);
          position: sticky;
          top: calc(var(--navbar-height) + var(--space-6));
        }
        .cart-summary__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          margin-bottom: var(--space-6);
        }
        .cart-summary__rows {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .cart-summary__row {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-sm);
          color: var(--color-medium-gray);
        }
        .cart-summary__row--discount { color: var(--color-success); }
        .cart-summary__row--total {
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-light-gray);
          font-weight: 500;
          color: var(--color-black);
          font-size: var(--text-base);
        }
      `}</style>
    </div>
  )
}
