import './index.css'
import Card from '../Card/Card'

function CardList({ goods }) {
  return (
    <div className="cards">
      {goods.map((item, index) => (
        <Card
          key={index}
          {...item}
        />
      ))}
    </div>
  )
}

export default CardList
