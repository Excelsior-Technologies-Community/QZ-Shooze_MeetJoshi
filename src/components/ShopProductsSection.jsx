import { useState } from 'react'
import './ShopProductsSection.css'
import ProductCard from './ProductCard'
import { productsData } from '../data/products'

const filters = [
  {
    title: 'Collection',
    items: [
      'Athletic Footwear (8)',
      'Boots for Every Occasion (8)',
      'Luxury Leather Shoes (8)',
      'Sandals & Slides (8)',
      "Sneakerhead's Haven (10)",
    ],
  },
  {
    title: 'Availability',
    items: ['In stock (15)', 'Out of stock (10)'],
  },
  {
    title: 'Price',
    isPriceRange: true,
  },
  {
    title: 'Brand',
    items: [
      'AirWalk (1)',
      'BoldWalks (1)',
      'ComfortCreek (1)',
      'CozySteps (1)',
      'EcoStride (1)',
      'GlamStep (1)',
      'LuxeFeet (1)',
      'ProSteps (1)',
      'RetroSole (1)',
      'SimplyShoes (1)',
      'SportyFeet (1)',
      'SprintMax (1)',
    ],
  },
  {
    title: 'Category',
    items: [
      'Athletic Shoes (3)',
      'Boots (2)',
      'Dress Shoes (2)',
      'Outdoor Shoes (2)',
      'Sandals (2)',
      'Sneakers (6)',
      'Work Shoes (1)',
    ],
  },
  {
    title: 'Color',
    isColorGroup: true,
    items: ['#111111', '#1f5eb8', '#733447', '#b0754d', '#74411f', '#2f3d43', '#e41fd6', '#8f5c4a', '#dcdcdc', '#f2dfd8', '#f3ac19', '#4b1f37'],
  },
  {
    title: 'Material',
    items: ['Material 1 (1)', 'Material 2 (1)', 'Material 3 (1)', 'Material 4 (1)'],
  },
  {
    title: 'More filters',
    items: ['Block Heel (1)', 'Breathable (1)', 'Canvas (1)', 'Casual (3)', 'Chelsea (1)', 'Chunky (1)', 'Classic (2)', 'Comfort (8)', 'Cushioned (1)', 'Durable (1)', 'Eco-Friendly (1)'],
    showMore: true,
  },
  {
    title: 'Size',
    items: ['S', 'M', 'L'],
    isButtonGroup: true,
  },
  {
    title: 'Product type',
    items: ['Boots (2)', 'Heels (1)', 'Hiking Boots (1)', 'Loafers (1)', 'Moccasins (1)', 'Pumps (2)', 'Running Shoes (2)', 'Sandals (2)', 'Slip-Ons (1)', 'Slippers (1)', 'Sneakers (3)', 'Work Shoes (1)'],
  },
]

const products = [
  {
    title: 'Breathable Mesh Slip-Ons',
    price: '$25.00',
    brand: 'AirWalk',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-1_831d6162-6f44-4896-ac4c-88eb8a35a6a9.jpg?crop=center&height=1&v=1731310932&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_be1e3b54-5764-4f9d-b77d-f23718b8bd6f.jpg?crop=center&height=1&v=1731310946&width=1',
  },
  {
    title: 'Chunky Platform Sandals',
    price: '$25.00',
    brand: 'BoldWalks',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-2_f21b4635-7aa2-414f-b44c-6ce8171394ed.jpg?crop=center&height=1&v=1731310979&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-22.jpg?crop=center&height=1&v=1731310991&width=1',
    badge: '-21%',
  },
  {
    title: 'Classic Leather Sneakers',
    price: '$21.00',
    brand: 'UrbanStep',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-3_be4a38ab-621f-46d5-a126-3488687e10f6.jpg?crop=center&height=1&v=1731311211&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-26_a72ab182-4323-4754-aa41-d64401571e17.jpg?crop=center&height=1&v=1731311225&width=1',
  },
  {
    title: 'Classic White Tennis Sneakers',
    price: '$25.00',
    brand: 'SportyFeet',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-4_a9f5532a-47cd-4f32-8958-57ee765f0a27.jpg?crop=center&height=1&v=1731311278&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-19_323f61e6-cfd6-4407-823a-273f154d188c.jpg?crop=center&height=1&v=1731311295&width=1',
  },
  {
    title: 'Cushioned Trail Running Shoes',
    price: '$15.00',
    brand: 'TrailGear',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-5_d3ebfc44-e7bd-4fa9-8459-4fc99b71cacf.jpg?crop=center&height=1&v=1731311341&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_31b99edb-0192-4e99-a026-cbd70e3a5624.jpg?crop=center&height=1&v=1731311357&width=1',
  },
  {
    title: 'Elegant Block Heel Pumps',
    price: '$15.00',
    brand: 'LuxeFeet',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-6_dea7fe47-b8a8-460f-9795-9490b1d9144e.jpg?crop=center&height=1&v=1731311466&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-23_fdf5f73d-c3b8-465f-b59d-a8e6afc8e7b9.jpg?crop=center&height=1&v=1731311481&width=1',
  },
  {
    title: 'High-Top Canvas Sneakers',
    price: '$25.00',
    brand: 'TrendyFoot',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-7_bf9fee80-650d-4775-a219-0eaccf66d47b.jpg?crop=center&height=1&v=1731311538&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-19_49ae4265-2610-48a8-b934-1a24b6136832.jpg?crop=center&height=1&v=1731311550&width=1',
  },
  {
    title: 'Lightweight Running Shoes',
    price: '$0.00',
    brand: 'SprintMax',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-8_c70f2fa3-a720-4f73-a2b0-0e0e01967d19.jpg?crop=center&height=1&v=1731311653&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-21_3ab22edc-32aa-4831-beb5-7ff416b17834.jpg?crop=center&height=1&v=1731311666&width=1',
    soldOut: true,
  },
  {
    title: 'Minimalist Sandals With Ankle Strap',
    price: '$35.00',
    brand: 'SimplyShoes',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-9_c7525ff3-7b3d-4320-8026-3f91a1fbe0d7.jpg?crop=center&height=1&v=1731313680&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_9c7423b8-b3b6-4a54-98a1-d53f5ccd8ca0.jpg?crop=center&height=1&v=1731313696&width=1',
  },
  {
    title: 'Premium Leather Chelsea Boots',
    price: '$25.00',
    brand: 'LuxeFeet',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-11_a12147c9-4d7c-49e7-976a-690fea2264cd.jpg?crop=center&height=1&v=1731314667&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-18_b63bf456-53dd-4c96-a994-753c3915d93c.jpg?crop=center&height=1&v=1731314688&width=1',
  },
  {
    title: 'Slip-Resistant Work Shoes',
    price: '$20.00',
    brand: 'ProSteps',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-10_aa707d79-f5b1-4b80-8308-7849352cb1d6.jpg?crop=center&height=1&v=1731314834&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-22_8479de23-bf7c-4771-84c2-90291de8bdfa.jpg?crop=center&height=1&v=1731314850&width=1',
  },
  {
    title: 'Soft Leather Moccasins',
    price: '$25.00',
    brand: 'ComfortCreek',
    image: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-12_560514e6-9f15-4d62-aa87-e2863080cc21.jpg?crop=center&height=1&v=1731314902&width=1',
    hoverImage: 'https://qx-shooz.myshopify.com/cdn/shop/files/product-24_8fe577f2-dcbd-47da-8b42-d1311be6070e.jpg?crop=center&height=1&v=1731314917&width=1',
  },
]

