import axios from 'axios';
import swal from 'sweetalert';
import axiosInstance from "./AxiosInstance";

export const createJobPortalEntry = async (formData, setErrors,navigate) => {
    try {
        const response = await axios.post(`${axiosInstance}/postjobportal`, {
        jobportalstatus: formData.jobPortalStatus,
      }, {
        headers: {
          'jobid': formData.jobId,
          'seekerid': formData.seekerId,
        },
      });
      swal("Success", "Job portal entry created successfully!", "success");
      navigate('/seeker-jobapplication')
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the job portal entry.';
      swal("Error", errorMessage, "error");
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...error.response?.data?.errors // assuming the server responds with field-specific errors
      }));
      throw new Error(errorMessage);
    }
  };



  // Function to fetch all job portal entries
export const fetchAllJobPortals = async () => {
    try {
      const response = await axios.get(`${axiosInstance}/getjobprotalall`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching job portals.';
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  // Function to get job portal entries by seeker ID
export const getJobPortalEntriesBySeekerId = async (seekerId) => {
    try {
        const response = await axios.get(`${axiosInstance}/getjobprotalbyseekerid`, {
        headers: {
          'seekerid': seekerId,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching job portal entries.';
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  // Function to get job portal entry by job ID
export const fetchJobPortalByJobId = async (jobId) => {
  try {
    const response = await axios.get(`${axiosInstance}/getjobportalbyjobid`, {
      headers: {
        'id': jobId,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching job portal entries by job ID.';
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};



export const deleteJobPortalEntryById = async (id) => {
  try {
    const response = await axios.delete(
      `${axiosInstance}/idbydeleteorganization`,
      { headers: { 'id': id } }
    );
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while deleting the organization.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};