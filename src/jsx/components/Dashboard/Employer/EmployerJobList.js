import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import {
  updateJobbyId,
  fetchJobs
} from "../../../../services/JobService";
import { getOrganizationByEmployerId } from "../../../../services/OrganizationService";

const EmployerJobList = () => {
  const user = useSelector((state) => state.auth.user);
  const employerId = user ? user.id : null;
  const [jobs, setJobs] = useState([]);
  // Edit start
  const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editJobId, setEditJobId] = useState(null);


  const getJobs = async () => {
    try {
      // Fetch all jobs
      const jobsResponse = await fetchJobs();
      const allJobs = jobsResponse.data;
  
      // Fetch organizations by employer ID
      const organizationsResponse = await getOrganizationByEmployerId(employerId);
      const organizations = organizationsResponse.data;
  
      // Create a map of organization IDs to organization names
      const organizationIdToNameMap = {};
      organizations.forEach((org) => {
        organizationIdToNameMap[org.id] = org.organizationname;
      });
  
      // Filter and map jobs based on the organization ID
      const filteredJobs = allJobs
        .filter((job) => organizationIdToNameMap[job.organizationid])
        .map((job) => ({
          ...job,
          organizationName: organizationIdToNameMap[job.organizationid],
        }));
  
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  
  
  
  

  useEffect(() => {
    if (employerId) {
      getJobs();
    }
  }, [employerId]);

  // Edit function button click to edit
  const handleEditClick = (event, job) => {
    event.preventDefault();
    setEditJobId(job.id);
    const formValues = {
      jobpostingsubject: job.jobpostingsubject,
      jobtype: job.jobtype,
      jobteachinglevel: job.jobteachinglevel,
      jobsalaryoffered: job.jobsalaryoffered,
      jobexperience: job.jobexperience,
      joblastdate: job.joblastdate,
      jobdescription: job.jobdescription,
      jobstatus: job.jobstatus,
    };
    setEditFormData(formValues);
    setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    jobpostingsubject: "",
    jobtype: "",
    jobteachinglevel: "",
    jobsalaryoffered: "",
    jobexperience: "",
    joblastdate: "",
    jobdescription: "",
    jobstatus: "",
  });

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedJob = await updateJobbyId(editJobId, editFormData);
      getJobs();
      setEditModal(false);
      swal("Good job!", "Successfully Updated", "success");
    } catch (error) {
      console.error("Error updating job:", error);
      swal("Oops", "An error occurred while updating the Job.", "error");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600 me-auto">Job List</h4>
        <div>
          <Modal className="modal fade" show={editModal} onHide={setEditModal}>
            <div role="document">
              <div>
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title fs-20">Update Job</h4>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setEditModal(false)}
                      data-dismiss="modal"
                    >
                      <span></span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <i
                      className="flaticon-cancel-12 close"
                      data-dismiss="modal"
                    ></i>
                    <div className="add-contact-box">
                      <div className="add-contact-content">
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Subject
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobpostingsubject"
                              required="required"
                              value={editFormData.jobpostingsubject}
                              onChange={handleEditFormChange}
                              placeholder="jobpostingsubject"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Job Type
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobtype"
                              required="required"
                              value={editFormData.jobtype}
                              onChange={handleEditFormChange}
                              placeholder="jobtype"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Teaching Level
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobteachinglevel"
                              required="required"
                              value={editFormData.jobteachinglevel}
                              onChange={handleEditFormChange}
                              placeholder="jobteachinglevel"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Salary offered
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobsalaryoffered"
                              required="required"
                              value={editFormData.jobsalaryoffered}
                              onChange={handleEditFormChange}
                              placeholder="jobsalaryoffered"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Experience
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobexperience"
                              required="required"
                              value={editFormData.jobexperience}
                              onChange={handleEditFormChange}
                              placeholder="jobexperience"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Description
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="jobdescription"
                              required="required"
                              value={editFormData.jobdescription}
                              onChange={handleEditFormChange}
                              placeholder="jobdescription"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Close Date
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="cdate"
                              required="required"
                              value={editFormData.joblastdate}
                              onChange={handleEditFormChange}
                              placeholder="cdate"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">Status</label>
                          <div className="contact-name">
                            <select
                              className="form-control"
                              name="jobstatus"
                              required="required"
                              value={editFormData.jobstatus}
                              onChange={handleEditFormChange}
                              placeholder="status"
                            >
                              <option value="">Select Status</option>
                              <option value="Active">Active</option>
                              <option value="InActive">InActive</option>
                            </select>
                            <span className="validation-text"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleEditFormSubmit}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModal(false)}
                      className="btn btn-danger"
                    >
                      {" "}
                      <i className="flaticon-delete-1"></i> Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            {jobs.length > 0 ? (
              <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Organization</th>
                    <th>Subject</th>
                    <th>Job Type</th>
                    <th>Teaching Level</th>
                    <th>Job Salary</th>
                    <th>Experience</th>
                    <th>Posted Date</th>
                    <th>Closing Date</th>
                    <th>Status</th>
                    <th className="action-buttons d-flex justify-content-start">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.organizationName}</td>
                      <td>{job.jobpostingsubject}</td>
                      <td>{job.jobtype}</td>
                      <td>{job.jobteachinglevel}</td>
                      <td>{job.jobsalaryoffered}</td>
                      <td>{job.jobexperience}</td>
                      <td>{job.jobpostdate}</td>
                      <td>{job.joblastdate}</td>
                      <td>
                        <span
                          className={`badge badge-lg light badge-${
                            job.jobstatus === "Active" ? "success" : "danger"
                          }`}
                        >
                          {job.jobstatus}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons d-flex justify-content-start">
                          <Link
                            to={`/employer-jobview/${job.id}`}
                            className="btn btn-success light mr-2"
                          >
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
                            onClick={(event) => handleEditClick(event, job)}
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <h5>No jobs found</h5>
              </div>
            )}
          </div>
        </div>
        {jobs.length > 0 && (
          <div className="d-md-flex d-block align-items-center justify-content-between text-center flex-wrap mt-md-0 mt-3">
            <div className="mb-md-0 mb-2">
              <h5 className="mb-0">Showing {jobs.length} entries</h5>
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
        )}
      </div>
    </>
  );
};

export default EmployerJobList;
