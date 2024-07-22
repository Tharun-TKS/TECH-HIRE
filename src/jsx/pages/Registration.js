// src/components/Register.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo-full.png";
import { registerUser } from "../../services/AuthService"; // Import the registerUser function

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errors };

    if (formData.username === "") {
      errorObj.username = "Username is Required";
      error = true;
    }
    if (formData.email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (formData.password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (formData.role === "") {
      errorObj.role = "Role is Required";
      error = true;
    }
    setErrors(errorObj);

    if (error) return;

    try {
      await registerUser(formData, setErrors, navigate); // Pass navigate to registerUser
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (errorMessage) {
      console.error(errorMessage);
    }
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4">Sign up your account</h4>
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Username"
                        />
                        {errors.username && (
                          <div className="text-danger">{errors.username}</div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Email"
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Password"
                        />
                        {errors.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Role</strong>
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Seeker">Seeker</option>
                          <option value="Employer">Employer</option>
                        </select>
                        {errors.role && (
                          <div className="text-danger">{errors.role}</div>
                        )}
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
