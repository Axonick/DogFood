import style from './index.module.css'
import cn from 'classnames'
import { ReactComponent as FavoriteIcon } from './img/favorites.svg'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { CardContext } from '../../context/cardContext'

function Header({ children, user, onUpdateUser }) {
  const { favorites } = useContext(CardContext)
  const location = useLocation()
  return (
    <header className={cn(style.header, 'cover')}>
      <div className="container">
        <div className={style.wrapper}>
          {children}
          <div className={style.iconsMenu}>
            <Link
              className={style.favoritesLink}
              to="/favorites"
            >
              <FavoriteIcon />
              {favorites.length !== 0 && (
                <span className={style.iconBubble}>{favorites.length}</span>
              )}
            </Link>

            <Link
              to="/login"
              state={{
                backgroundLocation: location,
                initialPath: location.pathname,
              }}
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
