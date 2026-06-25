import { Link } from 'react-router-dom'
import "./CollectionGrid.css"

const banners = [
  {
    label: 'Trending',
    title: 'Men Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-1.png?v=1731045511&width=1920',
    href: '/shops',
  },
  {
    label: 'Latest',
    title: 'Women Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-3.png?v=1731045510&width=1920',
    href: '/shops',
  },
  {
    label: 'Comfort',
    title: 'Kid Collections',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/grid-three-2.png?v=1731045516&width=1920',
    href: '/shops',
  },
]

export default function CollectionGrid() {
  return (
    <section className="collection-grid" aria-label="Collections">
      <div className="collection-grid-inner">
        {banners.map((banner) => (
          <article key={banner.title} className="collection-banner">
            <img src={banner.image} alt={banner.title} />
            <Link to={banner.href} className="collection-banner-overlay" aria-label={banner.title} />
            <div className="collection-banner-copy">
              <p>{banner.label}</p>
              <h2>{banner.title}</h2>
              <Link to={banner.href}>Shop Now</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
