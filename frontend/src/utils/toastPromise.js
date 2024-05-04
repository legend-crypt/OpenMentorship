import { toast } from 'react-toastify';

const toastPromise = (promise, options) => {
    return toast.promise(promise, options);
}

export default toastPromise;
