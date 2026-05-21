import { useState } from 'react'
import CollectionCard from './CollectionCard'
import './FeaturedCollections.css'

const collections = [
  {
    id: 1,
    title: 'Athletic Footwear',
    href: '/collections/athletic-footwear',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-5.png?v=1731658002&width=800',
    count: 8,
  },
  {
    id: 2,
    title: 'Luxury Leather Shoes',
    href: '/collections/luxury-leather-shoes',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-6.png?v=1731658012&width=800',
    count: 8,
  },
  {
    id: 3,
    title: 'Sustainable Footwear',
    href: '/collections/sustainable-footwear',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-1.png?v=1731657959&width=800',
    count: 8,
  },
  {
    id: 4,
    title: 'Sandals & Slides',
    href: '/collections/summer-sandals-slides',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/collections/col-2.png?v=1731657969&width=800',
    count: 8,
  },
]

export default function FeaturedCollections() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesPerView = 4
  const maxSlide = Math.max(0, collections.length - slidesPerView)

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - slidesPerView))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + slidesPerView))
  }

  const visibleCollections = collections.slice(currentSlide, currentSlide + slidesPerView)

  return (
    <section className="featured-collections-section">
      <div className="container">
        <div className="section-block">
          {/* Section Header */}
          <div className="section-header text-center">
            <div className="subtop text-top mb-2">Stylish and comfortable for every season</div>
            <h3 className="section-title-1 mb-2">
              <span>Boots & Booties</span>
            </h3>
            <div className="des-header txt-body-70 mb-5">
              Check out our collection of the top New Products that encourage conversion.
            </div>
          </div>

          {/* Collections Grid */}
          <div className="collectionlist-wrapper pt-0">
            <div className="collectionlist-slider row">
              {visibleCollections.map((collection) => (
                <div key={collection.id} className="col collectionlist-item">
                  <CollectionCard
                    image={collection.image}
                    title={collection.title}
                    href={collection.href}
                    count={collection.count}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            {collections.length > slidesPerView && (
              <div className="carousel-controls">
                <button
                  className="carousel-btn prev"
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  className="carousel-btn next"
                  onClick={handleNext}
                  disabled={currentSlide >= maxSlide}
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
