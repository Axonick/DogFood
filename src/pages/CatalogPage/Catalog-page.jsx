import CardList from '../../components/CardList/CardList'
import Sort from '../../components/Sort/Sort'
import Spinner from '../../components/Spinner'

export const CatalogPage = ({ isLoading }) => {
  return (
    <>
      <Sort />
      <div className="content__cards">
        {isLoading ? <Spinner /> : <CardList />}
      </div>
    </>
  )
}
