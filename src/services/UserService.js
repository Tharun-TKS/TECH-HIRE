
import axios from 'axios';
import swal from 'sweetalert';
import axiosInstance from "./AxiosInstance";



export const fetchUsers = async () => {
    try {
      const response = await axios.get(`${axiosInstance}/getallusers`);
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching users.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  export const deleteUser = async (userId) => {
    try {
      const config = {
        headers: {
          id: userId // Pass user ID in headers
        }
      };
      const response = await axios.delete(`${axiosInstance}/idbydeleteuser`, config);
      swal("Success", "User deleted successfully", "success");
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the user.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  export const fetchUserbyId = async (userId) => {
    try {
      const config = {
        headers: {
          id: userId // Pass user ID in headers if needed
        }
      };
      const response = await axios.get(`${axiosInstance}/getuserbyid`, config);
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching users.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };
  