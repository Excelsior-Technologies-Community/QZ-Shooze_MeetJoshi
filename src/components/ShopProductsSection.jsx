import { useState, useEffect, useMemo } from 'react'
import './ShopProductsSection.css'
import ProductCard from './ProductCard'
import { productsData } from '../data/products'

function countBy(arr, key) {
  const map = {}
  arr.forEach((p) => {
    const val = typeof key === 'function' ? key(p) : p[key]
    if (Array.isArray(val)) {
      val.forEach((v) => { map[v] = (map[v] || 0) + 1 })
    } else if (val !== undefined && val !== null) {
      map[val] = (map[val] || 0) + 1
    }
  })
  return map
}

export default function ShopProductsSection({ initialFilter }) {
  const [sortBy, setSortBy] = useState('manual')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedAvailability, setSelectedAvailability] = useState([])
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [showMoreTags, setShowMoreTags] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const itemsPerPage = 9

  useEffect(() => {
    if (initialFilter?.type === 'product_type') {
      setSelectedTypes([initialFilter.value])
    } else if (initialFilter?.type === 'brand') {
      setSelectedBrands([initialFilter.value])
    } else if (initialFilter?.type === 'tag') {
      setSelectedTags([initialFilter.value])
    }
    setCurrentPage(1)
  }, [initialFilter])

  const brandCounts = useMemo(() => countBy(productsData, 'brand'), [])
  const typeCounts = useMemo(() => countBy(productsData, 'product_type'), [])
  const tagCounts = useMemo(() => countBy(productsData, 'tags'), [])
  const allTags = useMemo(() => Object.entries(tagCounts).sort((a, b) => b[1] - a[1]), [tagCounts])
  const priceRange = useMemo(() => {
    const prices = productsData.filter((p) => p.price > 0).map((p) => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [])

  const toggleFilter = (arr, setArr, value) => {
    setArr((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value])
    setCurrentPage(1)
  }

  const filteredProducts = useMemo(() => {
    let result = [...productsData]

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.product_type))
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) => selectedTags.some((t) => p.tags?.includes(t)))
    }
    if (selectedAvailability.length > 0) {
      result = result.filter((p) => {
        if (selectedAvailability.includes('In stock')) return p.in_stock
        if (selectedAvailability.includes('Out of stock')) return !p.in_stock
        return true
      })
    }
    if (priceMin !== '') {
      result = result.filter((p) => p.price >= Number(priceMin))
    }
    if (priceMax !== '') {
      result = result.filter((p) => p.price <= Number(priceMax))
    }

    return result
  }, [selectedBrands, selectedTypes, selectedTags, selectedAvailability, priceMin, priceMax])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'best-selling': return sorted.sort((a, b) => b.id - a.id)
      case 'title-ascending': return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'title-descending': return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-ascending': return sorted.sort((a, b) => a.price - b.price)
      case 'price-descending': return sorted.sort((a, b) => b.price - a.price)
      default: return sorted
    }
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const hasActiveFilters = selectedBrands.length > 0 || selectedTypes.length > 0 ||
    selectedTags.length > 0 || selectedAvailability.length > 0 ||
    priceMin !== '' || priceMax !== ''

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedTypes([])
    setSelectedTags([])
    setSelectedAvailability([])
    setPriceMin('')
    setPriceMax('')
    setCurrentPage(1)
  }

  const removeFilter = (type, value) => {
    if (type === 'brand') setSelectedBrands((p) => p.filter((v) => v !== value))
    else if (type === 'type') setSelectedTypes((p) => p.filter((v) => v !== value))
    else if (type === 'tag') setSelectedTags((p) => p.filter((v) => v !== value))
    else if (type === 'availability') setSelectedAvailability((p) => p.filter((v) => v !== value))
    else if (type === 'priceMin') setPriceMin('')
    else if (type === 'priceMax') setPriceMax('')
    setCurrentPage(1)
  }

  const displayedTags = showMoreTags ? allTags : allTags.slice(0, 8)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <section className="shop-products-section">
      <div className="container">
        <div className="shop-products-layout">

          <button type="button" className="mobile-filter-toggle" onClick={() => setMobileFilterOpen(true)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
            Filter
          </button>

          <aside className={`shop-sidebar ${mobileFilterOpen ? 'is-open' : ''}`}>
            <div className="sidebar-header">
              <h2>Filter</h2>
              {mobileFilterOpen && (
                <button type="button" className="sidebar-close" onClick={() => setMobileFilterOpen(false)} aria-label="Close filter">
                  <svg viewBox="0 0 14 14" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 13L1 1M13 1L1 13"/></svg>
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <div className="sidebar-active-filters">
                <div className="active-filter-tags">
                  {selectedBrands.map((v) => (
                    <span key={`b-${v}`} className="active-tag">{v}<button onClick={() => removeFilter('brand', v)}>&times;</button></span>
                  ))}
                  {selectedTypes.map((v) => (
                    <span key={`t-${v}`} className="active-tag">{v}<button onClick={() => removeFilter('type', v)}>&times;</button></span>
                  ))}
                  {selectedTags.map((v) => (
                    <span key={`tg-${v}`} className="active-tag">{v}<button onClick={() => removeFilter('tag', v)}>&times;</button></span>
                  ))}
                  {selectedAvailability.map((v) => (
                    <span key={`a-${v}`} className="active-tag">{v}<button onClick={() => removeFilter('availability', v)}>&times;</button></span>
                  ))}
                  {priceMin !== '' && (
                    <span key="pmin" className="active-tag">Min ${priceMin}<button onClick={() => removeFilter('priceMin')}>&times;</button></span>
                  )}
                  {priceMax !== '' && (
                    <span key="pmax" className="active-tag">Max ${priceMax}<button onClick={() => removeFilter('priceMax')}>&times;</button></span>
                  )}
                </div>
                <button type="button" className="clear-all-btn" onClick={clearAllFilters}>Clear all</button>
              </div>
            )}

            {/* Availability */}
            <div className="sidebar-block">
              <h3>Availability</h3>
              <div className="sidebar-options">
                {['In stock', 'Out of stock'].map((label) => (
                  <label key={label} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes(label)}
                      onChange={() => toggleFilter(selectedAvailability, setSelectedAvailability, label)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="sidebar-block">
              <h3>Price</h3>
              <div className="sidebar-options">
                <div className="price-filter">
                  <div className="price-slider" aria-hidden="true">
                    <span className="price-slider-track"></span>
                    <span className="price-slider-thumb price-slider-thumb-min"></span>
                    <span className="price-slider-thumb price-slider-thumb-max"></span>
                  </div>
                  <div className="price-inputs">
                    <label>
                      <span>$</span>
                      <input
                        type="number"
                        placeholder={String(priceRange.min)}
                        min="0"
                        max={priceRange.max}
                        value={priceMin}
                        onChange={(e) => { setPriceMin(e.target.value); setCurrentPage(1) }}
                        aria-label="Minimum price"
                      />
                    </label>
                    <label>
                      <span>$</span>
                      <input
                        type="number"
                        placeholder={String(priceRange.max)}
                        min="0"
                        max={priceRange.max}
                        value={priceMax}
                        onChange={(e) => { setPriceMax(e.target.value); setCurrentPage(1) }}
                        aria-label="Maximum price"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="sidebar-block">
              <h3>Brand</h3>
              <div className="sidebar-options">
                {Object.entries(brandCounts).sort((a, b) => a[0].localeCompare(b[0])).map(([brand, count]) => (
                  <label key={brand} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                    />
                    <span>{brand} ({count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product type */}
            <div className="sidebar-block">
              <h3>Product type</h3>
              <div className="sidebar-options">
                {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                  <label key={type} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                    />
                    <span>{type} ({count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="sidebar-block">
              <h3>Tags</h3>
              <div className="sidebar-options">
                {displayedTags.map(([tag, count]) => (
                  <label key={tag} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleFilter(selectedTags, setSelectedTags, tag)}
                    />
                    <span>{tag} ({count})</span>
                  </label>
                ))}
                {allTags.length > 8 && (
                  <button type="button" className="show-more-button" onClick={() => setShowMoreTags((s) => !s)}>
                    {showMoreTags ? '− Show less' : '+ Show more'}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {mobileFilterOpen && <div className="sidebar-backdrop" onClick={() => setMobileFilterOpen(false)} />}

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
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
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
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-results">
                  <p>No products found matching your filters.</p>
                  <button type="button" className="clear-all-btn" onClick={clearAllFilters}>Clear all filters</button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-footer">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-button${page === currentPage ? ' active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    type="button"
                    className="pagination-button"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
