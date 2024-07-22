import axios from 'axios';
import swal from 'sweetalert';
import axiosInstance from "./AxiosInstance";



// Function to fetch placements by seeker ID
export const fetchPlacementsBySeekerId = async (seekerId) => {
    try {
        const response = await axios.get(`${axiosInstance}/placementsbyseekerid`, {
        headers: {
          'seekerid': seekerId
        }
      });
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching the placements.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };