import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../css/style.css';
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios'
import * as Yup from 'yup';
import { toast } from 'react-toastify';


export default function Verification() {

    const [userEmail, setUserEmail] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    setUserEmail(email)
    }, [userEmail]);

    const handleSubmit = async (values) => {
    await axios.post('accounts/verify-email/', {otp: values.otp, email: userEmail})
    .then((response) => {
        if (response.status === 200) {
            toast.success('Email verified successfully');
            navigate('/signIn')
            }
        else {
            toast.error(response.data.error);
        }
        })
    .catch((error) => {
        toast.error(error.message);
    }) 
    };

    const handleClick = async () => {
        await axios.post('accounts/send-verification-email/', {email: userEmail})
        .then((response) => {
            if (response.status === 201) {
                alert(response.data.detail);
                }
            else {
                alert(response.data.error);
            }
            })
        .catch((error) => {
        alert(error.response.data);
        })
    }

    const ValidationSchema = Yup.object({
        otp: Yup.string().required('Required'),
    });

    const initialValues = {
        otp: '',
    };



    return (


    <div className='form__contanier'>
        <div className="form">
        
        <h1 className='form__head--text'>Create an Account</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >{ ({ isSubmitting, isValid }) => (
            <Form>
            <div className='field'>
                <Field name='otp' type='text' placeholder='Enter Verification Code' className='form__field' />
                <ErrorMessage name='otp' component='p' className='error' />
            </div>
            <button type='submit' id='btn__cta' className='form__field' disabled={isSubmitting || !isValid}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <p>Didn't receive the Verification OTP <span className='otp' onClick={handleClick}>Resend OTP</span></p>
            </Form>
        )}
        </Formik>
        </div>
    </div>
    );
    }
