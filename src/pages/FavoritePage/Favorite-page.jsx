import { useContext } from 'react'
import CardList from '../../components/CardList/CardList'
import { ContentHeader } from '../../components/ContentHeader/Content-header'
import Sort from '../../components/Sort/Sort'
import Spinner from '../../components/Spinner'
import { CardContext } from '../../context/cardContext'

export const FavoritePage = () => {
  const { favorites } = useContext(CardContext)
  return (
    <>
      <ContentHeader title="Избранное" />
      <Sort />
      <div className="content__cards">
        <CardList cards={favorites} />
      </div>
    </>
  )
}
