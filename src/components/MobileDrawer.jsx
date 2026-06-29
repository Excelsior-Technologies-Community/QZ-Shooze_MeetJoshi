import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MobileDrawer.css'

const drawerSections = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shops',
    children: [
      { label: 'Filter Sidebar', path: '/shops' },
      { label: 'Filter Top', path: '/shops' },
      { label: 'Filter Drawer', path: '/shops' },
      { label: 'Without Filter', path: '/shops' },
      { label: 'Collection - 2 columns', path: '/shops' },
      { label: 'Collection - 3 columns', path: '/shops' },
      { label: 'Collection - 4 columns', path: '/shops' },
    ],
  },
  {
    label: 'Product',
    path: '/shops',
    children: [
      { label: 'Thumbnails - bottom', path: '/shops' },
      { label: 'Thumbnails - left', path: '/shops' },
      { label: 'Without Thumbnails', path: '/shops' },
      { label: 'Simple Product', path: '/shops' },
      { label: 'Variable Product', path: '/shops' },
      { label: 'With Video', path: '/shops' },
      { label: 'Sold Out - Coming', path: '/shops' },
    ],
  },
  {
    label: 'Blog',
    path: '/blog',
    children: [
      { label: 'List Left Sidebar', path: '/blog' },
      { label: 'List Right Sidebar', path: '/blog' },
      { label: 'Grid Left Sidebar', path: '/blog' },
      { label: 'Grid Right Sidebar', path: '/blog' },
      { label: 'Grid Item Basic', path: '/blog' },
    ],
  },
  {
    label: 'Pages',
    path: '/shops',
    children: [
      { label: 'About Us', path: '/shops' },
      { label: 'Contact', path: '/shops' },
      { label: 'Faqs', path: '/shops' },
      { label: 'Lookbook', path: '/shops' },
      { label: 'Size Guide', path: '/shops' },
      { label: 'Wishlist', path: '/wishlist' },
    ],
  },
  {
    label: 'Buy Now',
    path: '/shops',
    badge: 'Sale',
  },
]

export default function MobileDrawer({ isOpen, onClose, onOpenLogin, onOpenRegister }) {
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setExpanded({})
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const toggleSection = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className={`mobile-drawer ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation">
      <div className="mobile-drawer__overlay" onClick={onClose} />
      <nav className="mobile-drawer__panel" aria-label="Mobile navigation">
        <button type="button" className="mobile-drawer__close" onClick={onClose} aria-label="Close menu">
          <svg viewBox="0 0 14 14" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 13L1 1M13 1L1 13" />
          </svg>
        </button>

        <ul className="mobile-drawer__list">
          {drawerSections.map((section) => (
            <li key={section.label} className="mobile-drawer__item">
              {section.children ? (
                <>
                  <div className="mobile-drawer__row">
                    <Link to={section.path || '#'} className="mobile-drawer__link" onClick={onClose}>
                      {section.label}
                    </Link>
                    <button
                      type="button"
                      className={`mobile-drawer__toggle ${expanded[section.label] ? 'is-open' : ''}`}
                      onClick={() => toggleSection(section.label)}
                      aria-expanded={expanded[section.label]}
                      aria-label={`Toggle ${section.label} submenu`}
                    >
                      <span className="mobile-drawer__toggle-open">+</span>
                      <span className="mobile-drawer__toggle-close">&minus;</span>
                    </button>
                  </div>
                  <div className={`mobile-drawer__collapse ${expanded[section.label] ? 'is-open' : ''}`}>
                    <ul className="mobile-drawer__sublist">
                      {section.children.map((child) => (
                        <li key={child.label}>
                          <Link to={child.path} className="mobile-drawer__sublink" onClick={onClose}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="mobile-drawer__row">
                  <Link to={section.path} className="mobile-drawer__link" onClick={onClose}>
                    {section.label}
                    {section.badge && <span className="mobile-drawer__badge">{section.badge}</span>}
                  </Link>
                </div>
              )}
            </li>
          ))}

          <li className="mobile-drawer__item mobile-drawer__item--secondary">
            <div className="mobile-drawer__auth">
              <button type="button" className="mobile-drawer__auth-link" onClick={() => { onClose(); onOpenLogin?.() }}>
                Login
              </button>
              <span className="mobile-drawer__auth-sep">/</span>
              <button type="button" className="mobile-drawer__auth-link" onClick={() => { onClose(); onOpenRegister?.() }}>
                Register
              </button>
            </div>
          </li>

          <li className="mobile-drawer__item mobile-drawer__item--secondary mobile-drawer__item--localization">
            <div className="mobile-drawer__localization">
              <button type="button" className="mobile-drawer__locale-btn">
                AUD $
                <svg viewBox="0 0 10 6" width="10" height="6" fill="currentColor"><path d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"/></svg>
              </button>
              <button type="button" className="mobile-drawer__locale-btn">
                English
                <svg viewBox="0 0 10 6" width="10" height="6" fill="currentColor"><path d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"/></svg>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}
