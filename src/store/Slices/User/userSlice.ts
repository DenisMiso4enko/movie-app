import { createSlice } from '@reduxjs/toolkit'
import { fetchLogin, fetchUserById } from './userServices'

export interface IUserSlice {
  userId: string | null
  email: string | null
  username: string | null
  favoritesTv: [number] | null
  favoritesMovies: [number] | null
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
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer
