import { classNames } from '@/lib/utils'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = classNames(
    'btn',
    `btn--${variant}`,
    size === 'lg' && 'btn--lg',
    size === 'sm' && 'btn--sm',
    fullWidth && 'btn--full',
    icon && !children && 'btn--icon',
    loading && 'btn--loading',
    className
  )

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn__spinner" aria-label="Loading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
            </path>
          </svg>
        </span>
      ) : icon ? (
        <span className="btn__icon">{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  )
}
