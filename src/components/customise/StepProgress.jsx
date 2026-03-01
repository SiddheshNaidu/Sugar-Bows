export default function StepProgress({ steps, currentStep }) {
  return (
    <div className="step-progress">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-progress__step ${
            index < currentStep ? 'step-progress__step--complete' :
            index === currentStep ? 'step-progress__step--active' : ''
          }`}
        >
          <div className="step-progress__indicator">
            {index < currentStep ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <span className="step-progress__label">{step}</span>
          {index < steps.length - 1 && <div className="step-progress__connector" />}
        </div>
      ))}
      <style>{`
        .step-progress {
          display: flex;
          align-items: center;
          gap: 0;
          padding: var(--space-6) 0;
        }
        .step-progress__step {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex: 1;
          position: relative;
        }
        .step-progress__indicator {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          border: 2px solid var(--color-light-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-gray);
          background: var(--color-white);
          flex-shrink: 0;
          transition: all var(--duration-normal) var(--ease-spring);
          z-index: 1;
        }
        .step-progress__step--active .step-progress__indicator {
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 0 0 4px var(--color-primary-50);
        }
        .step-progress__step--complete .step-progress__indicator {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: var(--color-white);
        }
        .step-progress__label {
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--color-gray);
          white-space: nowrap;
        }
        .step-progress__step--active .step-progress__label,
        .step-progress__step--complete .step-progress__label {
          color: var(--color-black);
        }
        .step-progress__connector {
          flex: 1;
          height: 2px;
          background: var(--color-light-gray);
          margin: 0 var(--space-2);
        }
        .step-progress__step--complete .step-progress__connector {
          background: var(--color-primary);
        }
        @media (max-width: 480px) {
          .step-progress__label { display: none; }
        }
      `}</style>
    </div>
  )
}
