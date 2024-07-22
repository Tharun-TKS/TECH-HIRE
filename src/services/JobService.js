import axios from 'axios';
import swal from 'sweetalert';
import axiosInstance from "./AxiosInstance";

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${axiosInstance}/alljobsget`);
    return response.data; // Adjust according to your API response structure
   
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while fetching jobs.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};


///////fetch job by id //////
export const fetchJobById = async (id) => {
  try {
    const response = await axios.get(`${axiosInstance}/jobsgetbyid`, {
      headers: {
        'id': id,
      },
    });
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while fetching job details.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};

///////fetch job by organizationid //////
export const fetchJobByOrganizationId = async (id) => {
  try {
    const response = await axios.get(`${axiosInstance}/getjobsbyorganizationid`, {
      headers: {
        'organizationid': id,
      },
    });
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while fetching job details.";
    // swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};

///////update job by id //////
export const updateJobbyId = async (id, jobData) => {
  try {
    const response = await axios.put(`${axiosInstance}/jobsupdatebyid`, jobData, {
      headers: {
        'id': id,
      },
    });
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while updating the job.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};