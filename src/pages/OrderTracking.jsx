import { useParams, useSearchParams } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Skeleton from '@/components/ui/Skeleton'
import Badge from '@/components/ui/Badge'
import OrderTimeline from '@/components/orders/OrderTimeline'
import ProofApproval from '@/components/orders/ProofApproval'
import { useOrder } from '@/hooks/useOrders'
import { formatPrice, formatDate } from '@/lib/utils'
import { orderStatuses } from '@/constants/theme'

export default function OrderTracking() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { data: order, isLoading } = useOrder(id)

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="container section container--narrow">
          <Skeleton variant="title" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="image" height="200px" />
        </div>
      </PageWrapper>
    )
  }

  if (!order) {
    return (
      <PageWrapper>
        <div className="container section empty-state">
          <span className="empty-state__icon">🔍</span>
          <h2 className="empty-state__title">Order not found</h2>
        </div>
      </PageWrapper>
    )
  }

  const status = orderStatuses[order.status] || orderStatuses.pending_payment

  return (
    <PageWrapper>
      <section className="section">
        <div className="container container--narrow">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
            <div>
              <h1 className="h2">{order.order_number}</h1>
              <p className="text-caption">{formatDate(order.created_at)}</p>
            </div>
            <Badge variant={order.status === 'delivered' ? 'success' : 'primary'}>
              {status.icon} {status.label}
            </Badge>
          </div>

          {/* Timeline */}
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)', marginBottom: 'var(--space-6)' }}>
            <h3 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Order Timeline</h3>
            <OrderTimeline timeline={order.order_timeline?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))} />
          </div>

          {/* Proof (if frame order) */}
          {order.order_items?.some(item => item.customisation_id) && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              {order.order_items.filter(item => item.frame_customisations).map(item => (
                <ProofApproval
                  key={item.id}
                  proofUrl={item.frame_customisations?.proof_url}
                  status={item.frame_customisations?.proof_status}
                  onApprove={() => {}}
                  onRequestRevision={() => {}}
                />
              ))}
            </div>
          )}

          {/* Items */}
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)', marginBottom: 'var(--space-6)' }}>
            <h3 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Items</h3>
            {order.order_items?.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-light-gray)' }}>
                <div>
                  <span style={{ fontWeight: 500 }}>{item.product_name}</span>
                  <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-gray)' }}>{item.variant_name} × {item.quantity}</span>
                </div>
                <span className="text-price">{formatPrice(item.unit_price * item.quantity)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-4)', fontWeight: 500 }}>
              <span>Total</span>
              <span className="text-price">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          {order.delivery_address && (
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)' }}>
              <h3 className="h4" style={{ marginBottom: 'var(--space-3)' }}>Delivery Address</h3>
              <p className="text-body--sm" style={{ color: 'var(--color-medium-gray)' }}>
                {order.delivery_address.name}<br />
                {order.delivery_address.line1}<br />
                {order.delivery_address.line2 && <>{order.delivery_address.line2}<br /></>}
                {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.pincode}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
