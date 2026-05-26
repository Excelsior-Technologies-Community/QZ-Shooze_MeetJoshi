import { useState } from 'react'
import './SiteHeader.css'

const promoMessages = [
  'Enjoy 20% off your entire order with the code SHOEFRESH20.',
  'Get 15% off your first purchase when you sign up for our newsletter.',
]

const logoUrl =
  'https://qx-shooz.myshopify.com/cdn/shop/files/logo.png?v=1731409697&width=280'

const navItems = [
  { label: 'Home', active: true },
  { label: 'Shop', hasDropdown: true },
  { label: 'Product', hasDropdown: true },
  { label: 'Blog', hasDropdown: true },
  { label: 'Pages', hasDropdown: true },
  { label: 'Buy Now', badge: 'Sale' },
]

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10.5 12 15l5-4.5" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.44 1.41-1.42-4.43-4.43A6.5 6.5 0 0 0 10.5 4Z" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 1.75c-4.64 0-8 2.5-8 5.25V21h16v-2c0-2.75-3.36-5.25-8-5.25Z" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.7 10.7 19.52C5.87 15.2 2.5 12.16 2.5 8.37A5.37 5.37 0 0 1 7.87 3c1.7 0 3.33.79 4.13 2.04A5.34 5.34 0 0 1 16.13 3a5.37 5.37 0 0 1 5.37 5.37c0 3.79-3.37 6.83-8.2 11.15Z" />
    </svg>
  )
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8h10l-.83 12H7.83L7 8Zm3-1V6.5a2 2 0 1 1 4 0V7" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.36-2.8H13.5V9.21c0-.81.23-1.36 1.39-1.36H16.5V5.33c-.28-.04-1.23-.12-2.34-.12-2.31 0-3.89 1.41-3.89 4v1.79H7.9v2.8h2.37V21Z" />
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 7.15c.01.19.01.39.01.58 0 5.92-4.5 12.75-12.75 12.75-2.53 0-4.89-.74-6.88-2.01.35.04.71.06 1.07.06 2.1 0 4.03-.71 5.56-1.92a4.5 4.5 0 0 1-4.2-3.12c.28.04.56.07.85.07.41 0 .82-.05 1.2-.16A4.5 4.5 0 0 1 .95 8.98v-.06c.6.34 1.29.55 2.02.58A4.5 4.5 0 0 1 1.58 3.5a12.77 12.77 0 0 0 9.27 4.7 4.5 4.5 0 0 1 7.66-4.1 9 9 0 0 0 2.86-1.09 4.52 4.52 0 0 1-1.98 2.49A9 9 0 0 0 22 4.78a9.7 9.7 0 0 1-3.1 2.37Z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 3h9.6A4.2 4.2 0 0 1 21 7.2v9.6a4.2 4.2 0 0 1-4.2 4.2H7.2A4.2 4.2 0 0 1 3 16.8V7.2A4.2 4.2 0 0 1 7.2 3Zm0 1.8A2.4 2.4 0 0 0 4.8 7.2v9.6a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4V7.2a2.4 2.4 0 0 0-2.4-2.4Zm9.9 1.35a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.71 2.71 0 0 0 12 9.3Z" />
    </svg>
  )
}

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="promo-bar">
        <div className="promo-track">
          {Array.from({ length: 4 }).map((_, repeatIndex) =>
            promoMessages.map((message) => (
              <div className="promo-item" key={`${message}-${repeatIndex}`}>
                <span>{message}</span>
                <a href="/">Dismiss</a>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="utility-bar">
        <p>One Day Delivery Available</p>
        <div className="utility-links">
          <a href="/">Login</a>
          <span>/</span>
          <a href="/">Register</a>
          <a href="/" aria-label="Facebook">
            <IconFacebook />
          </a>
          <a href="/" aria-label="Twitter">
            <IconTwitter />
          </a>
          <a href="/" aria-label="Instagram">
            <IconInstagram />
          </a>
        </div>
      </div>

      <div className="main-header">
        <button
          className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="brand-mark" href="/" aria-label="Shooz home">
          <img src={logoUrl} alt="Qx Shooz" />
        </a>

        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="/"
              className={item.active ? 'is-active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              <span>{item.label}</span>
              {item.hasDropdown ? <IconChevron /> : null}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" aria-label="Search">
            <IconSearch />
          </button>
          <button type="button" aria-label="Account">
            <IconUser />
          </button>
          <button type="button" aria-label="Wishlist" className="heart-button">
            <IconHeart />
            <span className="action-count">2</span>
          </button>
          <a href="/" className="cart-link" aria-label="Cart">
            <IconBag />
            <span>(1)</span>
          </a>
        </div>
      </div>

      <div
        className={`nav-backdrop ${isMenuOpen ? 'is-visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  )
}

export default SiteHeader
