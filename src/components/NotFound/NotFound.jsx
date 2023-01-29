import notFound from './img/ic-notfound.svg'
import { Link } from 'react-router-dom'
import style from './style.module.css'

export const NotFound = ({
  children,
  title,
  buttonText = 'На главную',
  buttonAction,
}) => {
  return (
    <>
      <div className={style.notFound}>
        <img
          src={notFound}
          className={style.image}
          aria-hidden="true"
          alt=""
        />
        <h1 className={style.title}>{title}</h1>
        {children && children}
        {buttonAction ? (
          <a
            href="#"
            className="btn"
            onClick={buttonAction}
          >
            {buttonText}
          </a>
        ) : (
          <Link
            to="/"
            className="btn"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </>
  )
}
