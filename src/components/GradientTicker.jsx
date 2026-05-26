import './GradientTicker.css'

const items = [
  'Enjoy 20% off your entire order with the code SHOEFRESH20',
  'Get 15% off your first purchase when you sign up for our newsletter. Use code NEWSHOES15',
  'Buy one pair of shoes, get the second pair 50% off. Use code BOGO50',
]

export default function GradientTicker() {
  return (
    <section className="gradient-ticker-section" aria-label="Promotional offers">
      <div className="gradient-ticker-track">
        {Array.from({ length: 6 }).map((_, groupIndex) => (
          <div className="gradient-ticker-group" key={`ticker-group-${groupIndex}`}>
            {items.map((item) => (
              <span key={`${groupIndex}-${item}`} className="gradient-ticker-item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
