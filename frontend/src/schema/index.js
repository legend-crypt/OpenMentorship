import * as Yup from 'yup';

const ValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    role: Yup.string().oneOf(['mentee', 'mentor'], 'Invalid Role').required('Required'),
    firstName: Yup.string().max(50, 'Must less than 50 characters').required('Required'),
    lastName: Yup.string().max(50, 'Must be less than 50 charactres').required('Required'),
    bio: Yup.string().max(300, 'Must be 300 characters or less'),
    image: Yup.mixed().required('File is required'),

})


export default ValidationSchema;

