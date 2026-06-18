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
