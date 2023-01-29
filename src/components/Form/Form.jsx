//import cn from 'classnames'
//import { useForm } from 'react-hook-form'
//import { FormButton } from '../FormButton/Form-button'
//import { FormInput } from '../FormInput/Form-input'
import style from './index.module.css'
import './style.css'

function Form({ title, handleFormSubmit, children }) {
  return (
    <form
      className={style.form}
      onSubmit={handleFormSubmit}
    >
      <h1 className={style.title}>{title}</h1>

      {children}
      {/*<FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder={input.email}
      />
      <div>
        {errors?.email && (
          <p className="errorMessage">{errors?.email?.message}</p>
        )}
      </div>

      {['login', 'registration'].includes(formType) && (
        <>
          <FormInput
            {...passwordRegister}
            id="password"
            type="password"
            placeholder={input.password}
          />
          <div>
            {errors?.password && (
              <p className="errorMessage">{errors?.password?.message}</p>
            )}
          </div>
        </>
      )}

      {['login', 'registration'].includes(formType) && (
        <>
          <FormInput
            {...passwordRegister}
            id="password"
            type="password"
            placeholder={input.password}
          />
          <div>
            {errors?.password && (
              <p className="errorMessage">{errors?.password?.message}</p>
            )}
          </div>
        </>
      )}
      {formType === 'login' && (
        <p
          className={cn(style.infoText, style.link)}
          onClick={() => changeType('reset')}
        >
          {infoText}
        </p>
      )}

      {['reset', 'registration'].includes(formType) && (
        <p className={style.infoText}>{infoText}</p>
      )}

      <FormButton
        type="submit"
        color="yellow"
      >
        {button.submit}
      </FormButton>

      {['login', 'registration'].includes(formType) && (
        <FormButton
          color="white"
          type="button"
          onClick={() => changeType(redirect)}
        >
          {button.redirect}
        </FormButton>
      )}*/}
    </form>
  )
}

export default Form
