import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function PromoInput({ onApply }) {
  const [code, setCode] = useState('')

  const handleApply = () => {
    if (code.trim()) onApply(code.trim().toUpperCase())
  }

  return (
    <div className="promo-input">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter promo code"
        className="input-group__input"
        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
      />
      <Button variant="secondary" size="sm" onClick={handleApply}>Apply</Button>
      <style>{`
        .promo-input {
          display: flex;
          gap: var(--space-2);
          align-items: stretch;
        }
        .promo-input .input-group__input {
          flex: 1;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: var(--text-sm);
        }
      `}</style>
    </div>
  )
}
