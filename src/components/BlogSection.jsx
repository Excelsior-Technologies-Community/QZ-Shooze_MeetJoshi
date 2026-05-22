import "./BlogSection.css";

const posts = [
  {
    id: 1,
    title: "The Future Of Footwear: A Look Ahead",
    date: "Oct 28 2024",
    comments: "0 comments",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-2.png?v=1731500928",
    large: true,
  },
  {
    id: 2,
    title: "Eco-Friendly Footwear: Sustainable Style",
    date: "Oct 28 2024",
    comments: "0 comments",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-1.png?v=1731500921",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Sneaker Care",
    date: "Oct 17 2024",
    comments: "0 comments",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-6.png?v=1731500962",
  },
  {
    id: 4,
    title: "How to Style Your Favorite Sneakers",
    date: "Oct 17 2024",
    comments: "0 comments",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-5.png?v=1731500994",
  },
];

function BlogSection() {
  return (
    <section className="blog-section">
      <div className="container">
        
        {/* Header */}
        <div className="blog-header">
          <p className="sub-title">FROM THE BLOG</p>

          <h2>Recently Our Posts</h2>

          <p className="desc">
            Sit amet conse ctetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Content */}
        <div className="blog-grid">

          {/* Left */}
          <div className="left-blog">
            <img src={posts[0].image} alt="" />

            <div className="overlay"></div>

            <div className="left-content">
              <div className="meta">
                <span>{posts[0].date}</span>

                <div className="comment">
                  <svg width="16" height="16" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5.5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 8.5H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 13V16L9 13H4C3 13 1 12 1 10V4C1 2 3 1 5 1H13C15 1 17 2 17 4V10C17 12 14.3333 12.8333 13 13Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{posts[0].comments}</span>
                </div>
              </div>

              <h3>{posts[0].title}</h3>
            </div>
          </div>

          {/* Right */}
          <div className="right-blogs">
            {posts.slice(1).map((post) => (
              <div className="small-blog" key={post.id}>
                
                <img src={post.image} alt="" />

                <div className="small-content">
                  <div className="meta dark">
                    <span>{post.date}</span>

                    <div className="comment">
                      <svg width="16" height="16" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5.5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 8.5H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 13V16L9 13H4C3 13 1 12 1 10V4C1 2 3 1 5 1H13C15 1 17 2 17 4V10C17 12 14.3333 12.8333 13 13Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <h4>{post.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default BlogSection;