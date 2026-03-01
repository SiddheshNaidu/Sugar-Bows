import { getDaysUntil, formatDate } from '@/lib/utils'
import { IconCalendar, IconEdit, IconTrash } from '@/components/icons/Icons'

const typeIcons = {
  birthday: <IconCalendar size={28} color="var(--color-primary)" />,
  anniversary: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  mothers_day: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c0 0-8-4-8-11a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 7-8 11-8 11z"/><path d="M12 3c0 0 2-1 3-1s2 .5 2 2c0 1-1 2-2 3l-3 3-3-3c-1-1-2-2-2-3 0-1.5 1-2 2-2s3 1 3 1z"/></svg>,
  graduation: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-6L2 10l10 6 10-6z"/><path d="M6 12v5c0 0 3 3 6 3s6-3 6-3v-5"/><path d="M22 10v6"/></svg>,
}

export default function OccasionCard({ occasion, onEdit, onDelete }) {
  const daysUntil = getDaysUntil(occasion.occasion_date)
  const isUrgent = daysUntil <= 7

  return (
    <div className={`occasion-card ${isUrgent ? 'occasion-card--urgent' : ''}`}>
      <div className="occasion-card__icon">
        {typeIcons[occasion.occasion_type] || <IconCalendar size={28} color="var(--color-primary)" />}
      </div>
      <div className="occasion-card__content">
        <h4 className="occasion-card__name">{occasion.person_name}</h4>
        <span className="occasion-card__relation">{occasion.relation}</span>
        <span className="occasion-card__date">{formatDate(occasion.occasion_date)}</span>
      </div>
      <div className="occasion-card__countdown">
        <span className="occasion-card__days">{daysUntil}</span>
        <span className="occasion-card__days-label">days</span>
      </div>
      <div className="occasion-card__actions">
        <button onClick={() => onEdit(occasion)} className="occasion-card__action" aria-label="Edit">
          <IconEdit size={16} />
        </button>
        <button onClick={() => onDelete(occasion.id)} className="occasion-card__action" aria-label="Delete">
          <IconTrash size={16} />
        </button>
      </div>
      <style>{`
        .occasion-card {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--color-white);
          border: 1px solid var(--color-light-gray);
          border-radius: var(--radius-xl);
          transition: all var(--duration-fast) var(--ease-out);
        }
        .occasion-card:hover { box-shadow: var(--shadow-md); }
        .occasion-card--urgent { border-color: var(--color-primary-200); background: var(--color-primary-50); }
        .occasion-card__icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--color-primary-50);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .occasion-card__content { flex: 1; min-width: 0; }
        .occasion-card__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 400;
        }
        .occasion-card__relation {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-gray);
          text-transform: capitalize;
        }
        .occasion-card__date {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-medium-gray);
          margin-top: var(--space-1);
        }
        .occasion-card__countdown {
          text-align: center;
          flex-shrink: 0;
        }
        .occasion-card__days {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 600;
          color: var(--color-primary);
          line-height: 1;
        }
        .occasion-card__days-label {
          font-size: var(--text-xs);
          color: var(--color-gray);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .occasion-card__actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .occasion-card__action {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          color: var(--color-gray);
          transition: all var(--duration-fast) var(--ease-out);
        }
        .occasion-card__action:hover {
          background: var(--color-off-white);
          color: var(--color-dark-gray);
        }
      `}</style>
    </div>
  )
}
