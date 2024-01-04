// basicValidationSchema.js
import * as Yup from 'yup';

const basicValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(4, 'Must be 6 characters or more').required('Required'),
  role: Yup.string().oneOf(['Mentee', 'Mentor'], 'Invalid Role').required('Required'),
});

export default basicValidationSchema;
