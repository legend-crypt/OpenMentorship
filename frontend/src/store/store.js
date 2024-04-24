import { configureStore } from '@reduxjs/toolkit'
import userAuthReducers from './slices/userAuth/userAuthSlice'
import mentorsReducers from './slices/mentors/mentorsSlice';
import UserRoleSlice from './slices/userRole/UserRoleSlice';

export default configureStore({
  reducer: {
    userAuth : userAuthReducers,
    mentors : mentorsReducers,
    userRole : UserRoleSlice,
  },
})