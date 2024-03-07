import { configureStore } from '@reduxjs/toolkit'
import userAuthReducers from './slices/userAuth/userAuthSlice'
import mentorsReducers from './slices/mentors/mentorsSlice'
import studentReducers from "./slices/students/studentsSlice"

export default configureStore({
  reducer: {
    userAuth : userAuthReducers,
    mentors : mentorsReducers,
    students : studentReducers,
  },
})