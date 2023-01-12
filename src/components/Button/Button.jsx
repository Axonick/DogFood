import style from './index.module.css'
import cn from 'classnames'

function Button({ type, children }) {
  return (
    <button
      className={cn(style.button, {
        [style.primary]: type === 'primary',
        [style.secondary]: type === 'secondary',
      })}
    >
      {children}
    </button>
  )
}

export default Button
