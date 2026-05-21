import './BannerGrid.css'

export default function BannerGrid() {
  const banners = [
    {
      id: 1,
      subtop: 'Comfort Meets Fashion',
      title: 'Discover shoes that look great',
      image: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-1.png?v=1731045532&width=1920',
      href: '/collections',
      delay: 100,
    },
    {
      id: 2,
      subtop: 'Elevate Your Look',
      title: 'Find the perfect pair of shoes',
      image: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-2.png?v=1731045532&width=1920',
      href: '/collections',
      delay: 200,
    },
    {
      id: 3,
      subtop: 'Step into Style',
      title: 'The latest trends in footwear',
      image: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-3.png?v=1731045526&width=1920',
      href: '/collections',
      delay: 300,
    },
  ]

  return (
    <section className="banner-grid-section">
      <div className="container">
        <div className="section-block">
          {/* Section Header */}
          <div className="section-header text-center">
            <div className="subtop text-top mb-2">Fashion Sneakers</div>
            <h3 className="section-title-1 mb-2">
              <span>Timeless styles for everyday wear</span>
            </h3>
            <div className="des-header txt-body-70 mb-5">
              High-performance footwear for sports and workouts
            </div>
          </div>

          {/* Banner Grid */}
          <div className="banner-grid">
            {banners.map((banner) => (
              <figure key={banner.id} className="banner-item" style={{ animationDelay: `${banner.delay}ms` }}>
                <img src={banner.image} alt={banner.title} loading="lazy" />
                <a href={banner.href} className="banner-overlay" aria-label={banner.title} />
                <figcaption className="banner-caption">
                  <div className="banner-content">
                    <div className="banner-subtop">{banner.subtop}</div>
                    <h4 className="banner-title">{banner.title}</h4>
                    <div className="banner-button-wrapper">
                      <a href={banner.href} className="btn-underline">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
