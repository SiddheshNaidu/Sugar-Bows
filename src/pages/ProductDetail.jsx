import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Accordion from '@/components/ui/Accordion'
import VariantSelector from '@/components/product/VariantSelector'
import ColourSwatch from '@/components/product/ColourSwatch'
import AddOnToggle from '@/components/product/AddOnToggle'
import Skeleton from '@/components/ui/Skeleton'
import { useProduct, useAddons } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: product, isLoading } = useProduct(slug)
  const { data: addons } = useAddons()
  const { addItem } = useCart()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedColour, setSelectedColour] = useState(null)
  const [selectedAddons, setSelectedAddons] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="container section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
          <Skeleton variant="image" height="600px" />
          <div>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="title" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
      </PageWrapper>
    )
  }

  if (!product) {
    return (
      <PageWrapper>
        <div className="container section empty-state">
          <span className="empty-state__icon">🔍</span>
          <h2 className="empty-state__title">Product not found</h2>
        </div>
      </PageWrapper>
    )
  }

  const variant = selectedVariant || product.product_variants?.[0]
  const price = variant?.price || product.base_price
  const images = product.product_images || []
  const colours = [...new Set(product.product_variants?.map(v => v.attributes?.color_palette).filter(Boolean))]

  const handleAddToCart = () => {
    addItem({
      variantId: variant.id,
      productName: product.name,
      variantName: variant.name,
      price: price,
      imageUrl: images[0]?.url,
      addons: selectedAddons,
      customisationId: null,
    })
  }

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.find(a => a.addon_id === addon.id)
        ? prev.filter(a => a.addon_id !== addon.id)
        : [...prev, { addon_id: addon.id, name: addon.name, price: addon.price }]
    )
  }

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'start' }}>
            {/* Images */}
            <div>
              <div style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--color-off-white)', marginBottom: 'var(--space-4)' }}>
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].url}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-blush))' }}>
                    🌹
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      style={{
                        width: 64, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden',
                        border: i === selectedImage ? '2px solid var(--color-primary)' : '2px solid transparent',
                        opacity: i === selectedImage ? 1 : 0.6, cursor: 'pointer',
                        transition: 'all var(--duration-fast) var(--ease-out)',
                      }}
                    >
                      <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="text-label" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                {product.category?.replace('_', ' ')}
              </span>
              <h1 className="h1" style={{ marginBottom: 'var(--space-3)' }}>{product.name}</h1>
              {product.is_featured && <Badge variant="gold" style={{ marginBottom: 'var(--space-4)' }}>Featured</Badge>}

              <div style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                <span className="text-price text-price--lg">{formatPrice(price)}</span>
                {product.tier && (
                  <Badge variant="primary">{product.tier}</Badge>
                )}
              </div>

              {product.description && (
                <p className="text-body" style={{ marginBottom: 'var(--space-6)' }}>
                  {product.description}
                </p>
              )}

              {/* Variants */}
              {product.product_variants?.length > 1 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <VariantSelector
                    variants={product.product_variants}
                    selected={variant}
                    onSelect={setSelectedVariant}
                  />
                </div>
              )}

              {/* Colours */}
              {colours.length > 0 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <ColourSwatch
                    colours={colours}
                    selected={selectedColour}
                    onSelect={setSelectedColour}
                  />
                </div>
              )}

              {/* Add-ons */}
              {addons?.length > 0 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <span className="text-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
                    Add Extra Love
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {addons.map((addon) => (
                      <AddOnToggle
                        key={addon.id}
                        addon={addon}
                        isSelected={selectedAddons.some(a => a.addon_id === addon.id)}
                        onToggle={toggleAddon}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                Add to Cart — {formatPrice(price + selectedAddons.reduce((s, a) => s + a.price, 0))}
              </Button>

              {/* FAQ */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <Accordion items={[
                  { title: 'Delivery Information', content: 'Standard delivery takes 5-7 business days. Express delivery available for select pin codes.' },
                  { title: 'Care Instructions', content: 'Our eternal roses require no water and last for years. Keep away from direct sunlight.' },
                  { title: 'Returns & Exchanges', content: 'Custom items cannot be returned. For other products, returns accepted within 7 days of delivery.' },
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
