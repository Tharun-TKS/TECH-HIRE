import axios from "axios";
import swal from "sweetalert";
import axiosInstance from "./AxiosInstance";

export const getEmployerById = async (employerId) => {
  try {
    const config = {
      headers: {
        employeid: employerId, // Pass user ID in headers if needed
      },
    };
    const response = await axios.get(
      `${axiosInstance}/getbyemployerid`,
      config
    );
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while fetching employer information.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};
