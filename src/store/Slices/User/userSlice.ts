import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAddToFavoriteMovie,
  fetchAddToFavoriteTv,
  fetchLogin,
  fetchUserById,
} from './userServices'
import { IMovieTypes } from '../../../types/MovieTypes'

export interface IUserSlice {
  userId: string | null
  email: string | null
  username: string | null
  favoritesTv: [IMovieTypes] | null
  favoritesMovies: [IMovieTypes] | null
  loading: boolean
  error: any
}

const initialState: IUserSlice = {
  favoritesMovies: null,
  favoritesTv: null,
  userId: null,
  username: null,
  email: null,
  error: null,
  loading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { _id, username, email, favoritesMovies, favoritesTv } =
        action.payload
      state.userId = _id
      state.email = email
      state.username = username
      state.favoritesMovies = favoritesMovies
      state.favoritesTv = favoritesTv
    },
    setFavoritesMovies(state, action) {
      state.favoritesMovies = action.payload
    },
    setFavoritesTv(state, action) {
      state.favoritesTv = action.payload
    },
    logOut(state) {
      localStorage.removeItem('user')
      state.userId = null
      state.email = null
      state.username = null
      state.favoritesMovies = null
      state.favoritesTv = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    // getMe
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserById.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchUserById.rejected, (state) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    // to fav movie
    builder.addCase(fetchAddToFavoriteMovie.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchAddToFavoriteMovie.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchAddToFavoriteMovie.rejected, (state) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    // to fav tv
    builder.addCase(fetchAddToFavoriteTv.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchAddToFavoriteTv.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchAddToFavoriteTv.rejected, (state) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setFavoritesMovies, setFavoritesTv, logOut } =
  userSlice.actions

export default userSlice.reducer
