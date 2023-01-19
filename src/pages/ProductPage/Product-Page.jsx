import { useCallback, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Logo from '../../components/Logo/Logo'
import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import Sort from '../../components/Sort/Sort'
import Spinner from '../../components/Spinner'
import api from '../../utils/api'
import { isLiked } from '../../utils/product'

const ID_PRODUCT = '622c77e877d63f6e70967d22'

export const ProductPage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)

  const handleRequest = useCallback((searchQuery) => {
    setIsLoading(true)
    api
      .search(searchQuery)
      .then((searchResult) => {
        //console.log(searchResult)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleProductLike = useCallback(() => {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked).then((newProduct) => {
      setProduct(newProduct)
    })
  }, [product, currentUser])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductById(ID_PRODUCT), api.getUserInfo()])
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
          <Search onSubmit={handleRequest} />
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
              product={product}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
