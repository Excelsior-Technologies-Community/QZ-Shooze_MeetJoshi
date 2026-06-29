import { Link } from 'react-router-dom'
import './BlogNewsletterFooter.css'

const blogItems = [
  { img: 'blog-1.png', title: 'Eco-Friendly Footwear: Sustainable Style', date: 'Oct 28 2024' },
  { img: 'blog-6.png', title: 'The Ultimate Guide to Sneaker Care', date: 'Oct 17 2024' },
  { img: 'blog-5.png', title: 'How to Style Your Favorite Sneakers', date: 'Oct 17 2024' },
]

function BlogSection() {
  return (
    <section className="bnf-blog-section">
      <div className="bnf-container">
        <div className="bnf-header">
          <div className="bnf-subtop">From The Blog</div>
          <h3 className="bnf-title">Recently Our Posts</h3>
          <p className="bnf-desc">Sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="bnf-grid">
          <article className="bnf-first">
            <Link to="/blog" className="bnf-first-image">
              <img src="https://qx-shooz.myshopify.com/cdn/shop/articles/blog-2.png?v=1731500928" alt="The Future of Footwear" />
              <div className="bnf-mask" />
            </Link>
            <div className="bnf-first-content">
              <time>Oct 28 2024</time>
              <h4><Link to="/blog">The Future of Footwear: A Look Ahead</Link></h4>
            </div>
          </article>

          <div className="bnf-list">
            {blogItems.map((b) => (
              <article key={b.title} className="bnf-list-item">
                <img src={`https://qx-shooz.myshopify.com/cdn/shop/articles/${b.img}`} alt={b.title} />
                <div className="bnf-list-content">
                  <time>{b.date}</time>
                  <h5><Link to="/blog">{b.title}</Link></h5>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="bnf-newsletter">
      <div className="bnf-container bnf-newsletter-inner">
        <div className="bnf-news-text">
          <h3>Subscribe to our news<br />articles</h3>
        </div>
        <form className="bnf-news-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email" aria-label="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="bnf-footer">
      <div className="bnf-container bnf-footer-inner">
        <div className="bnf-columns">
          <div>
            <h4>Information</h4>
            <ul>
              <li><Link to="/shops">About Us</Link></li>
              <li><Link to="/shops">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/shops">My Account</Link></li>
              <li><Link to="/shops">My Cart</Link></li>
            </ul>
          </div>
          <div className="bnf-footer-center">
            <img src="https://qx-shooz.myshopify.com/cdn/shop/files/logo.png?v=1731409697" alt="Shooz" />
            <p>T: + (08) 9055 0269</p>
            <p>E: example@example.com</p>
          </div>
          <div>
            <h4>Categories</h4>
            <ul>
              <li><Link to="/shops">Athletic Footwear</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link to="/blog">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="bnf-copyright">Copyright © 2024 Shooz. All rights reserved</div>
      </div>
    </footer>
  )
}

export default function BlogNewsletterFooter() {
  return (
    <div className="bnf-root">
      <BlogSection />
      <NewsletterSection />
      <FooterSection />
    </div>
  )
}
