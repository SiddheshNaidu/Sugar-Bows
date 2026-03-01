import ProductCard from './ProductCard'
import Skeleton from '@/components/ui/Skeleton'
import { IconBouquet } from '@/components/icons/Icons'

export default function ProductGrid({ products, isLoading, columns = 3 }) {
  if (isLoading) {
    return (
      <div className={`grid grid--${columns}`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div key={i}>
            <Skeleton height="260px" borderRadius="var(--radius-lg)" />
            <Skeleton height="16px" width="60%" style={{ marginTop: 'var(--space-3)' }} />
            <Skeleton height="14px" width="40%" style={{ marginTop: 'var(--space-2)' }} />
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <IconBouquet size={48} color="var(--color-primary-200)" />
        <h3 className="h4" style={{ marginTop: 'var(--space-4)' }}>No products found</h3>
        <p className="text-caption">Check back soon — we're always adding new creations.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid--${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
