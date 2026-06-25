import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './CartDrawer.css'

const FREE_SHIPPING_THRESHOLD = 975

export default function CartDrawer() {
  const { items, totalCount, totalPrice, isCartOpen, closeCart, updateQuantity, removeItem } = useCart()

  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)
  const amountToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)

  return (
    <div className={`cart-drawer${isCartOpen ? ' is-open' : ''}`} aria-hidden={!isCartOpen}>
      <div className="cart-drawer__backdrop" onClick={closeCart} />
      <aside className="cart-drawer__panel" role="dialog" aria-label="Shopping cart" aria-modal="true">
        <header className="cart-drawer__header">
          <div className="cart-drawer__title-row">
            <span className="cart-drawer__title">Cart</span>
            <span className="cart-drawer__count">{totalCount}</span>
          </div>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Close cart drawer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </header>

        {totalCount > 0 && (
          <div className="cart-drawer__shipping">
            <div className="cart-drawer__shipping-text">
              <svg viewBox="0 0 64 64" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M32 54.52L10 41.95v-19.9L32 9.48l22 12.57v19.9L32 54.52z"/>
                <path d="M32 54.52v-19.9l22-12.57M32 34.62L10 22.05"/>
              </svg>
              <span>
                {amountToFree > 0
                  ? `Spend $${amountToFree.toFixed(2)} for Free Shipping`
                  : 'You got free shipping!'}
              </span>
            </div>
            <div className="cart-drawer__progress">
              <div className="cart-drawer__progress-fill" style={{ width: `${shippingProgress}%` }} />
            </div>
          </div>
        )}

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-drawer__item">
                <Link to={item.url} onClick={closeCart} className="cart-drawer__item-img">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-drawer__item-info">
                  <Link to={item.url} onClick={closeCart} className="cart-drawer__item-name">
                    {item.name}
                  </Link>
                  <div className="cart-drawer__item-price">${item.price.toFixed(2)} x {item.quantity}</div>
                  <div className="cart-drawer__item-bottom">
                    <div className="cart-drawer__qty">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <svg viewBox="0 0 22 3" width="12" height="12"><path d="M21.5.5v2H.5v-2z" fill="currentColor" fillRule="evenodd"/></svg>
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <svg viewBox="0 0 22 21" width="12" height="12"><path d="M12 11.5h9.5v-2H12V0h-2v9.5H.5v2H10V21h2v-9.5z" fill="currentColor" fillRule="evenodd"/></svg>
                      </button>
                    </div>
                    <button type="button" className="cart-drawer__remove" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalCount > 0 && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <p className="cart-drawer__tax-note">Taxes and shipping calculated at checkout</p>
            <div className="cart-drawer__btns">
              <button type="button" className="cart-drawer__btn cart-drawer__btn--outline" onClick={closeCart}>
                View Cart
              </button>
              <button type="button" className="cart-drawer__btn cart-drawer__btn--checkout" onClick={closeCart}>
                Check Out
              </button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}
