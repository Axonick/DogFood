import Card from '../Card/Card'
import './index.css'

function CardList({ goods, onProductLike }) {
  return (
    <div className="cards">
      {goods.map((item, index) => (
        <Card
          key={item._id}
          {...item}
          onProductLike={onProductLike}
        />
      ))}
    </div>
  )
}

export default CardList
