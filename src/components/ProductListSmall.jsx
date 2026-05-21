import './ProductListSmall.css'

const products = [
  {
    id: 1,
    name: 'Classic White Tennis Sneakers',
    price: '$25.00',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/product-4_a9f5532a-47cd-4f32-8958-57ee765f0a27.jpg?v=1731311278&width=150',
    href: '/collections/frontpage/products/classic-white-tennis-sneakers',
  },
  {
    id: 2,
    name: 'Waterproof Hiking Boots',
    price: '$25.00',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/product-17.jpg?v=1731315215&width=150',
    href: '/collections/frontpage/products/waterproof-hiking-boots',
  },
  {
    id: 3,
    name: 'Classic Leather Sneakers',
    price: '$21.00',
    image:
      'https://qx-shooz.myshopify.com/cdn/shop/files/product-3_be4a38ab-621f-46d5-a126-3488687e10f6.jpg?v=1731311211&width=150',
    href: '/collections/frontpage/products/classic-leather-sneakers',
  },
]

export default function ProductListSmall() {
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
                {products.map((product, productIndex) => (
                  <article
                    key={`${columnIndex}-${product.id}`}
                    className="product-list-item"
                    style={{ animationDelay: `${200 + columnIndex * 200 + productIndex * 80}ms` }}
                  >
                    <a href={product.href} className="product-list-link">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div className="product-list-copy">
                        <h4>{product.name}</h4>
                        <div className="product-list-price">{product.price}</div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
