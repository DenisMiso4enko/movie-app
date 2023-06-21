import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setFavoritesMovies, setFavoritesTv, setUser } from './userSlice'
import { BASE_URL } from '../../../constance'

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (_, { dispatch }) => {
    try {
      const id = localStorage.getItem('user')
      const response = await axios.post(`${BASE_URL}/getMe`, { id })
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
      const response = await axios.post(`${BASE_URL}/login`, fields)
      localStorage.setItem('user', response?.data?._id)
      navigate('/')
      dispatch(setUser(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchAddToFavoriteMovie = createAsyncThunk(
  'user/fetchAddToFavoriteMovie',
  async ({ userId, movieId, data }: any, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/addFavoriteMovie`, {
        userId,
        movieId,
        data,
      })
      dispatch(setFavoritesMovies(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchRemoveFavoriteMovie = createAsyncThunk(
  'user/fetchRemoveFavoriteMovie',
  async ({ userId, movieId, data }: any, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/removeFavoriteMovie`, {
        userId,
        movieId,
        data,
      })
      dispatch(setFavoritesMovies(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchRemoveFavoriteTv = createAsyncThunk(
  'user/fetchRemoveFavoriteTv',
  async ({ userId, tvId, data }: any, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/removeFavoriteTv`, {
        userId,
        tvId,
        data,
      })
      dispatch(setFavoritesTv(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)

export const fetchAddToFavoriteTv = createAsyncThunk(
  'user/fetchAddToFavoriteTv',
  async ({ userId, tvId, data }: any, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/addFavoriteTv`, {
        userId,
        tvId,
        data,
      })
      dispatch(setFavoritesTv(response.data))
    } catch (e) {
      console.log(e)
    }
  }
)
