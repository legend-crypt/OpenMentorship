import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/images/google.svg";
import basicValidationSchema from "../schema/basicValidationSchema";
import "../css/style.css";
import "../css/signup.css";
import { toast } from "react-toastify";
import axios from "../utils/axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await axios.post("accounts/create/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("You have successfully registered");
        navigate("/verification");
      } else {
        // const data = await response.json();
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-28">
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
              <option value="" disabled hidden style={{ color: "grey" }}>
                Select a Role
              </option>
              <option value="Mentee">Mentee</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>
          <button type="submit" id="btn__cta" className="form__field">
            Signup
          </button>
        </form>
        {/* <div className="field" style={{ textAlign: 'center', backgroundColor: '#4285f4',  margin:'3px' }}>
          <p className="continue-with">
            Continue with&nbsp;
            <img src={google} className="oauth-svg" alt="Google" />
          </p>
        </div> */}

        <p>
          Already have an account?{" "}
          <Link className="text-blue-600" to="/signIn">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
