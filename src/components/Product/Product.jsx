import style from './index.module.css'
import cn from 'classnames'
import { calcDiscountPrice, isLiked, createMarkup } from '../../utils/product'
import { ReactComponent as Save } from './img/save.svg'
import truck from './img/truck.svg'
import quality from './img/quality.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { ContentHeader } from '../ContentHeader/Content-header'
import Rating from '../Rating/Rating'
import { useState } from 'react'
import { useMemo } from 'react'
import { FormReview } from '../FormReview/Form-review'

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
  product,
  setProduct,
}) => {
  const { user: currentUser } = useContext(UserContext)
  //const [rating, setRating] = useState(null)
  //const navigate = useNavigate()
  const discount_price = calcDiscountPrice(price, discount)
  const isLike = isLiked(likes, currentUser?._id)
  const descriptionHTML = createMarkup(description)

  const ratingCount = useMemo(
    () =>
      Math.round(
        reviews.reduce((acc, r) => (acc = acc + r.rating), 0) / reviews.length
      ),
    [reviews]
  )

  return (
    <>
      <ContentHeader title={name}>
        <div>
          <span>Артикул:</span>
          <Rating rating={ratingCount} /> {reviews.length} отзыв
        </div>
      </ContentHeader>
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
          {discount !== 0 && (
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
      <ul>
        {reviews.map((reviewData) => (
          <li key={reviewData._id}>
            {reviewData.text} <Rating rating={reviewData.rating} />
          </li>
        ))}
      </ul>

      <FormReview
        title={`Отзыв о товаре ${name}`}
        productId={_id}
        setProduct={setProduct}
      />
    </>
  )
}

export default Product
