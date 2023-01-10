import './index.css'

function SearchInfo({ searchText, searchCount }) {
  return (
    searchText && (
      <section className="search-title">
        По запросу <span>{searchText}</span> найдено {searchCount} товаров
      </section>
    )
  )
}

export default SearchInfo
