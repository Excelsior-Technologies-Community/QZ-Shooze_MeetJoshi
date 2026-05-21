import './CollectionCard.css'

export default function CollectionCard({ image, title, href, count }) {
  return (
    <div className="collection-card-1 position-relative text-center">
      <div className="collection-card__image overflow-hidden position-relative">
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
        <h4 className="m-0 h4">
          <a href={href}>
            {title}
            <p className="collection-count">{count}</p>
          </a>
        </h4>
      </div>
    </div>
  )
}
