import { useCallback, useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import SearchInfo from '../SearchInfo/SearchInfo'
import Form from '../Form/Form'
import api from '../../utils/api'
import './index.css'
import useDebounce from '../../hooks/useDebounce'
import { isLiked } from '../../utils/product'
import { CatalogPage } from '../../pages/CatalogPage/Catalog-page'
import { ProductPage } from '../../pages/ProductPage/Product-Page'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFound/Not-found-page'
import { UserContext } from '../../context/userContext'
import { CardContext } from '../../context/cardContext'
import { FaqPage } from '../../pages/FAQPage/Faq-page'
import { FavoritePage } from '../../pages/FavoritePage/Favorite-page'
import RegistrationForm from '../Form/registration-form'
import Modal from '../Modal/Modal'
import { FormModal } from '../FormModal/Form-modal'
import { Register } from '../Register/Register'
import { Login } from '../Login/Login'
import { ResetPassword } from '../ResetPassword/Reset-password'

function App() {
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [currentSort, setCurrentSort] = useState('')
  const debounceSearchQuery = useDebounce(searchQuery, 300)
  const [isOpenModalForm, setIsOpenModalForm] = useState(false)

  const location = useLocation()

  const backgroundLocation = location.state?.backgroundLocation
  const initialPath = location.state?.initialPath

  const navigate = useNavigate()
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
        const favoriteProducts = productsData.products.filter((item) =>
          isLiked(item.likes, userData._id)
        )
        setFavorites(favoriteProducts)
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
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard])
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id)
          )
        }

        setCards(newProducts)
        return updateCard
      })
    },
    [currentUser, cards]
  )

  const sortedData = (currentSort) => {
    switch (currentSort) {
      case 'low':
        setCards(cards.sort((a, b) => b.price - a.price))
        break
      case 'cheap':
        setCards(cards.sort((a, b) => a.price - b.price))
        break
      case 'sale':
        setCards(cards.sort((a, b) => b.discount - a.discount))
        break
      default:
        setCards(cards.sort((a, b) => a.price - b.price))
    }
  }

  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider
        value={{
          cards,
          favorites,
          currentSort,
          handleLike: handleProductLike,
          onSortData: sortedData,
          setCurrentSort,
        }}
      >
        <Header>
          <>
            <Logo
              className="logo logo_place_header"
              href="/"
            />
            <Routes location={backgroundLocation || location}>
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
          <Routes
            location={
              (backgroundLocation && {
                ...backgroundLocation,
                pathname: initialPath,
              }) ||
              location
            }
          >
            <Route
              index
              element={<CatalogPage />}
            />
            <Route
              path="/product/:productId"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route
              path="/faq"
              element={<FaqPage />}
            />
            <Route
              path="/favorites"
              element={<FavoritePage />}
            />
            <Route
              path="/login"
              element={
                <>
                  Авторизация
                  <Link to="/register">Зарегистрироваться</Link>
                </>
              }
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path="/login"
                element={
                  <Modal>
                    <Login />
                  </Modal>
                }
              />
              <Route
                path="/register"
                replace={true}
                state={{
                  backgroundLocation: location,
                  initialPath,
                }}
                element={
                  <Modal>
                    <Register />
                  </Modal>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <Modal>
                    <ResetPassword />
                  </Modal>
                }
              />
            </Routes>
          )}
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}

export default App
