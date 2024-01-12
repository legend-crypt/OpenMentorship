/*
  The `SignIn` React component represents the user sign-in page. It utilizes Formik for form handling, Yup for form validation, and Axios for making API requests. Users can log in with their email and password, and the component provides feedback messages on success or failure.

  Component:
  - SignIn: Manages user sign-in functionality.

  Key Functionalities:
  - Utilizes Formik for form handling and Yup for form validation.
  - Handles user sign-in using Axios to make a POST request to the server's login endpoint.
  - Alerts the user with success or failure messages based on API responses.
  - Provides a link to the sign-up page for users without an account.
  - Supports social login through Google (or other OAuth providers).

  Note: The component enhances the user experience by incorporating form validation and clear feedback messages for successful and unsuccessful login attempts.
*/



import React from 'react'
import ValidationSchema from '../schema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import google from '../assets/images/google.svg';
import '../assets/styles/style.css'
import { Link, useNavigate } from "react-router-dom";
import initialValues from '../schema/initialValues';
// import handleSubmit from '../utils/handleSubmit'; // this util function is not being used here
import axios from '../utils/axios'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/slices/userAuth/userAuthSlice';

export default function SignIn() {
  // -- react redux states ---

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const basicValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(4, 'Must be 6 characters or more').required('Required'),
  });

  const handleSubmit = (values) => {

     axios.post('login/', values)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access_token", JSON.stringify(response.data.token.access));
          alert("logged in successfully");
          // change user login status
          if (!response.data.user.profile) {
            // if user does not have a profile then redirect to 
            dispatch(loginUser({
              isProfileFound : false,
              userDetails : response.data.user
            }))
            navigate('/profile') 
          }else{
            dispatch(loginUser({
              isProfileFound : true,
              userDetails :  response.data.user
            }))
            navigate("/")
          }
        }else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        alert('Failed to register user:', error.response.data);
      })
  };

  return (
    <div className='form__contanier'>
      <div className="form">
        <div>

          <h1 className='form__head--text'>Welcome Back</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={basicValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className='field'>
                <Field name='email' type='email' placeholder="Email" className="form__field" />
                <ErrorMessage name='email' component="p" className='error' />
              </div>
              <div className='field'>
                <Field name='password' type='password' placeholder="Password" className="form__field" />
                <ErrorMessage name='password' component="p" className='error' />
              </div>
              <button type='submit' id="btn__cta" className='form__field'>Log In</button>
              <div><p>or continue with </p></div>
              <div className='field'>
                <a href="#"><button className='oauth-btn form__field' type='button '><img src={google} className='oauth-svg'></img></button></a>
              </div>
              <p>Don't have an account? <Link to="/signUp">Sign Up</Link></p>
            </Form>
          </Formik>
        </div>
      </div>

    </div>
  )
}
