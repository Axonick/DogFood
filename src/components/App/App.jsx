import { useCallback, useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import SearchInfo from '../SearchInfo/SearchInfo'
import api from '../../utils/api'
import './index.css'
import useDebounce from '../../hooks/useDebounce'
import { isLiked } from '../../utils/product'
import { CatalogPage } from '../../pages/CatalogPage/Catalog-page'
import { ProductPage } from '../../pages/ProductPage/Product-Page'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFound/Not-found-page'
import { UserContext } from '../../context/userContext'
import { CardContext } from '../../context/cardContext'

function App() {
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const debounceSearchQuery = useDebounce(searchQuery, 300)

  const handleRequest = useCallback(() => {
    setIsLoading(true)
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/')
    setSearchQuery(inputText)
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

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id)
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          //console.log('Карточка из стейта', cardState)
          //console.log('Карточка из сервера', updateCard)
          return cardState._id === updateCard._id ? updateCard : cardState
        })
        setCards(newProducts)

        return updateCard
      })
    },
    [currentUser, cards]
  )

  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider value={{ cards, handleLike: handleProductLike }}>
        <Header>
          <>
            <Logo
              className="logo logo_place_header"
              href="/"
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Search
                    onSubmit={handleFormSubmit}
                    onInput={handleInputChange}
                  />
                }
              />
            </Routes>
          </>
        </Header>
        <main className="content container">
          <SearchInfo searchText={searchQuery} />
          <Routes>
            <Route
              index
              element={<CatalogPage />}
            />
            <Route
              path="/product/:productId"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}

export default App
