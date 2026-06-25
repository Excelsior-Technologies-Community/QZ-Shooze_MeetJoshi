import { Link } from 'react-router-dom'
import './CollectionCard.css'

export default function CollectionCard({ image, title, count }) {
  return (
    <article className="collection-card-1">
      <div className="collection-card__image">
        <Link to="/shops" className="hv-image-saturate image-content__image-wrapper auto">
          <img
            className="transition"
            src={image}
            alt={title}
            loading="lazy"
            width="1200"
            height="1200"
          />
        </Link>
      </div>
      <div className="collection-card-1-infor">
        <h3>
          <Link to="/shops">
            <span>{title}</span>
            <span className="collection-count">{count}</span>
          </Link>
        </h3>
      </div>
    </article>
  )
}
