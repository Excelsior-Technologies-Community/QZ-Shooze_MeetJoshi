import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCardActions from './ProductCardActions'
import './ProductTabsSection.css'

const TABLE_PRICE_RE = /[\d.]+/

function tabPriceNumber(value) {
  if (typeof value !== 'string') {
    return typeof value === 'number' ? value : 25
  }
  const match = value.match(TABLE_PRICE_RE)
  return match ? parseFloat(match[0]) : 25
}

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

export default function ProductTabsSection() {
  const [activeProductTab, setActiveProductTab] = useState('Featured')
  const [revealedCard, setRevealedCard] = useState(null)
  const revealedRef = useRef(null)
  const activeTab = productTabs.find((tab) => tab.label === activeProductTab) ?? productTabs[0]

  useEffect(() => {
    const handler = (e) => {
      if (e.detail.id !== revealedRef.current) setRevealedCard(null)
    }
    window.addEventListener('card-reveal', handler)
    return () => window.removeEventListener('card-reveal', handler)
  }, [])

  const handleCardEnter = useCallback((href) => {
    revealedRef.current = href
    setRevealedCard(href)
    window.dispatchEvent(new CustomEvent('card-reveal', { detail: { id: href } }))
  }, [])

  return (
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
          {activeTab.products.map((product) => {
            const productPath = `/product/${product.href.split('/').pop()}`
            return (
              <article className={`shop-product-card${revealedCard === product.href ? ' revealed' : ''}`} key={`${activeProductTab}-${product.name}`} data-product-id={product.href} onMouseEnter={() => handleCardEnter(product.href)}>
                <Link to={productPath} className="shop-product-media">
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
                </Link>

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
                <Link to={productPath} className="product-name">
                  {product.name}
                </Link>
                <p className="product-vendor">{product.vendor}</p>
                <ProductCardActions
                  product={{
                    id: product.href,
                    name: product.name,
                    price: tabPriceNumber(product.price),
                    image: product.image,
                    url: `/product/${product.href.split('/').pop()}`,
                    in_stock: true,
                  }}
                  productName={product.name}
                  productLink={productPath}
                />
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
