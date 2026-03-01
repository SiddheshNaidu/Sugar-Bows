import { Link } from 'react-router-dom'
import { formatPrice, formatDate } from '@/lib/utils'
import { orderStatuses } from '@/constants/theme'
import Badge from '@/components/ui/Badge'
import { IconClock, IconCheck, IconSparkles, IconCamera, IconShield, IconTruck, IconBouquet, IconX as IconClose } from '@/components/icons/Icons'

const iconMap = {
  clock: IconClock,
  check: IconCheck,
  sparkles: IconSparkles,
  camera: IconCamera,
  shield: IconShield,
  truck: IconTruck,
  bouquet: IconBouquet,
  x: IconClose,
}

export default function OrderCard({ order }) {
  const status = orderStatuses[order.status] || orderStatuses.pending_payment
  const StatusIcon = iconMap[status.iconName] || IconClock

  return (
    <Link to={`/order/${order.id}`} className="order-card">
      <div className="order-card__header">
        <span className="order-card__id">#{order.order_number}</span>
        <Badge variant={order.status === 'delivered' ? 'success' : 'default'}>
          <StatusIcon size={14} /> {status.label}
        </Badge>
      </div>
      <div className="order-card__body">
        <span className="order-card__date">{formatDate(order.created_at)}</span>
        <span className="order-card__items">
          {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="order-card__footer">
        <span className="text-price">{formatPrice(order.total_amount)}</span>
      </div>
      <style>{`
        .order-card {
          display: block;
          text-decoration: none;
          color: inherit;
          padding: var(--space-5);
          background: var(--color-white);
          border: 1px solid var(--color-light-gray);
          border-radius: var(--radius-xl);
          transition: all var(--duration-fast) var(--ease-out);
        }
        .order-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: var(--color-primary-200);
        }
        .order-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
        }
        .order-card__id {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 500;
        }
        .order-card__body {
          display: flex;
          gap: var(--space-4);
          font-size: var(--text-sm);
          color: var(--color-gray);
          margin-bottom: var(--space-3);
        }
        .order-card__footer {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </Link>
  )
}
