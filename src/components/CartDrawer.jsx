import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, totalCount, totalPrice, isCartOpen, closeCart, updateQuantity, removeItem } = useCart()

  return (
    <div className={`cart-drawer${isCartOpen ? ' is-open' : ''}`} aria-hidden={!isCartOpen}>
      <div className="cart-drawer__backdrop" onClick={closeCart} />
      <aside className="cart-drawer__panel" role="dialog" aria-label="Shopping cart" aria-modal="true">
        <header className="cart-drawer__header">
          <div>
            <h2>Cart</h2>
            <p>{totalCount} item{totalCount === 1 ? '' : 's'}</p>
          </div>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Close cart drawer">
            ×
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={item.url} onClick={closeCart} className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item__details">
                  <Link to={item.url} onClick={closeCart} className="cart-item__name">
                    {item.name}
                  </Link>
                  <div className="cart-item__price">${item.price.toFixed(2)}</div>
                  <div className="cart-item__quantity">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button type="button" className="cart-item__remove" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="cart-drawer__footer">
          <div className="cart-drawer__summary">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <Link to="/cart" className="cart-drawer__checkout" onClick={closeCart}>
            View Cart
          </Link>
          <Link to="/checkout" className="cart-drawer__checkout cart-drawer__checkout--primary" onClick={closeCart}>
            Checkout
          </Link>
        </footer>
      </aside>
    </div>
  )
}
