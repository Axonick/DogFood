import cn from 'classnames'
import { forwardRef } from 'react'
import style from './index.module.css'

export const FormInput = forwardRef((props, ref) => {
  return props.typeinput === 'textarea' ? (
    <textarea
      ref={ref}
      className={cn(style.input, style.textarea)}
      {...props}
    />
  ) : (
    <input
      ref={ref}
      className={style.input}
      {...props}
    />
  )
})
