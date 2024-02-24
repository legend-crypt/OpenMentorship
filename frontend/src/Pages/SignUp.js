// /*
//   The `SignUp` React component represents the user sign-up page. It utilizes Formik for form handling, Yup for form validation, and Axios for making API requests. Users can create a new account by providing their email, password, and role. The component also supports social sign-up through Google (or other OAuth providers).

//   Component:
//   - SignUp: Manages user sign-up functionality.

//   Key Functionalities:
//   - Utilizes Formik for form handling and Yup for form validation.
//   - Handles user sign-up using Axios to make a POST request to the server's create account endpoint.
//   - Alerts the user with success or failure messages based on API responses.
//   - Provides options to select a role during sign-up.
//   - Supports social sign-up through Google (or other OAuth providers).
//   - Redirects users to the email verification page upon successful registration.

//   Note: The component enhances the user experience by incorporating form validation, clear feedback messages, and support for both standard and social sign-up options.
// */


// import React, {useState, useEffect} from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import google from '../assets/images/google.svg';
// import '../assets/styles/style.css';
// import { Link, useNavigate } from "react-router-dom";
// import basicValidationSchema from '../schema/basicValidationSchema';
// import axios from '../utils/axios'


// export default function SignUp() {

//   const [userEmail, setUserEmail] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     localStorage.setItem("email", JSON.stringify(userEmail))
//   }, [userEmail])

  
//   console.log(localStorage)


// const handleSubmit = async (values) => {
  
//   setUserEmail(values.email);
//   console.log(values.email)
//   await axios.post('accounts/create/', values)
//   .then((response) => {
//       if (response.status === 201) {
//         alert("You have successfully registered");
//         navigate('/verification')

//         }
//       else {
//         alert(response.data.error);
//       }
//     })
//   .catch((error) => {
//   alert('Failed to register user:', error.response.data);
//   }) 
// };


//   const initialValues = {
//     email: '',
//     password: '',
//     role: '',
 
// };



//   return (

    
//     <div className='form__contanier'>
//       <div className="form">
        
//         <h1 className='form__head--text'>Create an Account</h1>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={basicValidationSchema}
//           onSubmit={handleSubmit}
//         >{ ({ isSubmitting, isValid }) => (
//           <Form>
//             <div className='field'>
//               <Field name='email' type='email' placeholder='Email' className='form__field' />
//               <ErrorMessage name='email' component='p' className='error' />
//             </div>
//             <div className='field'>
//               <Field name='password' type='password' placeholder='Password' className='form__field' />
//               <ErrorMessage name='password' component='p' className='error' />
//             </div>
//             <div className='field'>
//               <Field name='role' as='select' className='form__field'>
//                 <option value=''>Role</option>
//                 <option value='Mentee'>Mentee</option>
//                 <option value='Mentor'>Mentor</option>
//               </Field>
//               <ErrorMessage name='role' component='p' className='error' />
//             </div>
//             <button type='submit' id='btn__cta' className='form__field' disabled={isSubmitting || !isValid}>
//               {isSubmitting ? 'Submitting...' : 'Sign Up'}
//             </button>
//             <div>
//               <p>or continue with </p>
//             </div>
//             <div className='field'>
//               <a href='#'>
//                 <button className='oauth-btn form__field' type='button '>
//                   <img src={google} className='oauth-svg' alt='Google' />
//                 </button>
//               </a>
//             </div>
//             <p>
//               Already have an account? <Link to="/signIn">Login In</Link>
//             </p>
//           </Form>
//         )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/images/google.svg';
import basicValidationSchema from '../schema/basicValidationSchema';
import '../assets/styles/style.css';
import '../css/signup.css'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('email', JSON.stringify(email));
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch('http://localhost:8000/api/accounts/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('You have successfully registered');
        navigate('/verification');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to register user');
      }
    } catch (error) {
      console.error('Failed to register user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form__contanier">
      <div className="form">
        <h1 className="form__head--text">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              className="form__field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              className="form__field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field">
          <select
            className="form__field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled hidden style= {{color: 'grey'}}>Select a Role</option>
            <option value="Mentee">Mentee</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <button type="submit" id="btn__cta" className="form__field">
          Sign Up
        </button>
        </form>
        <div className="field" style={{ textAlign: 'center', backgroundColor: '#4285f4',  margin:'3px' }}>
          <p className="continue-with">
            Continue with&nbsp;
            <img src={google} className="oauth-svg" alt="Google" />
          </p>
        </div>
        
        <p>
          Already have an account? <Link to="/signIn">Login In</Link>
        </p>
      </div>
    </div>
  );
}
