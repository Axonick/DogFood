import cn from 'classnames'
import style from './index.module.css'
import { useCallback, useEffect, useState } from 'react'
import { ReactComponent as StarIcon } from './star.svg'

function Rating({ isEditable = false, rating, setRating = null }) {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>))

  const constructRating = useCallback((currentRating) => {
    const updateArray = ratingArray.map(
      (ratingElement, index) => {
        return (
          <StarIcon
            className={cn(style.star, {
              [style.filled]: index < currentRating,
              [style.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(index + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => changeRating(index + 1)}
          />
        )
      },
      [rating, isEditable]
    )

    setRatingArray(updateArray)
  })

  const changeDisplay = (rating) => {
    if (!isEditable) return
    constructRating(rating)
  }

  const changeRating = (rating) => {
    if (!isEditable || !setRating) return

    setRating(rating)
  }
  useEffect(() => {
    constructRating(rating)
  }, [rating])

  return (
    <div>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}

export default Rating
