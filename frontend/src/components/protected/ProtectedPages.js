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

    // checks user if authenticated or not
    useEffect(() => {
      // console.log(loginStatus);
      if (loginStatus) {
        // fetch user if login status true 
        dispatch(fetchActiveUser());
      }
      if (loginStatus !== true) {
        navigate("/signIn")
      }
    },[loginStatus]) // if a login status changed(When user clicked logout button) it will rerun this function

    
    
    return (
        <>
          {Component}
        </>
    )
}

export default ProtectedPages