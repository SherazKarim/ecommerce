import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/productSlice'

export const store = configureStore({
  reducer: {
    allCart: productSlice
  },
})