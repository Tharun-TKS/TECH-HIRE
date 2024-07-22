// src/services/authServices.js

import axios from "axios";
import swal from "sweetalert";
import axiosInstance from "./AxiosInstance";
import { login } from "../store/actions/AuthActions";

export const registerUser = async (formData, setErrors, navigate) => {
  // Hook must be used inside a component
    try {
      const response = await axios.post(`${axiosInstance}/register`, formData);
      swal("Success", "Your account has been created successfully!", "success");
      navigate("/"); // Navigate after successful registration
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      swal("Error", errorMessage, "error");
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...error.response?.data?.errors // assuming the server responds with field-specific errors
      }));
      throw new Error(errorMessage);
    }
  };

  export const loginUser = async (formData, setErrors, dispatch, navigate) => {
  try {
    const response = await axios.post(`${axiosInstance}/login`, formData);
    swal("Success", response.data.message, "success");
    dispatch(login(response.data.data));
    navigate("/dashboard");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred during login.";
    swal("Error", errorMessage, "error");
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...error.response?.data?.errors // assuming the server responds with field-specific errors
    }));
    throw new Error(errorMessage);
  }
};
