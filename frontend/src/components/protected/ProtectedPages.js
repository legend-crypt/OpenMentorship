/*
  This component will call API to fetch is the user actually authenticated before allowing users to interact with the components
*/
import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
const ProtectedPages = ({Component }) => {

    const navigate = useNavigate();
    // react redux state ---
    const {loginStatus} = useSelector((state)=> state.userAuth)
    

    if (!loginStatus) {
      navigate("/signIn");
      return null; // Prevent rendering of protected component
    }
  

    
    
    return (
        <>
          {Component}
        </>
    )
}

export default ProtectedPages