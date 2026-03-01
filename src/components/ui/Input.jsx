import { forwardRef } from 'react'
import { classNames } from '@/lib/utils'

const Input = forwardRef(function Input({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}, ref) {
  return (
    <div className={classNames('input-group', className)}>
      {label && <label className="input-group__label">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          ref={ref}
          className={classNames('input-group__input', error && 'input-group__input--error')}
          rows={4}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          className={classNames('input-group__input', error && 'input-group__input--error')}
          {...props}
        />
      )}
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
})

export default Input
