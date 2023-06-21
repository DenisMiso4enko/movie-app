import React, { useState } from 'react'
import './Registration.scss'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { fetchLogin, fetchRegister } from '../../store/Slices/User/userServices'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'

const Registration = () => {
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

  return (
    <div className="registration auth-container">
      <h2 className="from-title">Registration</h2>
      <form className="form" onSubmit={handleLogin}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          type={'text'}
          placeholder={'username...'}
          cls={'input-form'}
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type={'email'}
          placeholder={'email...'}
          cls={'input-form'}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type={'password'}
          placeholder={'password...'}
          cls={'input-form'}
        />
        <button className="form-btn" type="submit">
          Login
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
