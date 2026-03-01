import { classNames } from '@/lib/utils'

export default function Skeleton({ variant = 'text', width, height, className = '' }) {
  return (
    <div
      className={classNames('skeleton', `skeleton--${variant}`, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
