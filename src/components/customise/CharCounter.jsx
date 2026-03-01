export default function CharCounter({ current, max }) {
  const remaining = max - current
  const isNearLimit = remaining <= 5
  const isOver = remaining < 0

  return (
    <span className={`char-counter ${isNearLimit ? 'char-counter--warn' : ''} ${isOver ? 'char-counter--over' : ''}`}>
      {current}/{max}
      <style>{`
        .char-counter {
          font-size: var(--text-xs);
          color: var(--color-gray);
          font-family: var(--font-mono);
        }
        .char-counter--warn { color: var(--color-warning); }
        .char-counter--over { color: var(--color-error); font-weight: 600; }
      `}</style>
    </span>
  )
}
