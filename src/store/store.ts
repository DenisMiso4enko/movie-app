import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './Slices/Home/homeSlice'
import userSlice from './Slices/User/userSlice'

export const store = configureStore({
  reducer: {
    home: homeSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
