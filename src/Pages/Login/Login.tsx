import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { fetchLogin } from '../../store/Slices/User/userServices'
import { useForm } from 'react-hook-form'
import './Login.scss'

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    dispatch(fetchLogin({ data, navigate }))
    reset()
  }

  return (
    <div className="login auth-container">
      <h2 className="from-title">Login</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Не верный формат почты',
            },
          })}
          className="input-form"
          placeholder="email..."
        />
        <div>
          {errors?.email && (
            /* @ts-ignore */
            <p className="error-text">{errors?.email?.message}</p>
          )}
        </div>

        <input
          type="password"
          {...register('password', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 3,
              message: 'Минимум 4 символа',
            },
          })}
          className="input-form"
          placeholder="password"
        />
        <div>
          {errors?.password && (
            /* @ts-ignore */
            <p className="error-text">{errors?.password?.message}</p>
          )}
        </div>
        <button className="form-btn" disabled={!isValid} type="submit">
          Login
        </button>
        <p className="input-link">
          If you don't have account, link for
          <Link to={'/registration'}> Registration</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
