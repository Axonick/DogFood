import style from './index.module.css'
import cn from 'classnames'
import { calcDiscountPrice, isLiked, createMarkup } from '../../utils/product'
import { ReactComponent as Save } from './img/save.svg'
import truck from './img/truck.svg'
import quality from './img/quality.svg'

const Product = ({
  onProductLike,
  pictures,
  likes = [],
  reviews,
  tags,
  name,
  price,
  discount,
  wight,
  description,
  _id,
  currentUser,
  product,
}) => {
  const discount_price = calcDiscountPrice(price, discount)
  const isLike = isLiked(likes, currentUser?._id)

  const descriptionHTML = createMarkup(description)

  return (
    <>
      <div>
        <a
          href="#"
          className="button-back"
        >
          Назад
        </a>
        <h1 className={style.productTitle}>{name}</h1>
        <div>
          <span>Артикул:</span> <b>2388907</b>
        </div>
      </div>
      <div className={style.product}>
        <div className={style.imgWrapper}>
          <img
            src={pictures}
            alt={`Изображение ${name}`}
          />
        </div>
        <div className={style.desc}>
          <span className={discount ? style.oldPrice : style.price}>
            {price}&nbsp;₽
          </span>
          {discount && (
            <span className={(cn(style.price), 'card__price_type_discount')}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={style.btnWrap}>
            <div className={style.left}>
              <button className={style.minus}>-</button>
              <span className={style.num}>0</span>
              <button className={style.plus}>+</button>
            </div>
            <a
              href="#"
              className={cn('btn', 'btn_type_primary', style.cart)}
            >
              В корзину
            </a>
          </div>
          <button
            className={cn(style.favorite, { [style.favoriteActive]: isLike })}
            onClick={() => onProductLike(product)}
          >
            <Save />
            <span>{isLike ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={style.delivery}>
            <img
              src={truck}
              alt="truck"
            />
            <div className={style.right}>
              <h3 className={style.name}>Доставка по всему миру!</h3>
              <p className={style.text}>
                Доставка курьером от <span className={style.bold}>399 ₽</span>
              </p>
            </div>
          </div>
          <div className={style.delivery}>
            <img
              src={quality}
              alt="quality"
            />
            <div className={style.right}>
              <h3 className={style.name}>Доставка по всему миру!</h3>
              <p className={style.text}>
                Доставка курьером от <span className={style.bold}>399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.box}>
        <h2 className={style.title}>Описание</h2>
        <p
          className={style.subtitle}
          dangerouslySetInnerHTML={descriptionHTML}
        ></p>
        <h2 className={style.title}>Характеристики</h2>
        <div className={style.grid}>
          <div className={style.naming}>Вес</div>
          <div className={style.description}>1 шт 120-200 грамм</div>
          <div className={style.naming}>Цена</div>
          <div className={style.description}>490 ₽ за 100 грамм</div>
          <div className={style.naming}>Польза</div>
          <div className={style.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
