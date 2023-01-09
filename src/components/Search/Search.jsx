import { ReactComponent as SearchIcon } from './search.svg'
import { ReactComponent as CloseIcon } from './close.svg'
import styles from './styles.css'

function Search() {
  return (
    <form className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Поиск"
      />
      <button className="search__btn">
        <SearchIcon />
        {false && <CloseIcon />}
      </button>
    </form>
  )
}

export default Search
