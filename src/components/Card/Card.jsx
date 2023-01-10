import './index.css'
import like from './like.svg'

function Card({ name, price, discount, wight, desciption, picture }) {
  const discount_price = Math.round(price - (price * discount) / 100)
  return (
    <div className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (
          <span className="card__discount">{`-  ${discount}%`}</span>
        )}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button className="card__favorite">
          <img
            src={like}
            alt="Добавить в избранное"
            className="card_favorite-icon"
          />
        </button>
      </div>

      <a
        href="/product"
        className="card__link"
      >
        <img
          src={picture}
          alt={desciption}
          className="card__image"
        />
        <div className="card__desc">
          <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {discount_price}&nbsp;₽
            </span>
          )}
          <span className="card__wight">{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </a>
      <a
        href="#"
        className="card__cart btn btn_type_primary"
      >
        В корзину
      </a>
    </div>
  )
}

export default Card
