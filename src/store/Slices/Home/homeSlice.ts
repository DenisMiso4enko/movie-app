import { createSlice } from '@reduxjs/toolkit'

export interface homeSlice {
  url: any
  genres: any
  searchQuery: string
}

const initialState: homeSlice = {
  url: {},
  genres: {},
  searchQuery: '',
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload
    },
    getGenres: (state, action) => {
      state.genres = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, setSearchQuery } =
  homeSlice.actions

export default homeSlice.reducer
