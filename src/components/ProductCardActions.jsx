import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './ProductCardActions.css'

function Icon({ name }) {
  if (name === 'cart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="20" r="1.6" />
        <circle cx="18" cy="20" r="1.6" />
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H7" />
      </svg>
    )
  }

  if (name === 'eye') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    )
  }

  if (name === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 5.7a5.1 5.1 0 0 0-7.2 0L12 7.3l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.4l8.8-8.5a5.1 5.1 0 0 0 0-7.2Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 3h4v4" />
      <path d="M21 3 14 10" />
      <path d="M7 21H3v-4" />
      <path d="m3 21 7-7" />
      <path d="M14 21h7v-7" />
      <path d="M3 10V3h7" />
    </svg>
  )
}

export default function ProductCardActions({ product, productName, productLink, inStock = true, compact = false }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, openCart } = useCart()
  const { hasItem, toggleItem } = useWishlist()

  const currentProduct = product ?? {
    name: productName,
    url: productLink,
    in_stock: inStock,
  }

  const isWishlisted = product ? hasItem(product.id) : false

  const handleAddToCart = () => {
    if (!inStock || addedToCart) return
    addItem(currentProduct, 1)
    setAddedToCart(true)
    window.setTimeout(() => setAddedToCart(false), 2000)
    openCart()
  }

  const handleToggleWishlist = () => {
    toggleItem(currentProduct)
  }

  return (
    <div className={`product-card-actions${compact ? ' compact' : ''}`}>
      <button
        type="button"
        className="product-card-add"
        onClick={handleAddToCart}
        disabled={!inStock || addedToCart}
        title={inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
      >
        <Icon name="cart" />
        <span>{!inStock ? 'Sold Out' : addedToCart ? 'Added' : 'Add To Cart'}</span>
      </button>

      <div className="product-card-icon-row">
        <Link to={productLink} aria-label={`Quick view ${productName}`} title="Quick view">
          <Icon name="eye" />
        </Link>
        <button type="button" className={isWishlisted ? 'is-wishlisted' : ''} onClick={handleToggleWishlist} aria-label={`Add ${productName} to wishlist`} title={isWishlisted ? 'Go to wishlist' : 'Add to Wishlist'}>
          <Icon name="heart" />
        </button>
        <button type="button" aria-label={`Compare ${productName}`} title="Compare">
          <Icon name="compare" />
        </button>
      </div>
    </div>
  )
}
