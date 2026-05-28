import React from 'react'
import './BannerGrid.css'

export default function BannerGrid() {
const topBanners = [
    {
      id: 'banner-1',
      subtop: 'Comfort Meets Fashion',
      title: 'Discover shoes\nthat look great',
      link: '/collections',
      imgSrc: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-1.png?v=1731045532&width=1920',
      alt: 'Comfort meets fashion sneakers'
    },
    {
      id: 'banner-2',
      subtop: 'Elevate Your Look',
      title: 'Find the perfect\npair of shoes',
      link: '/collections',
      imgSrc: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-2.png?v=1731045532&width=1920',
      alt: 'Elevated look sneakers'
    },
    {
      id: 'banner-3',
      subtop: 'Step into Style',
      title: 'The latest trends\nin footwear',
      link: '/collections',
      imgSrc: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-3.png?v=1731045526&width=1920',
      alt: 'Latest footwear trends'
    }
  ];

  const bottomBanners = [
    {
      id: 'banner-4',
      subtop: 'Shop by Brand',
      title: 'Find your favorite\nbrands and styles',
      link: '/collections',
      imgSrc: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-4.png?v=1731045517&width=1920',
      alt: 'Shop sneakers by brand'
    },
    {
      id: 'banner-5',
      subtop: 'Sale and Clearance',
      title: 'Shop our latest deals\nand discounts',
      link: '/collections',
      imgSrc: 'https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-5.png?v=1731045518&width=1920',
      alt: 'Sneaker sale and clearance'
    }
  ];

  return (
    <section className="snb-sneakers-section">
      <div className="snb-sneakers-container">
        
        {/* Section Header */}
        <div className="snb-section-header">
          <span className="snb-header-subtop">Fashion Sneakers</span>
          <h2 className="snb-header-title">Timeless styles for everyday wear</h2>
          <p className="snb-header-desc">High-performance footwear for sports and workouts</p>
        </div>

        {/* Top Grid - 3 Columns */}
        <div className="snb-banners-grid snb-grid-3-cols">
          {topBanners.map((banner) => (
            <figure key={banner.id} className="snb-banner-card">
              <div className="snb-image-wrapper">
                <img 
                  src={banner.imgSrc} 
                  alt={banner.alt} 
                  loading="lazy" 
                  className="snb-banner-image"
                />
                <div className="snb-banner-overlay"></div>
              </div>
              
              <figcaption className="snb-banner-content">
                <span className="snb-banner-subtop">{banner.subtop}</span>
                <h3 className="snb-banner-title">
                  {banner.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < banner.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <a href={banner.link} className="snb-shop-now-btn">
                  Shop Now
                </a>
              </figcaption>
              
              {/* Full-card link for usability */}
              <a href={banner.link} className="snb-card-click-overlay" aria-label={`Shop ${banner.subtop}`}></a>
            </figure>
          ))}
        </div>

        {/* Bottom Grid - 2 Columns */}
        <div className="snb-banners-grid snb-grid-2-cols">
          {bottomBanners.map((banner) => (
            <figure key={banner.id} className="snb-banner-card">
              <div className="snb-image-wrapper">
                <img 
                  src={banner.imgSrc} 
                  alt={banner.alt} 
                  loading="lazy" 
                  className="snb-banner-image"
                />
                <div className="snb-banner-overlay"></div>
              </div>
              
              <figcaption className="snb-banner-content">
                <span className="snb-banner-subtop">{banner.subtop}</span>
                <h3 className="snb-banner-title">
                  {banner.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < banner.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <a href={banner.link} className="snb-shop-now-btn">
                  Shop Now
                </a>
              </figcaption>
              
              {/* Full-card link for usability */}
              <a href={banner.link} className="snb-card-click-overlay" aria-label={`Shop ${banner.subtop}`}></a>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
