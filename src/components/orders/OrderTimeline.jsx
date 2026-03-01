import { formatDate } from '@/lib/utils'
import { orderStatuses } from '@/constants/theme'

export default function OrderTimeline({ timeline }) {
  if (!timeline?.length) return null

  return (
    <div className="order-timeline">
      {timeline.map((entry, index) => {
        const statusInfo = orderStatuses[entry.status] || { icon: '•', label: entry.status }
        return (
          <div key={entry.id || index} className={`order-timeline__item ${index === 0 ? 'order-timeline__item--current' : ''}`}>
            <div className="order-timeline__dot">{statusInfo.icon}</div>
            <div className="order-timeline__content">
              <span className="order-timeline__status">{statusInfo.label}</span>
              {entry.note && <p className="order-timeline__note">{entry.note}</p>}
              <span className="order-timeline__time">{formatDate(entry.created_at)}</span>
            </div>
          </div>
        )
      })}
      <style>{`
        .order-timeline {
          position: relative;
          padding-left: var(--space-8);
        }
        .order-timeline::before {
          content: '';
          position: absolute;
          left: 14px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--color-light-gray);
        }
        .order-timeline__item {
          position: relative;
          padding-bottom: var(--space-6);
        }
        .order-timeline__item:last-child { padding-bottom: 0; }
        .order-timeline__dot {
          position: absolute;
          left: calc(-1 * var(--space-8) + 4px);
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background: var(--color-white);
          border: 2px solid var(--color-light-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xs);
          z-index: 1;
        }
        .order-timeline__item--current .order-timeline__dot {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-50);
        }
        .order-timeline__status {
          font-size: var(--text-sm);
          font-weight: 500;
          display: block;
        }
        .order-timeline__note {
          font-size: var(--text-xs);
          color: var(--color-medium-gray);
          margin-top: var(--space-1);
        }
        .order-timeline__time {
          font-size: var(--text-xs);
          color: var(--color-gray);
          margin-top: var(--space-1);
          display: block;
        }
      `}</style>
    </div>
  )
}
