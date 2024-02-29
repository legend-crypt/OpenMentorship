/*
  This component will call API to fetch is the user actually authenticated before allowing users to interact with the components
*/
import React, { useEffect } from 'react'
import { fetchActiveUser } from '../../store/slices/userAuth/userAuthSlice'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
const ProtectedPages = ({Component }) => {

    const navigate = useNavigate();
    // react redux state ---
    const {loginStatus} = useSelector((state)=> state.userAuth)
    
    const dispatch = useDispatch();

    if (!loginStatus) {
      navigate("/signIn");
      return null; // Prevent rendering of protected component
    }
  

    
    
    return (
        <div className='min-h-screen' >
          { loginStatus ? Component : <h1>Loading....</h1> }
        </div>
    )
}

export default ProtectedPages