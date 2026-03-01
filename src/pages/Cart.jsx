import { Link, useNavigate } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import PromoInput from '@/components/cart/PromoInput'
import { useCart } from '@/hooks/useCart'

export default function Cart() {
  const navigate = useNavigate()
  const { items, subtotal, discount, promoCode, itemCount, updateQuantity, removeItem, applyPromo, clearCart } = useCart()

  if (itemCount === 0) {
    return (
      <PageWrapper>
        <div className="container section empty-state">
          <span className="empty-state__icon">🛍️</span>
          <h2 className="empty-state__title">Your cart is empty</h2>
          <p className="empty-state__text">Browse our collection and add something special.</p>
          <Link to="/shop" style={{ marginTop: 'var(--space-6)' }}>
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
            <h1 className="h1">Your Cart</h1>
            <span className="text-caption">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-12)', alignItems: 'start' }}>
            {/* Items */}
            <div>
              {items.map((item) => (
                <CartItem
                  key={item.variantId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <PromoInput onApply={(code) => applyPromo(code, 50)} />
              </div>
            </div>

            {/* Summary */}
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
