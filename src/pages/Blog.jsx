import SiteHeader from '../components/SiteHeader'
import FooterSection from '../components/FooterSection'
import './Blog.css'

const blogPosts = [
  {
    title: 'The Future of Footwear: A Look Ahead',
    date: '10-28-2024',
    author: 'Qodex Web',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-2.png?v=1731500928',
  },
  {
    title: 'Eco-Friendly Footwear: Sustainable Style',
    date: '10-28-2024',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-1.png?v=1731500921',
  },
  {
    title: 'The Ultimate Guide To Sneaker Care',
    date: '10-17-2024',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-6.png?v=1731500962',
  },
  {
    title: 'How To Style Your Favorite Sneakers',
    date: '10-17-2024',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-5.png?v=1731500994',
  },
  {
    title: 'The Evolution Of Footwear: A Brief History',
    date: '10-17-2024',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-4.png?v=1731500987',
  },
  {
    title: 'Finding The Perfect Fit: A Shoe Buying Guide',
    date: '09-26-2024',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/articles/blog-3.png?v=1731500936',
  },
]

function BlogMeta({ date, author }) {
  return (
    <div className="blog-page-meta">
      <time dateTime={date}>{date}</time>
      {author ? <span>{author}</span> : null}
      <span>0 comments</span>
    </div>
  )
}

function Blog() {
  const featured = blogPosts[0]

  return (
    <div className="storefront-shell">
      <SiteHeader />

      <main className="blog-page">
        <section className="blog-featured" aria-label="Featured blog post">
          <button className="blog-arrow blog-arrow-left" type="button" aria-label="Previous post">
            <span aria-hidden="true">&lt;</span>
          </button>

          <div className="blog-featured-copy">
            <p className="blog-eyebrow">Featured post</p> 
            <h1>{featured.title}</h1>
            <BlogMeta date="October 28, 2024" author={featured.author} />
            <p>
              Augue ut lectus arcu bibendum at varius vel. Ipsum nunc aliquet bibendum enim
              facilisis. Quam elementum pulvinar etiam non quam lacus. Non odio euismod lacinia at
              quis risus sed vulputate...
            </p>
            <a className="blog-read-more" href="/blog">
              Read more <span aria-hidden="true">&gt;</span>
            </a>
          </div>

          <div className="blog-featured-image">
            <img src={featured.image} alt={featured.title} />
          </div>

          <button className="blog-arrow blog-arrow-right" type="button" aria-label="Next post">
            <span aria-hidden="true">&gt;</span>
          </button>
        </section>

        <section className="blog-listing" aria-label="Latest blog posts">
          <div className="blog-listing-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.title}>
                <a className="blog-card-image" href="/blog" aria-label={post.title}>
                  <img src={post.image} alt={post.title} />
                </a>

                <div className="blog-card-body">
                  <BlogMeta date={post.date} />
                  <h2>
                    <a href="/blog">{post.title}</a>
                  </h2>
                  <div className="blog-card-rule" />
                  <p>
                    Augue ut lectus arcu bibendum at varius vel. Ipsum nunc aliquet bibendum enim
                    facilisis. Quam elementum pulvinar etiam non quam...
                  </p>
                  <a className="blog-read-more" href="/blog">
                    Read more <span aria-hidden="true">&gt;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}

export default Blog
