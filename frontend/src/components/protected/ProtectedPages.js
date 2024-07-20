/*
  This component will call API to fetch is the user actually authenticated before allowing users to interact with the components
*/
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
const ProtectedPages = ({Component }) => {

    const navigate = useNavigate();
    // react redux state ---
    const {loginStatus} = useSelector((state)=> state.userAuth)
    

    useEffect(() => {
    if (!loginStatus) {
      navigate("/signIn");
    }}, [loginStatus, navigate])
  

    
    
    return (
        <>
            <>{loginStatus ? Component: null}</>

        </>
    )
}

export default ProtectedPages