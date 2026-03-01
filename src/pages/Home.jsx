import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import ProductGrid from '@/components/product/ProductGrid'
import BrandLogo from '@/components/icons/BrandLogo'
import { IconSparkles, IconTruck, IconHeart, IconCamera, IconBouquet, IconFrame, IconGift, IconStar, IconArrowRight } from '@/components/icons/Icons'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { categories } from '@/constants/theme'

// Product images
import heroBouquet from '@/assets/images/products/hero_bouquet.png'
import redVelvetRoses from '@/assets/images/products/red_velvet_roses.png'
import pinkRosesBouquet from '@/assets/images/products/pink_roses_bouquet.png'
import customPhotoFrame from '@/assets/images/products/custom_photo_frame.png'
import bluePurpleRoses from '@/assets/images/products/blue_purple_roses.png'
import sunlightBouquet from '@/assets/images/products/sunlight_bouquet.png'
import giftComboBox from '@/assets/images/products/gift_combo_box.png'
import hairclipBouquet from '@/assets/images/products/hairclip_bouquet.png'

import './Home.css'

const categoryIcons = {
  rose_arrangements: <IconBouquet size={32} color="var(--color-primary)" />,
  custom_frames: <IconFrame size={32} color="var(--color-primary)" />,
  gift_combos: <IconGift size={32} color="var(--color-primary)" />,
  add_ons: <IconStar size={32} color="var(--color-primary)" />,
  subscriptions: <IconHeart size={32} color="var(--color-primary)" />,
}

// Showcase gallery images
const galleryImages = [
  { src: redVelvetRoses, alt: 'Red Velvet Roses in Black Gift Box', label: 'Velvet Blooms' },
  { src: bluePurpleRoses, alt: 'Blue & Purple Satin Rose Bouquet', label: 'Royal Satin' },
  { src: customPhotoFrame, alt: 'Clay Roses Photo Frame', label: 'Custom Frames' },
  { src: sunlightBouquet, alt: 'Sunlight Bouquet', label: 'Sunny Charm' },
  { src: hairclipBouquet, alt: 'Hairclip Flower Bouquet', label: 'Hairclip Blooms' },
  { src: giftComboBox, alt: 'Curated Gift Combo Box', label: 'Gift Combos' },
]

export default function Home() {
  const { data: featured, isLoading } = useFeaturedProducts()

  return (
    <PageWrapper>
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="text-overline">Handcrafted with love</span>
            <h1 className="text-hero">
              Gifts that say<br />
              <span className="text-hero--italic">what words can't</span>
            </h1>
            <p className="hero__subtitle text-body--lg">
              Eternal rose arrangements & custom birthday frames —
              made by hand, delivered to their door. Starting from ₹120.
            </p>
            <div className="hero__actions">
              <Link to="/shop">
                <Button variant="primary" size="lg" icon={<IconArrowRight size={18} />}>Shop Now</Button>
              </Link>
              <Link to="/customise">
                <Button variant="secondary" size="lg">Customise a Frame</Button>
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-main">
              <img src={heroBouquet} alt="Luxury handcrafted eternal rose bouquet by Sugar & Bows" />
            </div>
            <div className="hero__image-float hero__image-float--1">
              <img src={pinkRosesBouquet} alt="Pink glitter roses bouquet" />
            </div>
            <div className="hero__image-float hero__image-float--2">
              <img src={customPhotoFrame} alt="Custom clay roses photo frame" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items">
            <div className="trust-bar__item">
              <IconSparkles size={22} color="var(--color-primary)" />
              <span className="trust-bar__text">Handcrafted Quality</span>
            </div>
            <div className="trust-bar__item">
              <IconTruck size={22} color="var(--color-primary)" />
              <span className="trust-bar__text">Pan-India Delivery</span>
            </div>
            <div className="trust-bar__item">
              <IconHeart size={22} color="var(--color-primary)" />
              <span className="trust-bar__text">Personalised Touch</span>
            </div>
            <div className="trust-bar__item">
              <IconCamera size={22} color="var(--color-primary)" />
              <span className="trust-bar__text">Proof Before Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Browse by</span>
            <h2 className="h2">Categories</h2>
          </div>
          <div className="categories-grid">
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.slug} to={`/shop/${cat.slug}`} className="category-card">
                <span className="category-card__icon">
                  {categoryIcons[cat.slug] || <IconGift size={32} color="var(--color-primary)" />}
                </span>
                <h3 className="category-card__title">{cat.label}</h3>
                <p className="category-card__desc">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Showcase ─── */}
      <section className="section gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Our creations</span>
            <h2 className="h2">Handpicked, Beautifully Wrapped</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <Link to="/shop" key={i} className={`gallery-item gallery-item--${i + 1}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{img.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Divider ornate />

      {/* ─── Featured Products ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Curated for you</span>
            <h2 className="h2">Featured Creations</h2>
          </div>
          <ProductGrid products={featured} isLoading={isLoading} columns={4} />
          <div className="section-footer">
            <Link to="/shop">
              <Button variant="secondary" icon={<IconArrowRight size={16} />}>View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Customise CTA ─── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-card__content">
              <span className="text-overline">Make it personal</span>
              <h2 className="h2">Custom Birthday Frames</h2>
              <p className="text-body">
                Upload a photo, add a heartfelt message, and we'll craft a
                one-of-a-kind frame — approved by you before it's sent.
              </p>
              <Link to="/customise">
                <Button variant="primary" size="lg" icon={<IconFrame size={18} />}>Start Customising</Button>
              </Link>
            </div>
            <div className="cta-card__visual">
              <img src={customPhotoFrame} alt="Custom photo frame with clay roses" className="cta-card__image" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Occasions CTA ─── */}
      <section className="section">
        <div className="container">
          <div className="occasion-cta">
            <IconHeart size={40} color="var(--color-primary)" />
            <h2 className="h2">Never Miss a Moment</h2>
            <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
              Save birthdays and anniversaries — we'll remind you when
              it's time to send something special.
            </p>
            <Link to="/occasions">
              <Button variant="secondary" size="lg">Set Up Reminders</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Instagram Feed CTA ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Follow us</span>
            <h2 className="h2">@sugar_and_bows</h2>
          </div>
          <div className="instagram-grid">
            {[redVelvetRoses, bluePurpleRoses, sunlightBouquet, hairclipBouquet].map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/sugar_and_bows"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-grid__item"
              >
                <img src={src} alt={`Sugar & Bows Instagram post ${i + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
