import { useMemo, useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import FooterSection from '../components/FooterSection'
import ProductCard from '../components/ProductCard'
import { productsData } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './ProductDetail.css'

const fillerHero = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler2.png?v=1731652695&width=1920'
const fillerPrimary = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler3.png?v=1731652694&width=900'
const fillerAccent = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler4.png?v=1731652693&width=720'
const paymentsImage = 'https://qx-shooz.myshopify.com/cdn/shop/files/payments.jpg?v=1731652750&width=720'

const formatPrice = (price) => (price === 0 ? 'Price on request' : `$${price.toFixed(2)}`)
const getHandle = (product) => product.url?.split('/').pop()

function useStickyBar(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return visible
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    if (!targetDate) return
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

export default function ProductDetail() {
  const { handle } = useParams()
  const product = productsData.find((item) => getHandle(item) === handle)
  const [viewState, setViewState] = useState({
    handle: '',
    activeImage: 0,
    quantity: 1,
    added: false,
  })
  const [activeTab, setActiveTab] = useState('Description')
  const [openFaq, setOpenFaq] = useState('')
  const [openAccordion, setOpenAccordion] = useState('')
  const [recentlyOpen, setRecentlyOpen] = useState(false)
  const heroRef = useRef(null)
  const stickyVisible = useStickyBar(heroRef)
  const { addItem, openCart } = useCart()
  const { hasItem, toggleItem } = useWishlist()
  const isWishlisted = product ? hasItem(product.id) : false
  const currentView = viewState.handle === handle
    ? viewState
    : { handle, activeImage: 0, quantity: 1, added: false }

  useEffect(() => {
    const timer = setTimeout(() => setRecentlyOpen(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    const sameType = productsData.filter(
      (item) => item.id !== product.id && item.product_type === product.product_type,
    )
    const sameBrand = productsData.filter(
      (item) => item.id !== product.id && item.brand === product.brand && item.product_type !== product.product_type,
    )
    const fallback = productsData.filter((item) => item.id !== product.id)
    return [...sameType, ...sameBrand, ...fallback]
      .filter((item, index, list) => list.findIndex((entry) => entry.id === item.id) === index)
      .slice(0, 4)
  }, [product])

  const galleryImages = useMemo(() => {
    if (!product) return []
    return [product.image, product.second_image, ...relatedProducts.map((item) => item.image)]
      .filter(Boolean)
      .filter((image, index, list) => list.indexOf(image) === index)
      .slice(0, 5)
  }, [product, relatedProducts])

  const countdown = useCountdown(product?.countdown_end)

  if (!product) {
    return (
      <div className="product-detail-page">
        <SiteHeader />
        <main className="pd-not-found">
          <p>Product not found.</p>
          <Link to="/shops">Back to shop</Link>
        </main>
        <FooterSection />
      </div>
    )
  }

  const discount = product.discount_percent
    ? product.discount_percent
    : product.compare_at_price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null

  const recommendationProducts = productsData
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  const recentlyViewed = [product, ...productsData.filter((item) => item.id !== product.id)].slice(0, 6)

  const tabContent = {
    Description: `${product.name} brings ${product.tags?.slice(0, 3).join(', ') || 'everyday style'} into a comfortable silhouette made for repeat wear. The ${product.product_type.toLowerCase()} profile keeps the look polished while the supportive build makes it easy to move from daily errands to weekend plans.`,
    Material: 'Premium textile and synthetic upper, cushioned insole, flexible outsole, and careful finishing for dependable all-day comfort.',
    Reviews: `${product.brand} customers love the balanced fit, easy styling, and reliable comfort across the collection.`,
  }

  const handleAddToCart = () => {
    if (!product.in_stock) return
    addItem(product, currentView.quantity)
    setViewState({ ...currentView, added: true })
    openCart()
  }

  const handleBuyNow = () => {
    if (!product.in_stock) return
    addItem(product, currentView.quantity)
    setViewState({ ...currentView, added: true })
    openCart()
  }

  const toggleAccordion = (id) => setOpenAccordion(openAccordion === id ? '' : id)
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? '' : id)

  const handleToggleWishlist = () => {
    if (product) toggleItem(product)
  }

  return (
    <div className="product-detail-page">
      <SiteHeader />

      <main>
        <nav className="pd-breadcrumbs" aria-label="Breadcrumb">
          <div className="pd-container">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/shops">Shop</Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </div>
        </nav>

        <section className="pd-container pd-hero" ref={heroRef}>
          <div className="pd-gallery">
            <div className="pd-gallery-thumbs">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={currentView.activeImage === index ? 'is-active' : ''}
                  onClick={() => setViewState({ ...currentView, activeImage: index })}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img src={image} alt="" aria-hidden="true" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="pd-gallery-main">
              {discount ? <span className="pd-badge pd-badge-sale">-{discount}%</span> : null}
              {!product.in_stock ? <span className="pd-badge pd-badge-sold">Sold out</span> : null}
              <img src={galleryImages[currentView.activeImage]} alt={product.name} />
            </div>
          </div>

          <aside className="pd-info">
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price">{formatPrice(product.price)}</span>
              {product.compare_at_price ? <s className="pd-compare-price">{formatPrice(product.compare_at_price)}</s> : null}
            </div>

            <div className="pd-buy-row">
              <div className="pd-qty">
                <button
                  type="button"
                  onClick={() => setViewState({
                    ...currentView,
                    quantity: Math.max(1, currentView.quantity - 1),
                  })}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{currentView.quantity}</span>
                <button
                  type="button"
                  onClick={() => setViewState({ ...currentView, quantity: currentView.quantity + 1 })}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="pd-add-to-cart"
                disabled={!product.in_stock}
                onClick={handleAddToCart}
              >
                {!product.in_stock ? 'Sold Out' : currentView.added ? 'Added to cart' : 'Add to cart'}
              </button>
            </div>

            <button type="button" className="pd-buy-now" disabled={!product.in_stock} onClick={handleBuyNow}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Buy it now
            </button>

            <div className="pd-wishlist-row">
              <button type="button" className={`pd-action-link${isWishlisted ? ' is-wishlisted' : ''}`} onClick={handleToggleWishlist}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {isWishlisted ? 'Go to wishlist' : 'Add To Wishlist'}
              </button>
              <button type="button" className="pd-action-link">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>
                Compare
              </button>
            </div>

            <div className="pd-meta">
              <div className="pd-meta-row">
                <dt>Vendor</dt>
                <dd>{product.brand}</dd>
              </div>
              <div className="pd-meta-row">
                <dt>Type</dt>
                <dd>{product.product_type}</dd>
              </div>
              <div className="pd-meta-row">
                <dt>SKU</dt>
                <dd>{product.sku || 'N/A'}</dd>
              </div>
              <div className="pd-meta-row">
                <dt>Availability</dt>
                <dd className={product.in_stock ? 'in-stock' : 'out-stock'}>
                  {product.in_stock ? 'In stock' : 'Out of stock'}
                </dd>
              </div>
            </div>

            <div className="pd-accordion">
              <div className="pd-accordion-item">
                <button
                  type="button"
                  className={`pd-accordion-btn${openAccordion === 'shipping' ? ' open' : ''}`}
                  onClick={() => toggleAccordion('shipping')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Shipping information
                  <span className="pd-accordion-toggle">+</span>
                </button>
                <div className={`pd-accordion-body${openAccordion === 'shipping' ? ' open' : ''}`}>
                  <p>Free standard shipping on orders over $100. Express shipping available at checkout. Most orders ship within 1-2 business days.</p>
                </div>
              </div>
              <div className="pd-accordion-item">
                <button
                  type="button"
                  className={`pd-accordion-btn${openAccordion === 'care' ? ' open' : ''}`}
                  onClick={() => toggleAccordion('care')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Care guide
                  <span className="pd-accordion-toggle">+</span>
                </button>
                <div className={`pd-accordion-body${openAccordion === 'care' ? ' open' : ''}`}>
                  <p>Wipe clean with a damp cloth. Air dry away from direct sunlight. Do not machine wash or tumble dry.</p>
                </div>
              </div>
            </div>

            <div className="pd-salepoints">
              <div className="pd-salepoint">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>55% Linen, 45% Rayon</span>
              </div>
              <div className="pd-salepoint">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Secure payment</span>
              </div>
              <div className="pd-salepoint">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                <span>2 Year Warranty</span>
              </div>
            </div>

            <div className="pd-viewing">
              <span className="pd-dot" />
              <span>&#128064; {Math.floor(Math.random() * 20 + 15)} customers are viewing this product</span>
            </div>

            <div className="pd-sold-urgency">
              &#128293; {Math.floor(Math.random() * 15 + 20)} sold in last 18 hours
            </div>

            <div className="pd-shipping-progress">
              <div className="pd-progress-bar">
                <div className="pd-progress-fill" style={{ width: `${Math.min(100, (product.price / 100) * 100)}%` }} />
              </div>
              <p>Congratulations! You&apos;re getting free shipping.</p>
            </div>

            <div className="pd-social-share">
              <span>Share:</span>
              <a href="#" aria-label="Share on Facebook" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Share on Twitter" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" aria-label="Pin on Pinterest" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.93s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.24 3.76-5.48 0-2.87-2.06-4.87-5-4.87-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73a.36.36 0 0 1 .08.34l-.33 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.47-2.93-2.47-4.72 0-3.84 2.79-7.37 8.03-7.37 4.22 0 7.5 3.01 7.5 7.02 0 4.19-2.65 7.57-6.33 7.57-1.24 0-2.4-.64-2.8-1.4l-.76 2.91c-.28 1.06-1.03 2.4-1.54 3.21A12 12 0 1 0 12 0z"/></svg>
              </a>
            </div>

            <div className="pd-safe-checkout">
              <p className="pd-checkout-title">Guarantee safe checkout</p>
              <img src={paymentsImage} alt="Payment methods" />
            </div>
          </aside>
        </section>

        <section className="pd-product-content">
          <div className="pd-container pd-product-content-inner">
            <div className="pd-product-tabs">
              <div className="pd-tab-buttons" role="tablist" aria-label="Product information">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    className={activeTab === tab ? 'is-active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="pd-tab-content">
                {tabContent[activeTab]}
              </div>
            </div>

            <div className="pd-related-sidebar">
              <h5 className="pd-related-heading">Related products</h5>
              <div className="pd-related-grid">
                {recommendationProducts.slice(0, 2).map((item) => (
                  <div className="pd-related-item" key={item.id}>
                    <Link to={`/product/${getHandle(item)}`} className="pd-related-thumb">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </Link>
                    <div className="pd-related-meta">
                      <Link to={`/product/${getHandle(item)}`} className="pd-related-name">{item.name}</Link>
                      <span className="pd-related-price">{formatPrice(item.price)}</span>
                      <Link to={`/product/${getHandle(item)}`} className="pd-related-buy">+ Add to cart</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pd-parallax" style={{ backgroundImage: `url(${fillerHero})` }}>
          <div className="pd-parallax-inner">
            <div className="pd-parallax-content">
              <p className="pd-section-label">Effortless fashion, every day</p>
              <h2>Chic Styles for the Modern Woman</h2>
              <span>Embrace effortless elegance with curated styles designed to move from desk to dinner.</span>
            </div>
          </div>
        </section>

        <section className="pd-container pd-story">
          <div className="pd-story-images">
            <img src={fillerPrimary} alt="Runner tying shoes" className="pd-story-main" />
            <img src={fillerAccent} alt="Athletic shoe detail" className="pd-story-accent" />
          </div>
          <div className="pd-story-copy">
            <p className="pd-section-label">Classic meets contemporary</p>
            <h2>Timeless Styles with a Modern Edge</h2>
            <span>Experience a collection that blends timeless classics with modern twists, built for style that keeps pace.</span>
            <Link to="/shops" className="pd-story-btn">Discover now</Link>
          </div>
        </section>

        <section className="pd-benefits">
          <div className="pd-container pd-benefits-grid">
            <div className="pd-benefit">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <strong>Free Shipping</strong>
              <span>Free all orders over $100</span>
            </div>
            <div className="pd-benefit">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <strong>Quality Support</strong>
              <span>24/7 online feedback</span>
            </div>
            <div className="pd-benefit">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              <strong>Return &amp; Refund</strong>
              <span>Return money in 30 days</span>
            </div>
            <div className="pd-benefit">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 12v10H4V12"/><polyline points="22 7 12 2 2 7"/><rect x="2" y="7" width="20" height="5"/></svg>
              <strong>Gift Voucher</strong>
              <span>20% off when shopping online</span>
            </div>
          </div>
        </section>

        <section className="pd-explorer" style={{ backgroundImage: `url(${fillerHero})` }}>
          <div className="pd-explorer-inner">
            <p>3000+ Reviews</p>
            <h2>For the Explorers.</h2>
            <span>Weekends are better with friends</span>
          </div>
        </section>

        <section className="pd-faq-section">
          <div className="pd-container">
            <h2>FAQs</h2>
            <p className="pd-faq-sub">Have questions? We are here to help.</p>
            {[
              ['shipping', 'Is the shipping free?', 'Shipping is free on orders over $100. Standard rates apply below that amount.'],
              ['receive', 'When will I receive my item?', 'Most orders ship within 1-2 business days and arrive in 4-7 business days.'],
              ['return', 'Can I change or return my item?', 'Yes, unworn items can be returned within 30 days with original packaging.'],
            ].map(([id, question, answer]) => (
              <div className="pd-faq-item" key={id}>
                <button type="button" className="pd-faq-q" onClick={() => toggleFaq(id)}>
                  <span>{question}</span>
                  <span className={`pd-faq-icon${openFaq === id ? ' open' : ''}`}>+</span>
                </button>
                {openFaq === id && <p className="pd-faq-a">{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="pd-sale-strip">
          <div className="pd-container pd-sale-strip-inner">
            <div className="pd-sale-copy">
              <strong>Sale Event</strong>
              <span>We are offering discounts up to 50% on select styles.</span>
            </div>
            <Link to="/shops" className="pd-sale-btn">Shop collection</Link>
          </div>
        </section>

        {product.has_countdown && (
          <section className="pd-container pd-countdown-section">
            <div className="pd-countdown-grid">
              {[
                ['Days', countdown.days],
                ['Hours', countdown.hours],
                ['Mins', countdown.minutes],
                ['Secs', countdown.seconds],
              ].map(([label, val], i, arr) => (
                <span key={label} className="pd-countdown-group">
                  <div className="pd-countdown-box">
                    <span className="pd-countdown-num">{String(val).padStart(2, '0')}</span>
                    <span className="pd-countdown-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <span className="pd-countdown-sep">:</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="pd-container pd-recommendations">
          <div className="pd-section-header">
            <h2>You may also like</h2>
          </div>
          <div className="pd-recommendations-grid">
            {recommendationProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        <section className="pd-container pd-recently">
          <div className="pd-section-header">
            <h2>Recently viewed</h2>
          </div>
          <div className="pd-recently-grid">
            {recentlyViewed.map((item) => (
              <div className="pd-recently-item" key={item.id}>
                <Link to={`/product/${getHandle(item)}`} className="pd-recently-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </Link>
                <div className="pd-recently-text">
                  <Link to={`/product/${getHandle(item)}`} className="pd-recently-name">{item.name}</Link>
                  <span className="pd-recently-price">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className={`pd-sticky-bar${stickyVisible ? ' visible' : ''}`}>
        <img className="pd-sticky-img" src={product.image} alt="" />
        <div className="pd-sticky-info">
          <span className="pd-sticky-name">{product.name}</span>
          <span className="pd-sticky-price">{formatPrice(product.price)}</span>
        </div>
        <div className="pd-sticky-actions">
          <button type="button" className="pd-sticky-add" disabled={!product.in_stock} onClick={handleAddToCart}>
            {!product.in_stock ? 'Sold Out' : currentView.added ? 'Added' : 'Add to cart'}
          </button>
          <button type="button" className="pd-sticky-buy" disabled={!product.in_stock} onClick={handleBuyNow}>
            Buy it now
          </button>
        </div>
      </div>

      <div className={`pd-recently-popup${recentlyOpen ? ' active' : ''}`}>
        <button className="pd-recently-close" onClick={() => setRecentlyOpen(false)} aria-label="Close">
          <svg focusable="false" width="14" height="14" viewBox="0 0 14 14">
            <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
        <div className="pd-recently-inner">
          <a className="pd-popup-img" href={`/product/${getHandle(recentlyViewed[1] || product)}`}>
            <img src={recentlyViewed[1]?.image || product.image} alt="" loading="lazy" />
          </a>
          <div className="pd-popup-col">
            <label>Someone recently bought</label>
            <a className="pd-popup-name" href={`/product/${getHandle(recentlyViewed[1] || product)}`}>
              {recentlyViewed[1]?.name || product.name}
            </a>
            <div className="pd-popup-location">in your area</div>
            <div className="pd-popup-time">Just now</div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
