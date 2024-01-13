import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersUrl } from "../utils/constant";
import Loader from "./loader/Loader";
import "../styles/style.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otherError, setOtherError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = props;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const validateForm = () => {
    let isValid = true;
  
    switch (true) {
      case !email:
        setEmailError("Email field cannot be empty");
        isValid = false;
        break;
      case !email.includes("@"):
        setEmailError("Invalid email address");
        isValid = false;
        break;
      default:
        setEmailError("");
        break;
    }
  
    switch (true) {
      case !password:
        setPasswordError("Password field cannot be empty");
        isValid = false;
        break;
      default:
        setPasswordError("");
        break;
    }
  
    return isValid;
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);

      fetch(`${usersUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response.json();
        })
        .then((data) => {
          updateUser(data);
          navigate("/");
        })
        .catch((errorPromise) => {
          errorPromise.then((errorObj) => {
            setOtherError(errorObj.message);
        });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            className="input-field"
          />
          <span className="error">{emailError}</span>
          <span className="error">{otherError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleInputChange}
            className="input-field"
          />
          <span className="error">{passwordError}</span>
        </div>

        <button type="submit" className="btn-2">
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <Link to="/signup" className="accent">
          {" "}
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
