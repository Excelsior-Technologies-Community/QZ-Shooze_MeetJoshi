import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCardActions from './ProductCardActions'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const [revealed, setRevealed] = useState(false)
  const productHandle = product.url?.split('/').pop()
  const productLink = productHandle ? `/product/${productHandle}` : '/shops'

  useEffect(() => {
    const handler = (e) => {
      if (e.detail.id !== product.id) setRevealed(false)
    }
    window.addEventListener('card-reveal', handler)
    return () => window.removeEventListener('card-reveal', handler)
  }, [product.id])

  const handleMouseEnter = useCallback(() => {
    setRevealed(true)
    window.dispatchEvent(new CustomEvent('card-reveal', { detail: { id: product.id } }))
  }, [product.id])

  const discount = product.discount_percent
    ? product.discount_percent
    : product.compare_at_price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null

  return (
    <article className={`product-card${revealed ? ' revealed' : ''}`} data-product-id={product.id} onMouseEnter={handleMouseEnter}>
      <div className="product-card-image">
        {product.sale && discount && <span className="badge">-{discount}%</span>}
        {!product.in_stock && <span className="sold-out">Sold out</span>}
        <Link to={productLink} className="product-card-link" aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-image-main"
          />
          {product.second_image && (
            <img
              src={product.second_image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="product-image-hover"
            />
          )}
        </Link>
      </div>
      <div className="product-card-copy">
        <div className="product-price">
          {product.price === 0 ? 'Price on request' : `$${product.price.toFixed(2)}`}
          {product.compare_at_price && (
            <span className="compare-price">${product.compare_at_price.toFixed(2)}</span>
          )}
        </div>
        <h4>
          <Link to={productLink} className="product-card-title-link">
            {product.name}
          </Link>
        </h4>
        <p>{product.brand}</p>
        <ProductCardActions
          product={product}
          productName={product.name}
          productLink={productLink}
          inStock={product.in_stock}
        />
      </div>
    </article>
  )
}
