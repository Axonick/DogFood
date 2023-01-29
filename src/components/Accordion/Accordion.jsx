import { useState } from 'react'
import cn from 'classnames'
import style from './index.module.css'

export const Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false)

  function toggleStateAccordeon() {
    setSelected(!selected)
  }
  return (
    <div className={cn(style.accordion, { [style.active]: selected })}>
      <button
        className={style.accordionButton}
        onClick={toggleStateAccordeon}
      >
        <p className={style.title}>{title}</p>
      </button>
      <div className={style.content}>
        <p className={style.text}>{children}</p>
      </div>
    </div>
  )
}
