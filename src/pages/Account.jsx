import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import OrderCard from '@/components/orders/OrderCard'
import { useAuthStore } from '@/store/authStore'
import { useOrders } from '@/hooks/useOrders'

export default function Account() {
  const { profile, signOut } = useAuthStore()
  const { data: orders, isLoading } = useOrders()

  return (
    <PageWrapper>
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
            padding: 'var(--space-8)', background: 'var(--color-white)',
            borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-light-gray)',
            marginBottom: 'var(--space-8)',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-blush))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', flexShrink: 0,
            }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : '👤'}
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="h2">{profile?.full_name || 'Welcome!'}</h1>
              <p className="text-caption">{profile?.phone || 'Set up your profile'}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
          </div>

          {/* Quick Links */}
          <div className="grid grid--3" style={{ marginBottom: 'var(--space-8)' }}>
            {[
              { to: '/occasions', icon: '🎂', label: 'Occasions' },
              { to: '/shop', icon: '🛍️', label: 'Shop' },
              { to: '/customise', icon: '🖼️', label: 'Customise' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'var(--color-white)', border: '1px solid var(--color-light-gray)',
                  borderRadius: 'var(--radius-xl)', textDecoration: 'none', color: 'inherit',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                <span style={{ fontWeight: 500 }}>{link.label}</span>
              </Link>
            ))}
          </div>

          <Divider />

          {/* Orders */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h2 className="h3" style={{ marginBottom: 'var(--space-5)' }}>My Orders</h2>
            {orders?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : !isLoading ? (
              <div className="empty-state">
                <span className="empty-state__icon">📦</span>
                <h3 className="empty-state__title">No orders yet</h3>
                <p className="empty-state__text">Your order history will appear here.</p>
                <Link to="/shop" style={{ marginTop: 'var(--space-4)' }}>
                  <Button variant="primary">Start Shopping</Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
