import { getDaysUntil } from '@/lib/utils'

export default function CountdownCard({ occasion }) {
  const days = getDaysUntil(occasion.occasion_date)

  return (
    <div className="countdown-card">
      <div className="countdown-card__ring">
        <svg viewBox="0 0 100 100" className="countdown-card__svg">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-light-gray)" strokeWidth="4"/>
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${Math.max(0, (1 - days / 365) * 264)} 264`}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dasharray 1s var(--ease-spring)' }}
          />
        </svg>
        <div className="countdown-card__number">
          <span className="countdown-card__days">{days}</span>
          <span className="countdown-card__label">days</span>
        </div>
      </div>
      <h4 className="countdown-card__name">{occasion.person_name}</h4>
      <p className="countdown-card__type">{occasion.occasion_type?.replace('_', ' ')}</p>
      <style>{`
        .countdown-card {
          text-align: center;
          padding: var(--space-6);
          background: var(--color-white);
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-light-gray);
        }
        .countdown-card__ring {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto var(--space-4);
        }
        .countdown-card__svg { width: 100%; height: 100%; }
        .countdown-card__number {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .countdown-card__days {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 600;
          color: var(--color-primary);
          line-height: 1;
        }
        .countdown-card__label {
          font-size: var(--text-xs);
          color: var(--color-gray);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .countdown-card__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
        }
        .countdown-card__type {
          font-size: var(--text-xs);
          color: var(--color-gray);
          text-transform: capitalize;
          margin-top: var(--space-1);
        }
      `}</style>
    </div>
  )
}
