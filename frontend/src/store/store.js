import { configureStore } from '@reduxjs/toolkit'
import userAuthReducers from './slices/userAuth/userAuthSlice'
import mentorsReducers from './slices/mentors/mentorsSlice'

export default configureStore({
  reducer: {
    userAuth : userAuthReducers,
    mentors : mentorsReducers
  },
})