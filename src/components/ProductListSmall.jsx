import { Link } from 'react-router-dom'
import ProductCardActions from './ProductCardActions'
import { productsData } from '../data/products'
import './ProductListSmall.css'

const listProductIds = [4, 17, 3]
const products = listProductIds.map((id) => {
  const source = productsData.find((p) => p.id === id) ?? {}
  return {
    id: source.id ?? id,
    name: source.name ?? 'Product',
    price: source.price ?? 25,
    image: source.image,
    url: source.url,
    in_stock: source.in_stock ?? true,
    href: source.url,
  }
})

export default function ProductListSmall() {
  const formatPrice = (price) => (price === 0 ? 'Price on request' : `$${price.toFixed(2)}`)

  return (
    <section className="product-list-small-section">
      <div className="container">
        <div className="section-block">
          <div className="section-header text-center">
            <div className="subtop text-top mb-2">Season&apos;s End Sale</div>
            <h3 className="section-title-1 mb-2">
              <span>Huge discounts on last season&apos;s styles</span>
            </h3>
            <div className="des-header txt-body-70 mb-5">
              Himenaeos nascetur tristique consequat mus ad. Accumsan fringilla in laoreet id bibendum et.
            </div>
          </div>

          <div className="product-list-columns">
            {Array.from({ length: 3 }).map((_, columnIndex) => (
              <div key={columnIndex} className="product-list-column">
                {products.map((product, productIndex) => {
                  const productPath = `/product/${product.url?.split('/').pop() ?? product.href?.split('/').pop()}`

                  return (
                    <article
                      key={`${columnIndex}-${product.id}`}
                      className="product-list-item"
                      style={{ animationDelay: `${200 + columnIndex * 200 + productIndex * 80}ms` }}
                    >
                      <div className="product-list-link">
                        <Link to={productPath} className="product-list-thumb" aria-label={`View ${product.name}`}>
                          <img src={product.image} alt={product.name} loading="lazy" />
                        </Link>
                        <div className="product-list-copy">
                          <Link to={productPath}>
                          <h4>{product.name}</h4>
                          <div className="product-list-price">{formatPrice(product.price)}</div>
                          </Link>
                          <ProductCardActions product={product} productName={product.name} productLink={productPath} compact />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
