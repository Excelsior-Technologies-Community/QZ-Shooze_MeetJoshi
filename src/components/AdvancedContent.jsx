import './AdvancedContent.css'

export default function AdvancedContent() {
  return (
    <section className="advanced-content-section">
      <div className="container">
        <div className="advanced-content-grid">
          <div className="advanced-content-copy">
            <span className="subtop">Our most popular styles</span>
            <h2>Save big on shoes from last season</h2>
            <p>
              Find polished sneakers, boots, sandals, and everyday pairs with the comfort details
              that make repeat wear easy. Each style is selected for clean lines, dependable fit,
              and an easy path from weekday plans to weekend movement.
            </p>
            <p>
              Limited seasonal pricing keeps the edit sharp, so the right pair feels as good at
              checkout as it does on the first step out.
            </p>
            <a href="/collections" className="btn-theme-advanced">
              Shop Now
              <svg className="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M9 4.5H0v-1h9Z" fill="currentColor" />
                <path d="m6 1.5.7-.7 3 3-.7.7Z" fill="currentColor" />
                <path d="m6 6.5.7.7 3-3-.7-.7Z" fill="currentColor" />
              </svg>
            </a>
          </div>

          <div className="advanced-content-media">
            <div className="advanced-content-media-inner">
              <div className="media-large">
                <img
                  src="https://qx-shooz.myshopify.com/cdn/shop/files/video-pic.png?v=1731407733&width=1920"
                  alt="Shoes on blue background"
                  loading="lazy"
                />
              </div>
              <div className="media-small">
                <img
                  src="https://qx-shooz.myshopify.com/cdn/shop/files/video-pic.png?v=1731407733&width=1920"
                  alt="Red shoes"
                  loading="lazy"
                />
                <button className="video-play-button" type="button" aria-label="Play video">
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
