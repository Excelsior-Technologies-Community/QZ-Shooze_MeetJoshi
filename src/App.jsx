import { useEffect, useState } from 'react'
import './App.css'
import FeaturedCollections from './components/FeaturedCollections'
import BannerGrid from './components/BannerGrid'
import BannerGridDouble from './components/BannerGridDouble'
import ProductListSmall from './components/ProductListSmall'
import AdvancedContent from './components/AdvancedContent'
import StoreBanner from './components/StoreBanner'
import BrandSection from './components/BrandSection'

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

const slides = [
  {
    eyebrow: 'Step into Style',
    title: 'Discover the latest trends in footwear',
    description:
      'From classic sneakers to trendy boots, our collection has something for everyone.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-1.png?v=1731045553&width=1728',
    href: '/collections/all',
    align: 'right',
  },
  {
    eyebrow: 'Elevate Your Look',
    title: 'Find the perfect pair of shoes to complete.',
    description:
      'Explore our wide range of styles, colors, and materials to find the perfect shoes for any occasion.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-2.png?v=1731045552&width=1728',
    href: '#',
    align: 'right',
  },
  {
    eyebrow: 'Comfort Meets Fashion',
    title: 'Discover shoes that look great and feel even better.',
    description:
      'Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-3.png?v=1731045552&width=1728',
    href: '/collections',
    align: 'left',
  },
]

const collectionBanners = [
  {
    label: 'Trending',
    title: 'Men Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-1.png?v=1731045511&width=1920',
    href: '/collections',
  },
  {
    label: 'Latest',
    title: 'Women Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-3.png?v=1731045510&width=1920',
    href: '/collections',
  },
  {
    label: 'Comfort',
    title: 'Kid Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-2.png?v=1731045516&width=1920',
    href: '/collections',
  },
]

const comfortBanner = {
  eyebrow: 'Comfort Meets Fashion',
  title: 'Discover shoes that look great and feel even better',
  description:
    'Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.',
  image:
    'https://qx-shooz.myshopify.com/cdn/shop/files/wide-banner.png?v=1731045552&width=1940',
  href: '/collections',
}

const promoTickerItems = [
  'Enjoy 20% off your entire order with the code SHOEFRESH20',
  'Get 15% off your first purchase when you sign up for our newsletter. Use code NEWSHOES15',
  'Buy one pair of shoes, get the second pair 50% off. Use code BOGO50',
]

