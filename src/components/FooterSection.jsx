import "./FooterSection.css";

const FooterSection = () => {
  return (
    <>
      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-container">

          {/* Left */}
          <div className="newsletter-content">
            <h2>
              SUBSCRIBE TO OUR NEWS <br />
              ARTICLES
            </h2>

            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />

              <button>SUBSCRIBE</button>
            </div>
          </div>

          {/* Right Image */}
          <div className="newsletter-image">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwO-1oK-jbPu_FDRPvhqROXHwOtOtd7rrxTynP0OnGb2pjhmbq"
              alt=""
            />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-top">

          {/* Column 1 */}
          <div className="footer-col">
            <h4>INFOMATION</h4>

            <ul>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Returns Policy</li>
              <li>Shipping Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4>QUICK LINKS</h4>

            <ul>
              <li>My Account</li>
              <li>My Cart</li>
              <li>Size Chart</li>
              <li>Wishlist</li>
              <li>Gift Card</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col center">
            <img
              className="footer-logo"
              src="https://qx-shooz.myshopify.com/cdn/shop/files/logo.png?v=1731409697"
              alt=""
            />

            <p>T: + (08) 9055 0269</p>
            <p>E: example@example.com</p>

            <p>
              50 Porana Place, West Casuarinas,
              <br />
              Western Australia, Australia.
            </p>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4>CATEGORIES</h4>

            <ul>
              <li>Athletic Footwear</li>
              <li>Boots for Every Occasion</li>
              <li>Luxury Leather Shoes</li>
              <li>Sandals & Slides</li>
              <li>Sneakerhead's Haven</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="footer-col">
            <h4>SUPPORT</h4>

            <ul>
              <li>Contact Us</li>
              <li>Newsletter</li>
              <li>Gift Cards</li>
              <li>Sign In</li>
              <li>My Account</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            Copyright © 2024 <span>Shooz.</span> All rights reserved
          </p>

          <div className="payments">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt=""
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
              alt=""
            />

            <img
              src="https://cdn-icons-png.flaticon.com/512/825/825510.png"
              alt=""
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt=""
            />
          </div>

        </div>

      </footer>
    </>
  );
};

export default FooterSection;