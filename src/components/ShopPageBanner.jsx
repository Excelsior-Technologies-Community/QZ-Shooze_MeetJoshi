import { Link } from 'react-router-dom'
import "./ShopPageBanner.css";

export default function ShopPageBanner() {
  return (
    <section className="collection-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="shop-page-container">
          <p className="breadcrumb">
            <span>Home</span>
            <span className="slash">/</span>
            <span className="active">Products</span>
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="collection-hero">
        <img
          src="https://qx-shooz.myshopify.com/cdn/shop/files/col-2.png?v=1731657939"
          alt="Products Banner"
          className="banner-image"
        />

        <div className="collection-hero-overlay"></div>

        <div className="banner-content">
          <h1>Products</h1>
        </div>
      </div>

      <div className="shop-page-container">
        <ul className="site-head__list list-inline text-center py-4 collection-list border-bottom">
          <li className="site-head__list__list-item list-inline-item">
            <Link to="/shops">
              Athletic Footwear
              <span className="d-inline-block ml-1 txt-body-50">(8)</span>
            </Link>
          </li>

          <li className="site-head__list__list-item list-inline-item">
            <Link to="/shops">
              Boots for Every Occasion
              <span className="d-inline-block ml-1 txt-body-50">(8)</span>
            </Link>
          </li>

          <li className="site-head__list__list-item list-inline-item">
            <Link to="/shops">
              Luxury Leather Shoes
              <span className="d-inline-block ml-1 txt-body-50">(8)</span>
            </Link>
          </li>

          <li className="site-head__list__list-item list-inline-item">
            <Link to="/shops">
              Sandals &amp; Slides
              <span className="d-inline-block ml-1 txt-body-50">(8)</span>
            </Link>
          </li>

          <li className="site-head__list__list-item list-inline-item">
            <Link to="/shops">
              Sneakerhead&apos;s Haven
              <span className="d-inline-block ml-1 txt-body-50">(10)</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
