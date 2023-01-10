import { ReactComponent as SearchIcon } from './search.svg'
import { ReactComponent as CloseIcon } from './close.svg'
import './index.css'

function Search({ onSubmit, onInput }) {
  const handleInput = (e) => {
    onInput(e.target.value)
  }
  return (
    <form
      className="search"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="search__input"
        placeholder="Поиск"
        onInput={handleInput}
      />
      <button className="search__btn">
        <SearchIcon />
        {false && <CloseIcon />}
      </button>
    </form>
  )
}

export default Search
