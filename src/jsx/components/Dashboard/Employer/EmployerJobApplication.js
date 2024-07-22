import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Nav, Tab, Dropdown } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { fetchAllJobPortals, deleteJobPortalEntryById} from "../../../../services/JobPortalService";
import { fetchJobs } from "../../../../services/JobService";
import { getOrganizationByEmployerId } from "../../../../services/OrganizationService";
import { fetchUserbyId } from "../../../../services/UserService";

const EmployerJobApplication = () => {
  const user = useSelector((state) => state.auth.user);
  const employerId = user ? user.id : null;

  //Modal box
  const [contacts, setContacts] = useState([]);
  const [jobs, setJobs] = useState({}); // State to store jobs by organization ID
  const [activeStatusFilter, setActiveStatusFilter] = useState("All Status");

  // const getJobs = async () => {
  //   try {
  //     // Fetch all jobs
  //     const jobsResponse = await fetchJobs();
  //     const allJobs = jobsResponse.data;
  
  //     // Fetch organizations by employer ID
  //     const organizationsResponse = await getOrganizationByEmployerId(employerId);
  //     const organizations = organizationsResponse.data;
  
  //     // Create a map of organization IDs to organization names
  //     const organizationIdToNameMap = {};
  //     organizations.forEach((org) => {
  //       organizationIdToNameMap[org.id] = org.organizationname;
  //     });
  
  //     // Filter and map jobs based on the organization ID
  //     const filteredJobs = allJobs
  //       .filter((job) => organizationIdToNameMap[job.organizationid])
  //       .map((job) => ({
  //         ...job,
  //         organizationName: organizationIdToNameMap[job.organizationid],
  //       }));
  
  //     setJobs(filteredJobs);
  
  //     // Extract job IDs from filtered jobs
  //     const jobIds = filteredJobs.map((job) => job.id);
  
  //     // Fetch all job portal data
  //     const jobPortalResponse = await fetchAllJobPortals();
  //     const allJobPortalData = jobPortalResponse.data;
  
  //     // Filter job portal data based on job IDs
  //     const filteredJobPortalData = allJobPortalData.filter((portalData) =>
  //       jobIds.includes(portalData.jobid)
  //     );
  //     setContacts(filteredJobPortalData);
  //     // Display or return the filtered job portal data
  //     console.log(filteredJobPortalData); // Adjust this line based on your requirements
  //   } catch (error) {
  //     console.error("Error fetching jobs or job portal data:", error);
  //   }
  // };
  


  
  // const getJobs = async () => {
  //   try {
  //     // Fetch all jobs
  //     const jobsResponse = await fetchJobs();
  //     const allJobs = jobsResponse.data;
  
  //     // Fetch organizations by employer ID
  //     const organizationsResponse = await getOrganizationByEmployerId(employerId);
  //     const organizations = organizationsResponse.data;
  
  //     // Create a map of organization IDs to organization details (name and city)
  //     const organizationIdToDetailsMap = {};
  //     organizations.forEach((org) => {
  //       organizationIdToDetailsMap[org.id] = {
  //         organizationName: org.organizationname,
  //         organizationCity: org.organizationcity, // Assuming organizationcity is part of organization data
  //       };
  //     });
  
  //     // Filter and map jobs based on the organization ID
  //     const filteredJobs = allJobs
  //       .filter((job) => organizationIdToDetailsMap[job.organizationid])
  //       .map((job) => ({
  //         ...job,
  //         ...organizationIdToDetailsMap[job.organizationid],
  //       }));
  
  //     setJobs(filteredJobs);
  
  //     // Extract job IDs from filtered jobs
  //     const jobIds = filteredJobs.map((job) => job.id);
  
  //     // Fetch all job portal data
  //     const jobPortalResponse = await fetchAllJobPortals();
  //     const allJobPortalData = jobPortalResponse.data;
  
  //     // Filter job portal data based on job IDs
  //     const filteredJobPortalData = allJobPortalData.filter((portalData) =>
  //       jobIds.includes(portalData.jobid)
  //     );
      
  //     // Here we can setContacts with the complete data, including organizationName and organizationCity
  //     const contactsWithData = filteredJobPortalData.map((portalData) => ({
  //       ...portalData,
  //       organizationName: filteredJobs.find((job) => job.id === portalData.jobid)?.organizationName || 'N/A',
  //       organizationCity: filteredJobs.find((job) => job.id === portalData.jobid)?.organizationCity || 'N/A',
  //     }));
      
  //     setContacts(contactsWithData);
      
  //     // Display or return the filtered job portal data
  //     console.log(contactsWithData); // Adjust this line based on your requirements
  //   } catch (error) {
  //     console.error("Error fetching jobs or job portal data:", error);
  //   }
  // };
  const getJobs = async () => {
    try {
      // Fetch all jobs
      const jobsResponse = await fetchJobs();
      const allJobs = jobsResponse.data;
  
      // Fetch organizations by employer ID
      const organizationsResponse = await getOrganizationByEmployerId(employerId);
      const organizations = organizationsResponse.data;
  
      // Create a map of organization IDs to organization details (name and city)
      const organizationIdToDetailsMap = {};
      organizations.forEach((org) => {
        organizationIdToDetailsMap[org.id] = {
          organizationName: org.organizationname,
          organizationCity: org.organizationcity, // Assuming organizationcity is part of organization data
        };
      });
  
      // Filter and map jobs based on the organization ID
      const filteredJobs = allJobs
        .filter((job) => organizationIdToDetailsMap[job.organizationid])
        .map((job) => ({
          ...job,
          ...organizationIdToDetailsMap[job.organizationid],
          jobPostingSubject: job.jobpostingsubject, // Assuming jobpostingsubject is part of job data
        }));
  
      setJobs(filteredJobs);
  
      // Fetch all job portal data
      const jobPortalResponse = await fetchAllJobPortals();
      const allJobPortalData = jobPortalResponse.data;
  
      // Filter job portal data based on job IDs
      const filteredJobPortalData = allJobPortalData.filter((portalData) =>
        filteredJobs.some((job) => job.id === portalData.jobid)
      );
  
      // Map seeker IDs to user details
      const contactsWithData = await Promise.all(filteredJobPortalData.map(async (portalData) => {
        // Fetch user details for each seeker ID
        const userResponse = await fetchUserbyId(portalData.seekerid);
        const user = userResponse.data;
  
        // Create contact data with merged user details
        return {
          ...portalData,
          organizationName: filteredJobs.find((job) => job.id === portalData.jobid)?.organizationName || 'N/A',
          organizationCity: filteredJobs.find((job) => job.id === portalData.jobid)?.organizationCity || 'N/A',
          jobPostingSubject: filteredJobs.find((job) => job.id === portalData.jobid)?.jobPostingSubject || 'N/A',
          seekerFullName: user.username || 'N/A', // Assuming fullname is part of user data
        };
      }));
  
      setContacts(contactsWithData);
  
      // Display or return the filtered job portal data
      console.log(contactsWithData); // Adjust this line based on your requirements
    } catch (error) {
      console.error("Error fetching jobs or job portal data:", error);
    }
  };
  
  useEffect(() => {
    if (employerId) {
      getJobs();
    }
  }, [employerId]);


  
 // Filter contacts based on the activeStatusFilter state
 const filteredContacts = contacts.filter((contact) => {
  if (activeStatusFilter === "All Status") {
    return true; // Show all contacts
  } else {
    return contact.jobportalstatus === activeStatusFilter; // Show contacts matching the selected status
  }
});



  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600  me-auto">Job Applications</h4>
      </div>
      <div className="d-sm-flex d-block justify-content-between align-items-center mb-4">
        <div className="card-action coin-tabs mt-3 mt-sm-0">
          <Nav as="ul" className="nav nav-tabs" role="tablist">
            <Nav.Item as="li" className="nav-item">
              <Nav.Link className={activeStatusFilter === "All Status" ? "active" : ""} eventKey="All Status" onClick={() => setActiveStatusFilter("All Status")}>All Status</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-item">
              <Nav.Link className={activeStatusFilter === "Pending" ? "active" : ""} eventKey="Pending" onClick={() => setActiveStatusFilter("Pending")}>Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-item">
              <Nav.Link className={activeStatusFilter === "On-Hold" ? "active" : ""} eventKey="On-Hold" onClick={() => setActiveStatusFilter("On-Hold")}>On-Hold</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-item">
              <Nav.Link className={activeStatusFilter === "Candidate" ? "active" : ""} eventKey="Candidate" onClick={() => setActiveStatusFilter("Candidate")}>Candidate</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="d-flex mt-sm-0 mt-3">
						<Dropdown className="default-select bgl-primary rounded" >
							<Dropdown.Toggle variant=""
								id="dropdown-basic"  as="div" className="btn btn-sm  text-primary d-flex align-items-center i-false" >
								{activeStatusFilter}
								<i className="fas fa-angle-down text-primary  ms-3"></i>
								
							</Dropdown.Toggle>
							<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
								<Dropdown.Item className="text-primary"  
									eventKey="AllStatus"
									onClick={() => setActiveStatusFilter("All Status")}>
									All Status
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="Pending"
									onClick={() => setActiveStatusFilter("Pending")}>
									Pending
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="On-Hold"
									onClick={() => setActiveStatusFilter("On-Hold")}>
									On-Hold
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="Candidate"
									onClick={() => setActiveStatusFilter("Candidate")}>
									Candidate
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
              <thead>
                <tr>
                  <th>Job Id</th>
                  <th>Organization Name</th>
                  <th>Organization Location</th>
                  <th>Subject</th>
                  <th>Candidate Name</th>
                  <th>Posted Date</th>
                  <th>Status</th>
                  <th className="action-buttons d-flex justify-content-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{contact.jobid}</td>
                    <td>
                    {contact.organizationName}
                    </td>
                    <td>
                    {contact.organizationCity}
                    </td>
                    <td>{contact.jobPostingSubject}</td>
                    <td>{contact.seekerFullName}</td>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-md-flex d-block align-items-center justify-content-between text-center  flex-wrap mt-md-0 mt-3">
          <div className="mb-md-0 mb-2">
            <h5 className="mb-0">Showing 1 to 7 of 7 entries</h5>
          </div>
          <nav>
            <ul className="pagination pagination-circle justify-content-center">
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link">
                  <i className="fa fa-angle-double-left" />
                </Link>
              </li>
              <li className="page-item active">
                <Link to={"#"} className="page-link">
                  1
                </Link>
              </li>
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link">
                  <i className="fa fa-angle-double-right" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default EmployerJobApplication;
