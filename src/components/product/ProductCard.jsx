import { Link } from 'react-router-dom'
import { formatPrice } from '@/lib/utils'
import { IconBouquet } from '@/components/icons/Icons'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0]
  const lowestPrice = product.product_variants
    ?.reduce((min, v) => Math.min(min, v.price), product.base_price) ?? product.base_price

  return (
    <Link to={`/product/${product.slug}`} className="product-card" id={`product-${product.slug}`}>
      <div className="product-card__image-wrap">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="product-card__image-placeholder">
            <IconBouquet size={48} color="var(--color-primary)" />
          </div>
        )}
        {product.is_featured && (
          <span className="product-card__badge">Featured</span>
        )}
        <div className="product-card__overlay">
          <span className="product-card__quick-view">Quick View</span>
        </div>
      </div>
      <div className="product-card__body">
        <span className="product-card__category text-label">{product.category?.replace('_', ' ')}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">
          <span className="text-price">{formatPrice(lowestPrice)}</span>
          {product.product_variants?.length > 1 && (
            <span className="product-card__price-from">onwards</span>
          )}
        </div>
      </div>
    </Link>
  )
}
