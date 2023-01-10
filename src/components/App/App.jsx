import { useEffect, useState } from 'react'
import CardList from '../CardList/CardList'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sort from '../Sort/Sort'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import data from '../../assets/data.json'
import SearchInfo from '../SearchInfo/SearchInfo'
import './index.css'

function App() {
  const [cards, setCards] = useState(data)
  const [searchQuery, setSearchQuery] = useState('')

  const handleRequest = () => {
    const filterCards = data.filter((item) =>
      item.name.toUpperCase().includes(searchQuery.toUpperCase())
    )
    setCards(filterCards)
  }

  useEffect(() => {
    handleRequest()
  }, [searchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleRequest()
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  return (
    <>
      <Header>
        <>
          <Logo
            className="logo logo_place_header"
            href="/"
          />
          <Search
            onSubmit={handleFormSubmit}
            onInput={handleInputChange}
          />
        </>
      </Header>
      <main className="content container">
        <SearchInfo
          searchText={searchQuery}
          searchCount={cards.length}
        />
        <Sort />
        <div className="content__cards">
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
