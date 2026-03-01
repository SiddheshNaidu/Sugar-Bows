import Button from '@/components/ui/Button'

export default function ProofApproval({ proofUrl, status, onApprove, onRequestRevision }) {
  if (!proofUrl) return null

  return (
    <div className="proof-approval">
      <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Frame Proof</h4>
      <div className="proof-approval__image-wrap">
        <img src={proofUrl} alt="Frame proof" className="proof-approval__image" />
      </div>
      {status === 'sent' && (
        <div className="proof-approval__actions">
          <Button variant="primary" onClick={onApprove}>Approve Proof</Button>
          <Button variant="secondary" onClick={onRequestRevision}>Request Revision</Button>
        </div>
      )}
      {status === 'approved' && (
        <p className="proof-approval__status">✅ You approved this proof</p>
      )}
      <style>{`
        .proof-approval {
          background: var(--color-off-white);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
        }
        .proof-approval__image-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: var(--space-4);
        }
        .proof-approval__image {
          width: 100%;
          max-height: 400px;
          object-fit: contain;
        }
        .proof-approval__actions {
          display: flex;
          gap: var(--space-3);
        }
        .proof-approval__status {
          font-size: var(--text-sm);
          color: var(--color-success);
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
