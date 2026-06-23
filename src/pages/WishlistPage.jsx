import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import FooterSection from '../components/FooterSection'
import { useWishlist } from '../context/WishlistContext'
import './Wishlist.css'

const getHandle = (item) => item.url?.split('/').pop()

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()

  return (
    <div className="wishlist-page">
      <SiteHeader />
      <main>
        <nav className="wl-breadcrumbs" aria-label="Breadcrumb">
          <div className="wl-container">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Wishlist</span>
          </div>
        </nav>

        <section className="wl-container wl-content">
          <h1 className="wl-heading">Wishlist</h1>

          {items.length === 0 ? (
            <div className="wl-empty">
              <p>Your wishlist is empty.</p>
              <Link to="/shops" className="wl-continue">Continue shopping</Link>
            </div>
          ) : (
            <div className="wl-grid">
              {items.map((item) => (
                <div className="wl-card" key={item.id}>
                  <Link to={`/product/${getHandle(item)}`} className="wl-card-img">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </Link>
                  <div className="wl-card-body">
                    <Link to={`/product/${getHandle(item)}`} className="wl-card-name">{item.name}</Link>
                    <span className="wl-card-price">${item.price.toFixed(2)}</span>
                    <button type="button" className="wl-card-remove" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
