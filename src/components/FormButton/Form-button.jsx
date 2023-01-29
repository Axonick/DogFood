import style from './index.module.css'
import cn from 'classnames'

export const FormButton = ({ children, color, ...props }) => {
  return (
    <button
      {...props}
      className={cn(style.btn, style[color])}
    >
      {children}
    </button>
  )
}
