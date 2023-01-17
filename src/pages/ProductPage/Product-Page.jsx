import { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Logo from '../../components/Logo/Logo'
import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import Sort from '../../components/Sort/Sort'
import Spinner from '../../components/Spinner'
import api from '../../utils/api'
import { isLiked } from '../../utils/product'

export const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)

  const handleRequest = () => {
    setIsLoading(true)
    api
      .search(searchQuery)
      .then((searchResult) => {
        console.log(searchResult)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleRequest()
  }

  function handleProductLike(product) {
    const liked = isLiked(product?.likes, currentUser?._id)
    api.changeLikeProduct(product._id, liked).then((newProduct) => {
      setProduct(newProduct)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      api.getProductById('622c77e877d63f6e70967d22'),
      api.getUserInfo(),
    ])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setProduct(productsData)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <Header>
        <>
          <Logo
            className="logo logo_place_header"
            href="/"
          />
          <Search onSubmit={handleFormSubmit} />
        </>
      </Header>
      <main className="content container">
        <Sort />
        <div className="content__cards">
          {isLoading ? (
            <Spinner />
          ) : (
            <Product
              {...product}
              currentUser={currentUser}
              onProductLike={handleProductLike}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
