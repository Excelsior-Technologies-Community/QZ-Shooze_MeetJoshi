import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { productsData } from '../data/products'
import './SearchModal.css'

const getHandle = (product) => product.url?.split('/').pop()

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matched = productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.product_type.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
    )
    setResults(matched.slice(0, 6))
  }, [query])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-modal__overlay" onClick={onClose} />
      <div className="search-modal__content">
        <div className="search-modal__header">
          <label className="search-modal__label">WHAT ARE YOU LOOKING FOR?</label>
          <button type="button" className="search-modal__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 14 14" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 13L1 1M13 1L1 13" />
            </svg>
          </button>
        </div>

        <form className="search-modal__form" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="search"
            className="search-modal__input"
            placeholder="Search Products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="search-modal__submit" aria-label="Search">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.00002 1.6C4.4654 1.6 1.60002 4.46538 1.60002 8C1.60002 11.5346 4.4654 14.4 8.00002 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8.00002 1.6ZM0.400024 8C0.400024 3.80264 3.80266 0.400002 8.00002 0.400002C12.1974 0.400002 15.6 3.80264 15.6 8C15.6 9.88268 14.9155 11.6055 13.7817 12.933L19.4243 18.5757C19.6586 18.8101 19.6586 19.19 19.4243 19.4243C19.19 19.6586 18.8101 19.6586 18.5758 19.4243L12.9332 13.7816C11.6056 14.9154 9.88275 15.6 8.00002 15.6C3.80266 15.6 0.400024 12.1974 0.400024 8Z" />
            </svg>
          </button>
        </form>

        {results.length > 0 && (
          <div className="search-modal__results">
            <p className="search-modal__results-label">PRODUCTS</p>
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${getHandle(product)}`}
                className="search-modal__result"
                onClick={onClose}
              >
                <img src={product.image} alt={product.name} className="search-modal__result-img" loading="lazy" />
                <div className="search-modal__result-info">
                  <span className="search-modal__result-name">{product.name}</span>
                  <span className="search-modal__result-price">
                    {product.compare_at_price && (
                      <s className="search-modal__result-compare">${product.compare_at_price.toFixed(2)}</s>
                    )}
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.trim() && (
          <Link to={`/shops?q=${encodeURIComponent(query)}`} className="search-modal__view-all" onClick={onClose}>
            <span>Search for &ldquo;{query}&rdquo;</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
