import { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const [showCart, setShowCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const discount = product.discount_percent 
    ? product.discount_percent
    : (product.compare_at_price 
        ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
        : null)

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      <div className="product-card-image">
        {product.sale && discount && <span className="badge">-{discount}%</span>}
        {!product.in_stock && <span className="sold-out">Sold out</span>}
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy" 
          className="product-image-main"
        />
        {product.second_image && (
          <img 
            src={product.second_image} 
            alt={product.name} 
            loading="lazy" 
            className="product-image-hover"
          />
        )}
      </div>
      <div className="product-card-copy">
        <div className="product-price">
          {product.price === 0 ? 'Price on request' : `$${product.price.toFixed(2)}`}
          {product.compare_at_price && (
            <span className="compare-price">${product.compare_at_price.toFixed(2)}</span>
          )}
        </div>
        <h4>{product.name}</h4>
        <p>{product.brand}</p>
        
        <div className={`cart-action ${showCart ? 'show' : ''} ${addedToCart ? 'added' : ''}`}>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.in_stock || addedToCart}
          >
            {addedToCart ? '✓ Added to Cart!' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
