import { Link } from 'react-router-dom'
import './ComfortBanner.css'

const banner = {
  eyebrow: 'Comfort Meets Fashion',
  title: 'Discover shoes that look great and feel even better',
  description:
    'Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.',
  image:
    'https://qx-shooz.myshopify.com/cdn/shop/files/wide-banner.png?v=1731045552&width=1940',
  href: '/shops',
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

export default function ComfortBanner() {
  return (
    <section
      className="comfort-banner-section"
      aria-label="Comfort meets fashion"
      style={{ backgroundImage: `url(${banner.image})` }}
    >
      <div className="comfort-banner-inner">
        <div className="comfort-banner-copy">
          <p>{banner.eyebrow}</p>
          <h2>{banner.title}</h2>
          <span>{banner.description}</span>
          <Link to={banner.href} className="comfort-banner-button">
            <span>Shop Now</span>
            <IconArrow />
          </Link>
        </div>
      </div>
      <Link to="/shops" className="compare-tab compare-tab--banner">
        <span>Compare</span>
        <b>0</b>
      </Link>
    </section>
  )
}
