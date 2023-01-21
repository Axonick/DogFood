import style from './index.module.css'
import cn from 'classnames'

function Header({ children, user, onUpdateUser }) {
  const handleClickButtonEdit = (e) => {
    e.preventDefault()
    onUpdateUser({ name: 'Роман', about: 'about' })
  }

  return (
    <header className={cn(style.header, 'cover')}>
      <div className="container">
        {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}
        <div className={style.wrapper}>{children}</div>
      </div>
    </header>
  )
}

export default Header
