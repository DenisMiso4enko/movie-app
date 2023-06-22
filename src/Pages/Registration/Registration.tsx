import React, { useState } from 'react'
import './Registration.scss'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { fetchLogin, fetchRegister } from '../../store/Slices/User/userServices'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { useForm } from 'react-hook-form'

const Registration = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' })
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const fields = {
      username,
      email,
      password,
    }
    dispatch(fetchRegister({ fields, navigate }))
  }

  const onSubmit = (data: any) => {
    // console.log(JSON.stringify(data))
    dispatch(fetchRegister({ data, navigate }))
    reset()
  }

  return (
    <div className="registration auth-container">
      <h2 className="from-title">Registration</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('username', {
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Minimum 3 characters',
            },
          })}
          className="input-form"
          placeholder="Username..."
        />
        <div>
          {errors?.username && (
            /* @ts-ignore */
            <p className="error-text">{errors?.username?.message}</p>
          )}
        </div>
        <input
          type="text"
          {...register('email', {
            required: 'The field is required',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Minimum 4 characters',
            },
          })}
          className="input-form"
          placeholder="Email..."
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
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Minimum 4 characters',
            },
          })}
          className="input-form"
          placeholder="Password..."
        />
        <div>
          {errors?.password && (
            /* @ts-ignore */
            <p className="error-text">{errors?.password?.message}</p>
          )}
        </div>
        <button className="form-btn" type="submit" disabled={!isValid}>
          Registration
        </button>
        <p className="input-link">
          If have an account, link for
          <Link to={'/login'}> Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Registration
