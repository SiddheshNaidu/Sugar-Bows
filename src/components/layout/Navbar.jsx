import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import BrandLogo from '@/components/icons/BrandLogo'
import { IconSearch, IconCart, IconUser, IconMenu, IconX } from '@/components/icons/Icons'
import './Navbar.css'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Customise', to: '/customise' },
  { label: 'Occasions', to: '/occasions' },
]

export default function Navbar() {
  const location = useLocation()
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore()
  const { user } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileMenuOpen(false) }, [location.pathname])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" aria-label="Sugar & Bows Home">
          <BrandLogo size="default" />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname.startsWith(link.to) ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Search">
            <IconSearch size={20} />
          </button>
          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <IconCart size={20} />
            {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
          </Link>
          <Link to={user ? '/account' : '/login'} className="navbar__icon-btn" aria-label="Account">
            <IconUser size={20} />
          </Link>
          <button
            className="navbar__menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`navbar__mobile ${mobileMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="navbar__mobile-link">
              {link.label}
            </Link>
          ))}
          <Link to={user ? '/account' : '/login'} className="navbar__mobile-link">
            {user ? 'My Account' : 'Sign In'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
