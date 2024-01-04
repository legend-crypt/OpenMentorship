import React from 'react'
import ValidationSchema from '../schema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import google from '../assets/images/google.svg';
import '../assets/styles/style.css'
import { Link, useNavigate } from "react-router-dom";
import initialValues from '../schema/initialValues';
import handleSubmit from '../utils/handleSubmit';
import axios from '../utils/axios'
import * as Yup from 'yup';


export default function SignIn() {
    
    const navigate = useNavigate()
    
    const basicValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(4, 'Must be 6 characters or more').required('Required'),
      });
      
    const handleSubmit = async (values) => {
  
    await axios.post('login/', values)
        .then((response) => {
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem("access_token", JSON.stringify(response.data.access));
              alert("logged in successfully");
              navigate('/profile')
      
            }
            else {
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
                                <Field name='email' type='email' placeholder="Email" className="form__field"/>
                                <ErrorMessage name='email' component="p" className='error'/>
                            </div>
                            <div className='field'>
                                <Field name='password' type='password' placeholder="Password" className="form__field"/>
                                <ErrorMessage name='password' component="p" className='error'/>
                            </div>
                            <button type='submit' id= "btn__cta" className='form__field'>Log In</button>
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
