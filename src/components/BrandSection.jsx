import "./BrandSection.css";

const logos = [
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-1.png?v=1731499378&width=1920", // pehome
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-2.png?v=1731499378&width=1920", // power
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-3.png?v=1731499378&width=1920", // connect
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-11.png?v=1731499961&width=1920", // vagoda
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-5.png?v=1731499378&width=1920", // intrum

  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-6.png?v=1731499378&width=1920", // renove
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-7.png?v=1731499378&width=1920", // elevate
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-8.png?v=1731499379&width=1920", // zavana
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-9.png?v=1731499378&width=1920", // rival
  "https://qx-shooz.myshopify.com/cdn/shop/files/text-logo-10.png?v=1731499378&width=1920", // volume
];

function BrandSection() {
  return (
    <section className="brand-section">
      <div className="brand-container">

        <div className="brand-header">
          <h2>Customer Feedback Highlights</h2>

          <p>
            Laoreet ridiculus congue magna malesuada
            phasellus condimentum taciti mus primis.
          </p>
        </div>

        <div className="brand-grid">
          {logos.map((logo, index) => (
            <div className="brand-card" key={index}>
              <img src={logo} alt={`brand-${index}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BrandSection;