import { useContext } from 'react'
import { CardContext } from '../../context/cardContext'
import Card from '../Card/Card'
import './index.css'

function CardList() {
  const { cards } = useContext(CardContext)
  return (
    <div className="cards">
      {cards.map((item, index) => (
        <Card
          key={item._id}
          {...item}
        />
      ))}
    </div>
  )
}

export default CardList
