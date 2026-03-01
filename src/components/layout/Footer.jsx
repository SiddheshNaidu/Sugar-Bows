import { Link } from 'react-router-dom'
import BrandLogo from '@/components/icons/BrandLogo'
import { IconInstagram, IconWhatsApp, IconMail, IconMapPin } from '@/components/icons/Icons'
import './Footer.css'

const shopLinks = [
  { label: 'Rose Arrangements', to: '/shop/rose_arrangements' },
  { label: 'Custom Frames', to: '/shop/custom_frames' },
  { label: 'Gift Combos', to: '/shop/gift_combos' },
  { label: 'Add-Ons', to: '/shop/add_ons' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Shipping Policy', to: '/shipping' },
  { label: 'Returns & Exchanges', to: '/returns' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand-col">
            <BrandLogo size="lg" />
            <p className="footer__tagline">
              Handcrafted eternal roses & personalised frames — made with love, designed to last forever.
            </p>
            <div className="footer__social">
              <a href="https://www.instagram.com/sugar_and_bows" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <IconInstagram size={20} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">
                <IconWhatsApp size={20} />
              </a>
              <a href="mailto:hello@sugarandbows.com" className="footer__social-link" aria-label="Email">
                <IconMail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="footer__col">
            <h4 className="footer__col-title">Shop</h4>
            {shopLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">{link.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            {companyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">{link.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get in Touch</h4>
            <div className="footer__contact-item">
              <IconMapPin size={16} />
              <span>Mumbai, India</span>
            </div>
            <div className="footer__contact-item">
              <IconMail size={16} />
              <span>hello@sugarandbows.com</span>
            </div>
            <div className="footer__contact-item">
              <IconInstagram size={16} />
              <span>@sugar_and_bows</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Sugar & Bows. Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  )
}
