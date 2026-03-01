import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { IconBouquet } from '@/components/icons/Icons'

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{
            animation: 'float 4s ease-in-out infinite',
            marginBottom: 'var(--space-6)',
          }}>
            <IconBouquet size={80} color="var(--color-primary)" />
          </div>
          <h1 className="text-hero" style={{ marginBottom: 'var(--space-3)' }}>404</h1>
          <p className="text-body--lg" style={{ color: 'var(--color-medium-gray)', marginBottom: 'var(--space-8)' }}>
            Oops! This page has wandered off. Let's get you back to something lovely.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Link to="/"><Button variant="primary">Go Home</Button></Link>
            <Link to="/shop"><Button variant="secondary">Browse Shop</Button></Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
