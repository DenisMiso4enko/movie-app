import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUser } from './userSlice'

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (_, { dispatch }) => {
    try {
      const id = localStorage.getItem('user')
      const response = await axios.post('http://localhost:9876/getMe', { id })
      dispatch(setUser(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async ({ fields, navigate }: any, { dispatch }) => {
    try {
      const response = await axios.post('http://localhost:9876/login', fields)
      localStorage.setItem('user', response?.data?._id)
      navigate('/')
      dispatch(setUser(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

// await axios.post('http://localhost:9876/login', fields)