const productTabs = [
  {
    label: 'Featured',
    products: [
      {
        name: 'Classic White Tennis Sneakers',
        vendor: 'SportyFeet',
        price: '$25.00',
        href: '/products/classic-white-tennis-sneakers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-4_a9f5532a-47cd-4f32-8958-57ee765f0a27.jpg?v=1731311278&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-19_323f61e6-cfd6-4407-823a-273f154d188c.jpg?v=1731311295&width=720',
      },
      {
        name: 'Waterproof Hiking Boots',
        vendor: 'TrailGear',
        price: '$25.00',
        href: '/products/waterproof-hiking-boots',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-17.jpg?v=1731315215&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-23_8eeee338-7bad-4c2b-b296-6804d886a41a.jpg?v=1731315325&width=720',
        countdown: ['1606 Days', '16 Hours', '35 Mins', '30 Secs'],
        dots: 4,
        activeDot: 1,
      },
      {
        name: 'Classic Leather Sneakers',
        vendor: 'UrbanStep',
        price: '$21.00',
        href: '/products/classic-leather-sneakers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-3_be4a38ab-621f-46d5-a126-3488687e10f6.jpg?v=1731311211&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-26_a72ab182-4323-4754-aa41-d64401571e17.jpg?v=1731311225&width=720',
      },
      {
        name: 'High-Top Canvas Sneakers',
        vendor: 'TrendyFeet',
        price: '$25.00',
        href: '/products/high-top-canvas-sneakers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-7_bf9fee80-650d-4775-a219-0eaccf66d47b.jpg?v=1731311538&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-19_49ae4265-2610-48a8-b934-1a24b6136832.jpg?v=1731311550&width=720',
      },
    ],
  },
  {
    label: 'New Arrivals',
    products: [
      {
        name: 'Chunky Platform Sandals',
        vendor: 'BoldWalks',
        price: '$25.00',
        comparePrice: '$32.00',
        sale: '-21%',
        href: '/products/chunky-platform-sandals',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-2_f21b4635-7aa2-414f-b44c-6ce8171394ed.jpg?v=1731310979&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-22.jpg?v=1731310991&width=720',
      },
      {
        name: 'Breathable Mesh Slip-Ons',
        vendor: 'AirWalk',
        price: '$25.00',
        href: '/products/breathable-mesh-slip-ons',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-1_831d6162-6f44-4896-ac4c-88eb8a35a6a9.jpg?v=1731310932&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_be1e3b54-5764-4f9d-b77d-f23718b8bd6f.jpg?v=1731310946&width=720',
      },
      {
        name: 'Premium Leather Chelsea Boots',
        vendor: 'LuxeFeet',
        price: '$25.00',
        href: '/products/premium-leather-chelsea-boots',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-11_a12147c9-4d7c-49e7-976a-690fea2264cd.jpg?v=1731314667&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_b63bf456-53dd-4c96-a994-753c3915d93c.jpg?v=1731314688&width=720',
      },
      {
        name: 'Vintage Suede Loafers',
        vendor: 'RetroSole',
        price: '$25.00',
        href: '/products/vintage-suede-loafers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-16_e04d477d-efdc-4ec6-b50b-c2988e78b8a5.jpg?v=1731315204&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-20_e8528337-5425-4244-a682-7632fa76a3a0.jpg?v=1731315325&width=720',
      },
    ],
  },
  {
    label: 'Best Seller',
    products: [
      {
        name: 'Waterproof Hiking Boots',
        vendor: 'TrailGear',
        price: '$25.00',
        href: '/products/waterproof-hiking-boots',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-17.jpg?v=1731315215&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-23_8eeee338-7bad-4c2b-b296-6804d886a41a.jpg?v=1731315325&width=720',
        countdown: ['1606 Days', '16 Hours', '35 Mins', '30 Secs'],
      },
      {
        name: 'Classic Leather Sneakers',
        vendor: 'UrbanStep',
        price: '$21.00',
        href: '/products/classic-leather-sneakers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-3_be4a38ab-621f-46d5-a126-3488687e10f6.jpg?v=1731311211&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-26_a72ab182-4323-4754-aa41-d64401571e17.jpg?v=1731311225&width=720',
      },
      {
        name: 'High-Top Canvas Sneakers',
        vendor: 'TrendyFeet',
        price: '$25.00',
        href: '/products/high-top-canvas-sneakers',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-7_bf9fee80-650d-4775-a219-0eaccf66d47b.jpg?v=1731311538&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-19_49ae4265-2610-48a8-b934-1a24b6136832.jpg?v=1731311550&width=720',
      },
      {
        name: 'Premium Leather Chelsea Boots',
        vendor: 'LuxeFeet',
        price: '$25.00',
        href: '/products/premium-leather-chelsea-boots',
        image:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-11_a12147c9-4d7c-49e7-976a-690fea2264cd.jpg?v=1731314667&width=720',
        hoverImage:
          'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_b63bf456-53dd-4c96-a994-753c3915d93c.jpg?v=1731314688&width=720',
      },
    ],
  },
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

function IconArrow() {
  return (
    <svg viewBox="0 0 10 8" aria-hidden="true">
      <path d="M9 4.5H0v-1h9Z" />
      <path d="m6 1.5.7-.7 3 3-.7.7Z" />
      <path d="m6 6.5.7.7 3-3-.7-.7Z" />
    </svg>
  )
}

function App() {
  const [activeSlide, setActiveSlide] = useState(2)
  const [activeProductTab, setActiveProductTab] = useState('Featured')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="storefront-shell">
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
          <button className="menu-toggle" type="button" aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>

          <a className="brand-mark" href="/" aria-label="Shooz home">
            <img src={logoUrl} alt="Qx Shooz" />
          </a>

          <nav className="main-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="/"
                className={item.active ? 'is-active' : ''}
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
      </header>

      <main>
        <section className="hero-slider" aria-label="Featured slideshow">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className={`hero-slide ${index === activeSlide ? 'is-active' : ''} hero-slide--${slide.align}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={index === activeSlide ? 'false' : 'true'}
            >
              <div className="hero-overlay" />
              <div className="hero-content-wrap">
                <div className="hero-content">
                  <p className="hero-eyebrow">{slide.eyebrow}</p>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <a href={slide.href} className="hero-button">
                    <span>Shop Now</span>
                    <IconArrow />
                  </a>
                </div>
              </div>
            </article>
          ))}

          <div className="hero-dots" aria-label="Slide controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeSlide ? 'is-active' : ''}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <a href="/" className="compare-tab">
            <span>Compare</span>
            <b>0</b>
          </a>
        </section>

        <section className="collection-grid" aria-label="Collections">
          <div className="collection-grid-inner">
            {collectionBanners.map((banner) => (
              <article key={banner.title} className="collection-banner">
                <img src={banner.image} alt={banner.title} />
                <a href={banner.href} className="collection-banner-overlay" aria-label={banner.title} />
                <div className="collection-banner-copy">
                  <p>{banner.label}</p>
                  <h2>{banner.title}</h2>
                  <a href={banner.href}>Shop Now</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-tabs-section" aria-label="Sneakers and kicks">
          <div className="product-tabs-inner">
            <div className="product-tabs-header">
              <p>The latest trends in athletic footwear</p>
              <h2>Sneakers &amp; Kicks</h2>
            </div>

            <div className="product-tab-nav" role="tablist" aria-label="Product tabs">
              {productTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  className={activeProductTab === tab.label ? 'is-active' : ''}
                  onClick={() => setActiveProductTab(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="product-card-grid">
              {productTabs
                .find((tab) => tab.label === activeProductTab)
                ?.products.map((product) => (
                  <article className="shop-product-card" key={`${activeProductTab}-${product.name}`}>
                    <a href={product.href} className="shop-product-media">
                      <img src={product.image} alt={product.name} className="primary-image" />
                      <img src={product.hoverImage} alt="" aria-hidden="true" className="secondary-image" />
                      {product.sale ? <span className="sale-badge">{product.sale}</span> : null}
                      {product.countdown ? (
                        <div className="countdown-strip">
                          {product.countdown.map((item) => {
                            const [value, label] = item.split(' ')
                            return (
                              <span key={item}>
                                <b>{value}</b>
                                <small>{label}</small>
                              </span>
                            )
                          })}
                        </div>
                      ) : null}
                    </a>

                    {product.dots ? (
                      <div className="product-dots" aria-hidden="true">
                        {Array.from({ length: product.dots }).map((_, index) => (
                          <span
                            key={`${product.name}-dot-${index}`}
                            className={index === product.activeDot ? 'is-active' : ''}
                          />
                        ))}
                      </div>
                    ) : null}

                    <div className="shop-product-copy">
                      <p className="price-line">
                        <span>{product.price}</span>
                        {product.comparePrice ? <s>{product.comparePrice}</s> : null}
                      </p>
                      <a href={product.href} className="product-name">
                        {product.name}
                      </a>
                      <p className="product-vendor">{product.vendor}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <section
          className="comfort-banner-section"
          aria-label="Comfort meets fashion"
          style={{ backgroundImage: `url(${comfortBanner.image})` }}
        >
          <div className="comfort-banner-inner">
            <div className="comfort-banner-copy">
              <p>{comfortBanner.eyebrow}</p>
              <h2>
                Discover shoes that look great
                <br />
                and feel even better
              </h2>
              <span>
                {comfortBanner.description}
              </span>
              <a href={comfortBanner.href} className="comfort-banner-button">
                <span>Shop Now</span>
                <IconArrow />
              </a>
            </div>
          </div>
          <a href="/" className="compare-tab compare-tab--banner">
            <span>Compare</span>
            <b>0</b>
          </a>
        </section>

        <section className="gradient-ticker-section" aria-label="Promotional offers">
          <div className="gradient-ticker-track">
            {Array.from({ length: 6 }).map((_, groupIndex) => (
              <div className="gradient-ticker-group" key={`ticker-group-${groupIndex}`}>
                {promoTickerItems.map((item) => (
                  <span className="gradient-ticker-item" key={`${groupIndex}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <FeaturedCollections />

        <BannerGrid />

        <BannerGridDouble />

        <ProductListSmall />

        <AdvancedContent />

        <StoreBanner />

        <BrandSection />
      </main>
    </div>
  )
}

export default App
