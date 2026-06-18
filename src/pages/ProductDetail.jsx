import { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import FooterSection from '../components/FooterSection'
import ProductCardActions from '../components/ProductCardActions'
import { productsData } from '../data/products'
import './ProductDetail.css'

const fillerHero = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler2.png?v=1731652695&width=1920'
const fillerPrimary = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler3.png?v=1731652694&width=900'
const fillerAccent = 'https://qx-shooz.myshopify.com/cdn/shop/files/filler4.png?v=1731652693&width=720'
const paymentsImage = 'https://qx-shooz.myshopify.com/cdn/shop/files/payments.jpg?v=1731652750&width=720'

const formatPrice = (price) => (price === 0 ? 'Price on request' : `$${price.toFixed(2)}`)
const getHandle = (product) => product.url?.split('/').pop()
const productPath = (product) => `/product/${getHandle(product)}`

function SmallProductCard({ product }) {
  return (
    <article className="detail-product-card">
      <Link to={productPath(product)} className="detail-product-image">
        {product.sale ? <span>Sale</span> : null}
        <img src={product.image} alt={product.name} loading="lazy" className="primary-image" />
        {product.second_image ? (
          <img src={product.second_image} alt="" aria-hidden="true" loading="lazy" className="secondary-image" />
        ) : null}
      </Link>
      <div className="detail-product-copy">
        <Link to={productPath(product)}>{product.name}</Link>
        <p>
          {formatPrice(product.price)}
          {product.compare_at_price ? <s>{formatPrice(product.compare_at_price)}</s> : null}
        </p>
        <small>{product.brand}</small>
        <ProductCardActions
          product={product}
          productName={product.name}
          productLink={productPath(product)}
          inStock={product.in_stock}
        />
      </div>
    </article>
  )
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
  const [openFaq, setOpenFaq] = useState('shipping')
  const [recentlyOpen, setRecentlyOpen] = useState(false)
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

  if (!product) {
    return (
      <div className="product-detail-page">
        <SiteHeader />
        <main className="detail-not-found">
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

  const recentlyViewed = [product, ...productsData.filter((item) => item.id !== product.id)].slice(0, 5)

  const tabContent = {
    Description: `${product.name} brings ${product.tags?.slice(0, 3).join(', ') || 'everyday style'} into a comfortable silhouette made for repeat wear. The ${product.product_type.toLowerCase()} profile keeps the look polished while the supportive build makes it easy to move from daily errands to weekend plans.`,
    Material: 'Premium textile and synthetic upper, cushioned insole, flexible outsole, and careful finishing for dependable all-day comfort.',
    Reviews: `${product.brand} customers love the balanced fit, easy styling, and reliable comfort across the collection.`,
  }

  const handleAddToCart = () => {
    if (!product.in_stock) return
    setViewState({ ...currentView, added: true })
  }

  return (
    <div className="product-detail-page">
      <SiteHeader />

      <main>
        <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
          <div className="detail-container">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shops">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </nav>

        <section className="detail-container product-detail-hero">
          <div className="detail-gallery" aria-label={`${product.name} gallery`}>
            <div className="detail-main-media">
              {discount ? <span className="detail-sale-badge">-{discount}%</span> : null}
              {!product.in_stock ? <span className="detail-sold-badge">Sold out</span> : null}
              <img src={galleryImages[currentView.activeImage]} alt={product.name} />
            </div>
            <div className="detail-thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={currentView.activeImage === index ? 'is-active' : ''}
                  onClick={() => setViewState({ ...currentView, activeImage: index })}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img src={image} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <aside className="detail-summary">
            <h1 className="detail-product-title">{product.name}</h1>
            <div className="detail-price-row">
              <span className="detail-current-price">{formatPrice(product.price)}</span>
              {product.compare_at_price ? <s className="detail-original-price">{formatPrice(product.compare_at_price)}</s> : null}
            </div>

            <div className="detail-buy-row">
              <div className="quantity-stepper" aria-label="Quantity selector">
                <button
                  type="button"
                  onClick={() => setViewState({
                    ...currentView,
                    quantity: Math.max(1, currentView.quantity - 1),
                  })}
                  aria-label="Decrease quantity"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                <span className="quantity-value">{currentView.quantity}</span>
                <button
                  type="button"
                  onClick={() => setViewState({ ...currentView, quantity: currentView.quantity + 1 })}
                  aria-label="Increase quantity"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
              <button
                type="button"
                className="detail-cart-button"
                disabled={!product.in_stock}
                onClick={handleAddToCart}
              >
                <svg className="btn-cart-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>
                </svg>
                <span className="btn-cart-text">
                  {!product.in_stock ? 'Sold Out' : currentView.added ? 'Added to cart' : 'Add to cart'}
                </span>
              </button>
            </div>

            <div className="detail-mini-actions">
              <button type="button" className="action-wishlist">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 21s-7-4.35-11-8.28C-1 8.72.34 3.94 4.17 3.56c1.34-.13 2.64.56 3.5 1.66L12 7l4.33-3.78c.86-1.1 2.16-1.79 3.5-1.66 3.83.38 5.17 5.16 3.17 9.16C19 16.65 12 21 12 21z"/></svg>
                Add to wishlist
              </button>
              <button type="button" className="action-compare">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6v6H4V6h6zm6 4v6h-6v-6h6zM4 18h6v-6H4v6zm8 0h6v-6h-6v6z"/></svg>
                Compare
              </button>
            </div>

            <div className="detail-meta-list">
              <div className="meta-row">
                <dt>Vendor</dt>
                <dd>{product.brand}</dd>
              </div>
              <div className="meta-row">
                <dt>Type</dt>
                <dd>{product.product_type}</dd>
              </div>
              <div className="meta-row">
                <dt>SKU</dt>
                <dd className="js-variant-sku">{product.sku || 'N/A'}</dd>
              </div>
              <div className="meta-row">
                <dt>Availability</dt>
                <dd className={product.in_stock ? 'in-stock' : 'out-stock'}>
                  {product.in_stock ? 'In stock' : 'Out of stock'}
                </dd>
              </div>
            </div>

            <div className="detail-tags">
              {product.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <div className="detail-accordions">
              {Object.keys(tabContent).map((label) => (
                <details key={label} open={activeTab === label}>
                  <summary
                    className="detail-accordion-tab"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab(label)
                    }}
                  >
                    {label === 'Description' && (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    )}
                    {label === 'Material' && (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
                    )}
                    {label === 'Reviews' && (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    )}
                    {label}
                  </summary>
                  <div className="detail-accordion-body">
                    <p>{tabContent[label]}</p>
                  </div>
                </details>
              ))}
            </div>

            <ul className="detail-service-list">
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Free shipping over $100
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secure payment
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                30-day return window
              </li>
            </ul>

            <div className="safe-checkout">
              <span>Guarantee safe checkout</span>
              <img src={paymentsImage} alt="Supported payment methods" />
            </div>
          </aside>
        </section>

        <section className="detail-container detail-tabs-related">
          <div className="detail-tabs">
            <div className="detail-tab-buttons" role="tablist" aria-label="Product information">
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
            <div className="detail-tab-content">
              {tabContent[activeTab]}
            </div>
          </div>

          <div className="related-products">
            <h2>You may also like</h2>
            <div className="detail-product-grid">
              {recommendationProducts.map((item) => <SmallProductCard product={item} key={item.id} />)}
            </div>
          </div>
        </section>

        <section className="detail-image-banner" style={{ backgroundImage: `url(${fillerHero})` }}>
          <div>
            <p>Effortless fashion, every day</p>
            <h2>Chic Styles for the Modern Woman</h2>
            <span>
              Embrace effortless elegance with curated styles designed to move from desk to dinner.
            </span>
          </div>
        </section>

        <section className="detail-container detail-story">
          <div className="story-collage">
            <img src={fillerPrimary} alt="Runner tying shoes" />
            <img src={fillerAccent} alt="Athletic shoe detail" />
          </div>
          <div className="story-copy">
            <p>Classic meets contemporary</p>
            <h2>Timeless Styles with a Modern Edge</h2>
            <span>
              Experience a collection that blends timeless classics with modern twists, built for style that keeps pace.
            </span>
            <Link to="/shops">Discover now</Link>
          </div>
        </section>

        <section className="detail-benefits">
          <div className="detail-container">
            <div>
              <strong>Free Shipping</strong>
              <span>Free all orders over $100</span>
            </div>
            <div>
              <strong>Quality Support</strong>
              <span>24/7 online feedback</span>
            </div>
            <div>
              <strong>Return & Refund</strong>
              <span>Return money in 30 days</span>
            </div>
            <div>
              <strong>Gift Voucher</strong>
              <span>20% off when shopping online</span>
            </div>
          </div>
        </section>

        <section className="detail-explorer">
          <div>
            <p>3000+ Reviews</p>
            <h2>For the Explorers.</h2>
            <span>Weekends are better with friends</span>
          </div>
        </section>

        <section className="detail-container detail-faq">
          <h2>FAQs</h2>
          <p>Have questions? We are here to help.</p>
          {[
            ['shipping', 'Is the shipping free?', 'Shipping is free on orders over $100. Standard rates apply below that amount.'],
            ['receive', 'When will I receive my item?', 'Most orders ship within 1-2 business days and arrive in 4-7 business days.'],
            ['return', 'Can I change or return my item?', 'Yes, unworn items can be returned within 30 days with original packaging.'],
          ].map(([id, question, answer]) => (
            <div className="faq-row" key={id}>
              <button type="button" onClick={() => setOpenFaq(openFaq === id ? '' : id)}>
                <span>{question}</span>
                <span>{openFaq === id ? '-' : '+'}</span>
              </button>
              {openFaq === id ? <p>{answer}</p> : null}
            </div>
          ))}
        </section>

        <section className="detail-container detail-sale-strip">
          <div>
            <strong>Sale Event</strong>
            <span>We are offering discounts up to 50% on select styles.</span>
          </div>
          <Link to="/shops">Shop collection</Link>
        </section>

        <section className="detail-container detail-recommendations">
          <h2>You may also like</h2>
          <div className="detail-product-grid">
            {recommendationProducts.map((item) => <SmallProductCard product={item} key={item.id} />)}
          </div>
        </section>

        <section className="detail-container detail-recommendations detail-recently-viewed">
          <h2>Recently viewed</h2>
          <div className="detail-product-grid compact">
            {recentlyViewed.map((item) => <SmallProductCard product={item} key={item.id} />)}
          </div>
        </section>
      </main>

      <div className={`recently-view-popup${recentlyOpen ? ' active' : ''}`}>
        <button className="recently-view-close" onClick={() => setRecentlyOpen(false)} aria-label="Close">
          <svg focusable="false" width="14" height="14" viewBox="0 0 14 14">
            <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="1.5" fill="none"></path>
          </svg>
        </button>
        <div className="recently-view-suggest">
          <a className="recently-view-image" href={`/product/${getHandle(recentlyViewed[1] || product)}`}>
            <img src={recentlyViewed[1]?.image || product.image} alt="" loading="lazy" />
          </a>
          <div className="recently-view-column">
            <label>Someone recently bought</label>
            <a className="recently-view-name" href={`/product/${getHandle(recentlyViewed[1] || product)}`}>
              {recentlyViewed[1]?.name || product.name}
            </a>
            <div className="recently-view-location">in your area</div>
            <div className="recently-view-time">Just now</div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
