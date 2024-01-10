import { configureStore } from '@reduxjs/toolkit'
import userAuthReducers from './slices/userAuth/userAuthSlice'

export default configureStore({
  reducer: {
    userAuth : userAuthReducers
  },
})