import CollectionCard from './CollectionCard'
import './FeaturedCollections.css'

const collections = [
  {
    id: 1,
    title: 'Athletic Footwear',
    href: '/shops',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-5.png?v=1731658002&width=800',
    count: 8,
  },
  {
    id: 2,
    title: 'Luxury Leather Shoes',
    href: '/shops',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-6.png?v=1731658012&width=800',
    count: 8,
  },
  {
    id: 3,
    title: 'Sustainable Footwear',
    href: '/shops',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-1.png?v=1731657959&width=800',
    count: 8,
  },
  {
    id: 4,
    title: 'Sandals & Slides',
    href: '/shops',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-2.png?v=1731657969&width=800',
    count: 8,
  },
]

export default function FeaturedCollections() {
  return (
    <section className="featured-collections-section">
      <div className="featured-collections__container">
        <div className="featured-collections__block">
          <header className="featured-collections__header">
            <p className="featured-collections__eyebrow">Stylish and comfortable for every season</p>
            <h2 className="featured-collections__title">
              <span>Boots & Booties</span>
            </h2>
            <p className="featured-collections__description">
              Check out our collection of the top New Products that encourage conversion.
            </p>
          </header>

          <div className="collectionlist-wrapper">
            <div className="collectionlist-grid">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  image={collection.image}
                  title={collection.title}
                  href={collection.href}
                  count={collection.count}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
