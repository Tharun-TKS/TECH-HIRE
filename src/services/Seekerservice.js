import axios from "axios";
import swal from "sweetalert";
import axiosInstance from "./AxiosInstance";

export const getSeekerById = async (seekerId) => {
  try {
    const config = {
      headers: {
        seekerid: seekerId, // Pass user ID in headers if needed
      },
    };
    const response = await axios.get(`${axiosInstance}/getbyseekerid`, config);
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while fetching Seeker information.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};
