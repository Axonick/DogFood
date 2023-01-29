import { useNavigate } from 'react-router-dom'
import style from './index.module.css'

export const ContentHeader = ({ title, children }) => {
  const navigate = useNavigate
  return (
    <div>
      <a
        href="#"
        className={style.buttonBack}
        onClick={() => navigate(-1)}
      >
        Назад
      </a>
      <h1 className={style.title}>{title}</h1>
      {children}
    </div>
  )
}
