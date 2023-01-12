import { useEffect, useState } from 'react'
import CardList from '../CardList/CardList'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sort from '../Sort/Sort'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
//import data from '../../assets/data.json'
import SearchInfo from '../SearchInfo/SearchInfo'
import api from '../../utils/api'
import './index.css'
import useDebounce from '../../hooks/useDebounce'
import Button from '../Button/Button'

function App() {
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 300)

  const handleRequest = () => {
    //const filterCards = cards.filter((item) =>
    //  item.name.toUpperCase().includes(searchQuery.toUpperCase())
    //)
    //setCards(filterCards)
    api
      .search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleRequest()
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData)
    })
  }

  function handleProductLike(product) {
    const isLiked = product.likes?.some((id) => id === currentUser._id)
    console.log(product, product.likes)
    api.changeLikeProduct(product._id, isLiked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        console.log('Карточка из стейта', cardState)
        console.log('Карточка из сервера', newCard)
        return cardState._id === newCard._id ? newCard : cardState
      })
      setCards(newProducts)
    })
  }

  return (
    <>
      <Header
        user={currentUser}
        onUpdateUser={handleUpdateUser}
      >
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
          <CardList
            goods={cards}
            onProductLike={handleProductLike}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
