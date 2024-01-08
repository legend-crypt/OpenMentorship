/*
  The `Profile` React component is responsible for displaying and updating user profile information. It uses Formik for form handling, Yup for form validation, and Axios for making API requests. The component allows users to create a new profile or update an existing one, with an option to upload a profile picture.

  Component:
  - Profile: Manages the user's profile, allowing them to create or update it.

  Key Functionalities:
  - Fetches existing user profile information if available.
  - Provides a form for updating or creating a user profile.
  - Uses Formik for form handling and Yup for form validation.
  - Utilizes Axios for making API requests to create or update the user profile.
  - Displays existing profile information, if available, for reference.
  - Alerts the user with success or failure messages based on API responses.

  Note: The component promotes a seamless user experience for managing user profiles with comprehensive form validation and clear feedback messages.
*/



import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


const initialValues = {
    first_name: userProfile ? userProfile.first_name : '',
    last_name: userProfile ? userProfile.last_name : '',
    bio: userProfile ? userProfile.bio : '',
    profile_picture: userProfile ? userProfile.profile_picture : '',
};
console.log(initialValues.first_name)


  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
  };


  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    setAccessToken(access_token);
    console.log(accessToken);

    if(accessToken) {
      storedProfile? 
    setUserProfile(storedProfile)
    : axios.get('profile/retrieve/', config)
    .then((response) => {
      if (response.status === 200) {
        setUserProfile(response.data.data);
        localStorage.setItem('profile', JSON.stringify(response.data.data));
      }
    })
    .catch((error) => {
      alert('Failed to retrieve profile:', error.response.data);
    });
    }

  }, [accessToken, userProfile]);

  console.log(userProfile);


  const basicValidationSchema = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    bio: Yup.string(),
    profile_picture: Yup.mixed(),
  });


  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('bio', values.bio);
    const fileInput = document.querySelector('input[name="profile_picture"]');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('profile_picture', fileInput.files[0]);
    }

    try {
      const response = userProfile
        ? await updateProfile(formData)
        : await createProfile(formData);

      if (response.status === 200 || response.status === 201) {
        const updatedProfile = response.data.profile;
        setUserProfile(updatedProfile);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        alert(userProfile ? 'Profile successfully updated' : 'Profile successfully created');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert(`Failed to ${userProfile ? 'update' : 'create'} profile: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  const createProfile = async (formData) => {
    return await axios.post('profile/create/', formData, config);
  };

  const updateProfile = async (formData) => {
    return await axios.put('profile/update/', formData, config);
  };

  return (
    <>
      <Header />
      <div className='container'>
        {/* Display existing profile information */}
        {userProfile && (
          <div className='profile__info'>
            <div className='profile_info--image'>
              <img src={`http://127.0.0.1:8000${userProfile.profile_picture}`} alt='profile' className='profile' />
            </div>
            <div className='profile_info--text'>
              <p>
                First Name: <span>{userProfile.first_name}</span>
              </p>
              <p>
                Last Name: <span>{userProfile.last_name}</span>
              </p>
              {/* Add other profile information here */}
            </div>
          </div>
        )}
        {/* Form for updating profile */}
        <h1 className='form__head--text'>{userProfile ? 'Update Profile' : 'Create Profile'}</h1>
        <Formik initialValues={initialValues} validationSchema={basicValidationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className='field'>
              <Field name='first_name' type='text' placeholder='First Name' className='form__field'/>
              <ErrorMessage name='first_name' component='p' className='error' />
            </div>
            <div className='field'>
              <Field name='last_name' type='text' placeholder='Last Name' className='form__field' />
              <ErrorMessage name='last_name' component='p' className='error' />
            </div>
            <div className='field'>
              <Field name='bio' as='textarea' placeholder='Tell more about yourself' className='form__field' id='textarea' />
              <ErrorMessage name='bio' component='p' className='error' />
            </div>
            <div className='field'>
              <Field name='profile_picture' type='file' placeholder='Select file' className='form__field' />
              <ErrorMessage name='profile_picture' component='p' className='error' />
            </div>
            <button type='submit' id='btn__cta' className='form__field'>
              {userProfile ? 'Update Profile' : 'Create Profile'}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
