import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import Input from '../../components/Input/Input'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { fetchLogin } from '../../store/Slices/User/userServices'

const Login = () => {
  const [email, setEmail] = useState('denrrmisochenko17@gmail.com')
  const [password, setPassword] = useState('test')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const fields = {
      email,
      password,
    }
    dispatch(fetchLogin({ fields, navigate }))
  }

  return (
    <div className="login auth-container">
      <h2 className="from-title">Login</h2>
      <form className="form" onSubmit={handleLogin}>
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
          If you don't have account, link for
          <Link to={'/registration'}> Registration</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
