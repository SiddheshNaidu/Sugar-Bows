export default function FramePreview({ recipientName, occasionDate, message, photoUrl }) {
  return (
    <div className="frame-preview">
      <div className="frame-preview__frame">
        <div className="frame-preview__photo">
          {photoUrl ? (
            <img src={photoUrl} alt="Frame preview" />
          ) : (
            <div className="frame-preview__photo-empty">📸</div>
          )}
        </div>
        <div className="frame-preview__text">
          <p className="frame-preview__name">{recipientName || 'Recipient Name'}</p>
          <p className="frame-preview__date">{occasionDate || 'DD/MM/YYYY'}</p>
          {message && <p className="frame-preview__message">"{message}"</p>}
        </div>
      </div>
      <style>{`
        .frame-preview {
          display: flex;
          justify-content: center;
          padding: var(--space-6);
        }
        .frame-preview__frame {
          width: 280px;
          background: var(--color-white);
          border: 8px solid var(--color-off-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg), inset 0 0 0 1px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .frame-preview__photo {
          aspect-ratio: 4/3;
          background: var(--color-off-white);
          overflow: hidden;
        }
        .frame-preview__photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .frame-preview__photo-empty {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          background: linear-gradient(135deg, var(--color-primary-50), var(--color-blush));
        }
        .frame-preview__text {
          padding: var(--space-4);
          text-align: center;
        }
        .frame-preview__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--color-primary);
        }
        .frame-preview__date {
          font-size: var(--text-xs);
          color: var(--color-gray);
          margin-top: var(--space-1);
          letter-spacing: 0.06em;
        }
        .frame-preview__message {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-style: italic;
          color: var(--color-medium-gray);
          margin-top: var(--space-3);
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}
