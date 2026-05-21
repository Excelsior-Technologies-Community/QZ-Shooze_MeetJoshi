import './BannerGridDouble.css'

export default function BannerGridDouble() {
  const banners = [
    {
      id: 1,
      subtop: 'Shop by Brand',
      title: 'Find your favorite brands and styles',
      image: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-4.png?v=1731045517&width=1920',
      href: '/collections',
      delay: 100,
    },
    {
      id: 2,
      subtop: 'Sale and Clearance',
      title: 'Shop our latest deals and discounts',
      image: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-5.png?v=1731045518&width=1920',
      href: '/collections',
      delay: 200,
    },
  ]

  return (
    <section className="banner-grid-double-section">
      <div className="container">
        <div className="section-block">
          {/* Banner Grid - 2 Columns */}
          <div className="banner-grid-double">
            {banners.map((banner) => (
              <figure key={banner.id} className="banner-item-double" style={{ animationDelay: `${banner.delay}ms` }}>
                <img src={banner.image} alt={banner.title} loading="lazy" />
                <a href={banner.href} className="banner-overlay-double" aria-label={banner.title} />
                <figcaption className="banner-caption-double">
                  <div className="banner-content-double">
                    <div className="banner-subtop-double">{banner.subtop}</div>
                    <h4 className="banner-title-double">{banner.title}</h4>
                    <div className="banner-button-wrapper-double">
                      <a href={banner.href} className="btn-underline-double">
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
