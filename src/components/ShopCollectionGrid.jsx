import "./ShopCollectionGrid.css";

const collections = [
  {
    title: "Athletic Footwear",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/collections/col-5.png?v=1731658002",
  },
  {
    title: "Boots for Every Occasion",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/collections/col-4.png?v=1731657987",
  },
  {
    title: "Luxury Leather Shoes",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/collections/col-6.png?v=1731658012",
  },
  {
    title: "Sandals & Slides",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/collections/col-2.png?v=1731657969",
  },
  {
    title: "Sneakerhead's Haven",
    image:
      "https://qx-shooz.myshopify.com/cdn/shop/collections/col-3.png?v=1731657979",
  },
];

export default function CollectionGrid() {
  return (
    <section className="collection-section">
      <div className="shop-collection-grid">
        {collections.map((item, index) => (
          <div className="collection-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="overlay"></div>

            <div className="collection-content">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}