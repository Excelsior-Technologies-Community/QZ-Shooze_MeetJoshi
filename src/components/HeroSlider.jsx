import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HeroSlider.css'

const slides = [
  {
    eyebrow: 'Step into Style',
    title: 'Discover the latest trends in footwear',
    description:
      'From classic sneakers to trendy boots, our collection has something for everyone.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-1.png?v=1731045553&width=1728',
    href: '/shops',
    align: 'right',
  },
  {
    eyebrow: 'Elevate Your Look',
    title: 'Find the perfect pair of shoes to complete.',
    description:
      'Explore our wide range of styles, colors, and materials to find the perfect shoes for any occasion.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-2.png?v=1731045552&width=1728',
    href: '/shops',
    align: 'right',
  },
  {
    eyebrow: 'Comfort Meets Fashion',
    title: 'Discover shoes that look great and feel even better.',
    description:
      'Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/banner-3.png?v=1731045552&width=1728',
    href: '/shops',
    align: 'left',
  },
]

function IconArrow() {
  return (
    <svg viewBox="0 0 10 8" aria-hidden="true">
      <path d="M9 4.5H0v-1h9Z" />
      <path d="m6 1.5.7-.7 3 3-.7.7Z" />
      <path d="m6 6.5.7.7 3-3-.7-.7Z" />
    </svg>
  )
}

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="hero-slider" aria-label="Featured slideshow">
      {slides.map((slide, index) => (
        <article
          key={slide.title}
          className={`hero-slide ${index === activeSlide ? 'is-active' : ''} hero-slide--${slide.align}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={index === activeSlide ? 'false' : 'true'}
        >
          <div className="hero-overlay" />
          <div className="hero-content-wrap">
            <div className="hero-content">
              <p className="hero-eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <Link to={slide.href} className="hero-button">
                <span>Shop Now</span>
                <IconArrow />
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div className="hero-dots" aria-label="Slide controls">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === activeSlide ? 'is-active' : ''}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

      <Link to="/shops" className="compare-tab">
        <span>Compare</span>
        <b>0</b>
      </Link>
    </section>
  )
}