export default function ShopProductsSection() {
  const [sortBy, setSortBy] = useState('manual')

  const getSortedProducts = () => {
    const sorted = [...productsData]
    
    switch (sortBy) {
      case 'best-selling':
        return sorted.sort((a, b) => b.id - a.id)
      case 'title-ascending':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'title-descending':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-ascending':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-descending':
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }

  const sortedProducts = getSortedProducts()

  return (
    <section className="shop-products-section">
      <div className="container">
        <div className="shop-products-layout">
          <aside className="shop-sidebar">
            <div className="sidebar-header">
              <h2>Filter</h2>
            </div>

            {filters.map((filter, index) => (
              <div key={index} className="sidebar-block">
                <h3>{filter.title}</h3>
                <div className="sidebar-options">
                  {filter.isPriceRange ? (
                    <div className="price-filter">
                      <div className="price-slider" aria-hidden="true">
                        <span className="price-slider-track"></span>
                        <span className="price-slider-thumb price-slider-thumb-min"></span>
                        <span className="price-slider-thumb price-slider-thumb-max"></span>
                      </div>
                      <div className="price-inputs">
                        <label>
                          <span>$</span>
                          <input type="number" placeholder="0" min="0" max="25" aria-label="Minimum price" />
                        </label>
                        <label>
                          <span>$</span>
                          <input type="number" placeholder="25.00" min="0" max="25" aria-label="Maximum price" />
                        </label>
                      </div>
                    </div>
                  ) : filter.isColorGroup ? (
                    <div className="color-options">
                      {filter.items.map((item) => (
                        <button type="button" key={item} className="color-swatch" style={{ backgroundColor: item }} aria-label={`Color ${item}`} />
                      ))}
                    </div>
                  ) : filter.isButtonGroup ? (
                    filter.items.map((item) => (
                      <button type="button" key={item} className="filter-button">
                        {item}
                      </button>
                    ))
                  ) : (
                    filter.items.map((item) => (
                      <label key={item} className="filter-option">
                        <input type="checkbox" />
                        <span>{item}</span>
                      </label>
                    ))
                  )}
                  {filter.showMore && <button type="button" className="show-more-button">+ Show more</button>}
                </div>
              </div>
            ))}
          </aside>

          <div className="shop-results">
            <div className="results-toolbar">
              <div className="toolbar-left">
                <button type="button" className="view-toggle" aria-label="Two columns">
                  <span></span><span></span>
                </button>
                <button type="button" className="view-toggle active" aria-label="Three columns">
                  <span></span><span></span><span></span>
                </button>
                <button type="button" className="view-toggle" aria-label="Four columns">
                  <span></span><span></span><span></span><span></span>
                </button>
              </div>
              <div className="toolbar-right">
                <label htmlFor="shop-sort">Sort By:</label>
                <select 
                  id="shop-sort" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="manual">Featured</option>
                  <option value="best-selling">Best selling</option>
                  <option value="title-ascending">Alphabetically, A-Z</option>
                  <option value="title-descending">Alphabetically, Z-A</option>
                  <option value="price-ascending">Price, low to high</option>
                  <option value="price-descending">Price, high to low</option>
                </select>
                <span className="product-count">{sortedProducts.length} Products</span>
              </div>
            </div>

            <div className="product-grid">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="pagination-footer">
              <button type="button" className="pagination-button active">1</button>
              <button type="button" className="pagination-button">2</button>
              <button type="button" className="pagination-button">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
