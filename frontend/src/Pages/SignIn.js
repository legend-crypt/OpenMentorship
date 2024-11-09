import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../css/style.css";
import { Link, useNavigate } from "react-router-dom";
import initialValues from "../schema/initialValues";
import axios from "../utils/axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userAuth/userAuthSlice";
import { setUserRole } from "../store/slices/userRole/UserRoleSlice";
import "../css/signIn.css";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(4, "Must be 6 characters or more")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    let isPending = true;
    axios
      .post("login/", values)
      .then((response) => {
        isPending = false;
        if (response.status === 200) {
          toast.success("Login Successful");
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data.token.access)
          );
          dispatch(setUserRole(response.data.user.role));
          // change user login status
          if (!response.data.user.profile) {
            // if user does not have a profile then redirect to
            dispatch(
              loginUser({
                isProfileFound: false,
                userDetails: response.data.user,
              })
            );
            navigate("/profile");
          } else {
            dispatch(
              loginUser({
                isProfileFound: true,
                userDetails: response.data.user,
              })
            );
            navigate("/");
          }
        } else {
          toast.error("Something went wrong try again");
        }
      })
      .catch((error) => {
        isPending = false;
        toast.error(
          error.response ? error.response.data.error : "Network Error"
        );
      });
    setTimeout(() => {
      if (isPending) {
        toast.warning(
          "The server is taking longer to respond. Please check your internet connection."
        );
      }
    }, 10000);
  };

  return (
    <div className="min-h-screen pt-28">
      <div className="form">
        <div>
          <h1 className="form__head--text">Welcome Back</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={basicValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="field">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form__field"
                />
                <ErrorMessage name="email" component="p" className="error" />
              </div>
              <div className="field">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form__field"
                />
                <ErrorMessage name="password" component="p" className="error" />
              </div>
              <button type="submit" id="btn__cta" className="form__field">
                Log In
              </button>
              {/* <div className="field" style={{ textAlign: 'center', backgroundColor: '#4285f4',  margin:'7px', padding: '1px' }}>
                <p className="continue-with">
                  Continue with&nbsp;
                  <img src={google} className="oauth-svg" alt="Google" />
                </p>
              </div> */}
              <p>
                Don't have an account?{" "}
                <Link className="text-blue-600" to="/signUp">
                  Signup
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
