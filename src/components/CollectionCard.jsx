import './CollectionCard.css'

export default function CollectionCard({ image, title, href, count }) {
  return (
    <article className="collection-card-1">
      <div className="collection-card__image">
        <a className="hv-image-saturate image-content__image-wrapper auto" href={href}>
          <img
            className="transition"
            src={image}
            alt={title}
            loading="lazy"
            width="1200"
            height="1200"
          />
        </a>
      </div>
      <div className="collection-card-1-infor">
        <h3>
          <a href={href}>
            <span>{title}</span>
            <span className="collection-count">{count}</span>
          </a>
        </h3>
      </div>
    </article>
  )
}
