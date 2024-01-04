import axios from 'axios';

const handleSubmit = async (values, { setSubmitting }) => {
  try {
    console.log('Submitting:', values);
    setSubmitting(true);
    const response = await axios.post('http://localhost:8000/api/accounts/create/', values);
    console.log('User registered:', response.data);
  } catch (error) {
    console.error('Failed to register user:', error.response.data);
    // You might want to use a state variable to manage the error message
  } finally {
    setSubmitting(false);
  }
};

export default handleSubmit;
