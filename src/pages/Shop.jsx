import { useParams, Link } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import ProductGrid from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { categories } from '@/constants/theme'
import { IconBouquet, IconFrame, IconGift, IconSparkles, IconHeart } from '@/components/icons/Icons'

const iconMap = {
  bouquet: IconBouquet,
  frame: IconFrame,
  gift: IconGift,
  sparkles: IconSparkles,
  heart: IconHeart,
}

export default function Shop() {
  const { category } = useParams()
  const { data: products, isLoading } = useProducts(category)

  const activeCategory = categories.find(c => c.slug === category)

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="text-overline">{activeCategory ? activeCategory.label : 'All Products'}</span>
            <h1 className="h1">Shop</h1>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
          }}>
            <Link
              to="/shop"
              className={`chip ${!category ? 'chip--active' : ''}`}
            >
              All
            </Link>
            {categories.map((cat) => {
              const IconComponent = iconMap[cat.iconName] || IconBouquet
              return (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className={`chip ${category === cat.slug ? 'chip--active' : ''}`}
                >
                  <IconComponent size={14} /> {cat.label}
                </Link>
              )
            })}
          </div>

          <ProductGrid products={products} isLoading={isLoading} columns={3} />
        </div>
      </section>
    </PageWrapper>
  )
}
