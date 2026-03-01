import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'

export default function OrderSuccess() {
  return (
    <PageWrapper>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-blush))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', margin: '0 auto var(--space-6)',
            animation: 'scaleIn var(--duration-normal) var(--ease-spring)',
          }}>
            🌹
          </div>
          <h1 className="h1" style={{ marginBottom: 'var(--space-3)' }}>Order Placed!</h1>
          <p className="text-body--lg" style={{ marginBottom: 'var(--space-8)', color: 'var(--color-medium-gray)' }}>
            Thank you! Your order has been placed successfully.
            We'll start crafting your gift right away.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/account"><Button variant="primary">View My Orders</Button></Link>
            <Link to="/shop"><Button variant="secondary">Continue Shopping</Button></Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
