import { useForm } from 'react-hook-form'
import { FormInput } from '../FormInput/Form-input'
import './index.module.css' 

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const cbSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(cbSubmit)}>
      <h3>Регистрация</h3>
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Имя пользователя обязательно',
          },
          minLength: {
            value: 2,
            message: 'Имя пользователя не менее 3 символов',
          },
        })}
        type="text"
        placeholder="Имя"
      />
      <div>
        {errors?.name && (
          <p className="errorMessage">{errors?.name?.message}</p>
        )}
      </div>
      <input
        {...register('email')}
        type="text"
        placeholder="Email"
      />
      <input
        {...register('password', {
          required: {
            value: true,
            message: 'Поле пароля обязательно для заполнения',
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              'Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру',
          },
        })}
        type="password"
        placeholder="Password"
      />
      <div>
        {errors?.password && (
          <p className="errorMessage">{errors?.password?.message}</p>
        )}
      </div>
      <button>Зарегистрироваться</button>
    </form>
  )
}

export default RegistrationForm
