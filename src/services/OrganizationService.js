
import axios from 'axios';
import swal from 'sweetalert';
import axiosInstance from "./AxiosInstance";


export const addOrganization = async (employerId, organizationData) => {
  try {
    const response = await axios.post(
      `${axiosInstance}/postorganization`,
      organizationData,
      { headers: { 'employeid': employerId } }
    );
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while adding the organization.";
    swal("Error", errorMessage, "error");
    throw new Error(errorMessage);
  }
};


export const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`${axiosInstance}/AllOrganizationsget`);
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching organizations.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  export const getOrganizationById = async (id) => {
    try {
      const response = await axios.get(
        `${axiosInstance}/organizationgetbyid`,
        { headers: { 'id': id } }
      );
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching the organization.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };

  export const getOrganizationByEmployerId = async (id) => {
    try {
      const response = await axios.get(
        `${axiosInstance}/getorganizationbyid`,
        { headers: { 'employeid': id } }
      );
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching the organization.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };
  
  

  export const updateOrganizationById = async (id, updateData) => {
    try {
      const response = await axios.put(
        `${axiosInstance}/organizationupdatebyid`,
        updateData,
        { headers: { 'id': id } }
      );
      return response.data; // Adjust according to your API response structure
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while updating the organization.";
      swal("Error", errorMessage, "error");
      throw new Error(errorMessage);
    }
  };


  export const deleteOrganizationById = async (id) => {
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
  
  