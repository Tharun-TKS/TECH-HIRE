import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import {
  getJobPortalEntriesBySeekerId,
  deleteJobPortalEntryById,
} from "../../../../services/JobPortalService";
import { fetchJobById } from "../../../../services/JobService";
import { getOrganizationById } from "../../../../services/OrganizationService";

const SeekerJobApplication = () => {
  const user = useSelector((state) => state.auth.user);
  const seekerId = user ? user.id : null;

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [jobIdFilter, setJobIdFilter] = useState("");
  const [organizationNameFilter, setOrganizationNameFilter] = useState("");
  const [organizationLocationFilter, setOrganizationLocationFilter] = useState("");

  useEffect(() => {
    const fetchJobPortalEntries = async () => {
      try {
        if (seekerId) {
          const data = await getJobPortalEntriesBySeekerId(seekerId);
          const jobPortalData = data.data || [];

          const updatedContacts = await Promise.all(
            jobPortalData.map(async (contact) => {
              if (contact.jobid) {
                const jobResponse = await fetchJobById(contact.jobid);
                const jobDetails = jobResponse.data;
                const organizationResponse = await getOrganizationById(
                  jobDetails.organizationid
                );
                const organizationDetails = organizationResponse.data;

                return {
                  ...contact,
                  jobDetails,
                  organizationDetails,
                };
              }
              return contact;
            })
          );

          setContacts(updatedContacts);
          setFilteredContacts(updatedContacts); // Initialize filtered contacts with all data
        }
      } catch (error) {
        console.error("Error fetching job portal entries:", error);
        // Handle error as needed
      }
    };

    fetchJobPortalEntries();
  }, [seekerId]);
  

  useEffect(() => {
    individualfilter();
  }, [jobIdFilter, organizationNameFilter, organizationLocationFilter]);


  const handleSearchInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);
    filterContacts(value);
    // individualfilter(value)
  };


  const handleJobIdFilterChange = (event) => {
    setJobIdFilter(event.target.value.toLowerCase());
  };

  const handleOrganizationNameFilterChange = (event) => {
    setOrganizationNameFilter(event.target.value.toLowerCase());
  };

  const handleOrganizationLocationFilterChange = (event) => {
    setOrganizationLocationFilter(event.target.value.toLowerCase());
  };


  const individualfilter = () => {
    const filtered = contacts.filter(
      (contact) =>
        (!jobIdFilter || (contact.jobid && contact.jobid.toString().toLowerCase().includes(jobIdFilter))) &&
        (!organizationNameFilter || (contact.organizationDetails?.organizationname && contact.organizationDetails?.organizationname.toLowerCase().includes(organizationNameFilter))) &&
        (!organizationLocationFilter || (contact.organizationDetails?.organizationcity && contact.organizationDetails?.organizationcity.toLowerCase().includes(organizationLocationFilter)))
    );
    setFilteredContacts(filtered);
  };



  const handleDeleteClick = async (contactId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this jobportal!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteJobPortalEntryById(contactId);
          const newContacts = contacts.filter(
            (contact) => contact.id !== contactId
          );
          setContacts(newContacts);
          setFilteredContacts(newContacts); // Update filtered contacts after deletion
          swal("Deleted!", "The organization has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting organization:", error);
          swal(
            "Oops",
            "An error occurred while deleting the organization.",
            "error"
          );
        }
      } else {
        swal("Your organization is safe!");
      }
    });
  };


  const filterContacts = (input) => {
    const filtered = contacts.filter(
      (contact) =>

        (contact.organizationDetails?.organizationname && contact.organizationDetails?.organizationname.toLowerCase().includes(input)) ||
        (contact.organizationDetails?.organizationcity && contact.organizationDetails?.organizationcity.toLowerCase().includes(input)) ||
        (contact.jobportalstatus && contact.jobportalstatus.toLowerCase().includes(input)) ||
        (contact.jobid &&
          contact.jobid.toString().toLowerCase().includes(input))
    );
    setFilteredContacts(filtered);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    // Your edit logic here
  };


  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600  me-auto">Job List</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
              <thead>
                <tr>
                <th>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Filter Job Id"
                      value={jobIdFilter}
                      onChange={handleJobIdFilterChange}
                    />
                    Job Id
                  </th>
                  <th>  <input
                      type="text"
                      className="form-control"
                      placeholder="Filter Organization Name"
                      value={organizationNameFilter}
                      onChange={handleOrganizationNameFilterChange}
                    />Organization Name
                 
                  </th>
                  <th>  <input
                      type="text"
                      className="form-control"
                      placeholder="Filter Organization Location"
                      value={organizationLocationFilter}
                      onChange={handleOrganizationLocationFilterChange}
                    />Organization Location
                
                  </th>
                  <th>Posted Date</th>
                  <th>Status</th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.jobid}</td>
                    <td>
                      {contact.organizationDetails?.organizationname || "N/A"}
                    </td>
                    <td>
                      {contact.organizationDetails?.organizationcity || "N/A"}
                    </td>
                    <td className="wspace-no">{contact.jobapplieddate}</td>
                    <td>
                      <span
                        className={`badge badge-lg light badge-${
                          contact.jobportalstatus === "Applied"
                            ? "success"
                            : contact.jobportalstatus === "Rejected"
                            ? "danger"
                            : contact.jobportalstatus === "Pending"
                            ? "warning"
                            : ""
                        }`}
                      >
                        {contact.jobportalstatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons d-flex justify-content-start">
                        <Link to={"#"} className="btn btn-success light mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg-main-icon"
                            width="24px"
                            height="24px"
                            viewBox="0 0 32 32"
                            x="0px"
                            y="0px"
                          >
                            <g data-name="Layer 21">
                              <path
                                d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z"
                                fill="#000000"
                                fillRule="nonzero"
                              ></path>
                              <circle
                                cx="16"
                                cy="16"
                                r="3"
                                fill="#000000"
                                fillRule="nonzero"
                              ></circle>
                            </g>
                          </svg>
                        </Link>
                        <Link
                          to={"#"}
                          className="btn btn-secondary light mr-2"
                          onClick={(event) => handleEditClick(event, contact)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            className="svg-main-icon"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <path
                                d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z"
                                fill="#000000"
                                fillRule="nonzero"
                                transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "
                              ></path>
                              <rect
                                fill="#000000"
                                opacity="0.3"
                                x="5"
                                y="20"
                                width="15"
                                height="2"
                                rx="1"
                              ></rect>
                            </g>
                          </svg>
                        </Link>
                        <Link
                          to={"#"}
                          className="btn btn-danger light"
                          onClick={() => handleDeleteClick(contact.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            className="svg-main-icon"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <path
                                d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                                fill="#000000"
                                fillRule="nonzero"
                              ></path>
                              <path
                                d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default SeekerJobApplication;







