import "./ShopCollectionGrid.css";

const collections = [
  {
    title: "Athletic Footwear",
    image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-5.png?v=1731658002",
    filterType: "tag",
    filterValue: "Running",
  },
  {
    title: "Boots for Every Occasion",
    image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-4.png?v=1731657987",
    filterType: "type",
    filterValue: "Boots",
  },
  {
    title: "Luxury Leather Shoes",
    image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-6.png?v=1731658012",
    filterType: "tag",
    filterValue: "Leather",
  },
  {
    title: "Sandals & Slides",
    image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-2.png?v=1731657969",
    filterType: "type",
    filterValue: "Sandals",
  },
  {
    title: "Sneakerhead's Haven",
    image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-3.png?v=1731657979",
    filterType: "type",
    filterValue: "Sneakers",
  },
];

export default function CollectionGrid({ onFilterClick }) {
  const handleClick = (collection) => {
    if (onFilterClick) {
      onFilterClick({ type: collection.filterType, value: collection.filterValue })
      document.querySelector('.shop-products-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="collection-section">
      <div className="shop-collection-grid">
        {collections.map((item, index) => (
          <button
            type="button"
            className="collection-card"
            key={index}
            onClick={() => handleClick(item)}
          >
            <img src={item.image} alt={item.title} />

            <div className="shop-collection-overlay"></div>

            <div className="collection-content">
              <h3>{item.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
