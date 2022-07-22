import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/couterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})