import './styles.css'
import LogoSrc from './logo.svg'

function Logo() {
  return (
    <a
      href="/"
      className="logo"
    >
      <img
        src={LogoSrc}
        alt="Логотип компании"
        className="logo__pic"
      />
    </a>
  )
}

export default Logo
