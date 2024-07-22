import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import { fetchJobById } from "../../../../services/JobService";
import { getOrganizationById } from "../../../../services/OrganizationService";
import { useSelector } from 'react-redux';

const EmployerjobView = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const user = useSelector(state => state.auth.user);
  const Seekerid = user ? user.id : null;


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jobResponse = await fetchJobById(id);
        const jobDetails = jobResponse.data;
        setJobDetails(jobDetails);

        if (jobDetails.organizationid) {
          const organizationResponse = await getOrganizationById(
            jobDetails.organizationid
          );
          const organizationDetails = organizationResponse.data;
          setOrganizationDetails(organizationDetails);
        }
      } catch (err) {
        setError("Error fetching job or organization details.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching job or organization details!",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);


  const handleApply = async () => {
    try {
      const formData = {
        jobId: jobDetails.id,
        seekerId: Seekerid, // Replace with the actual seeker ID
        jobPortalStatus: 'Applied', // Example status
      };
      // await createJobPortalEntry(formData, setFormErrors, navigate);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };




  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h3 className="mb-0 me-auto">Employer Job-View</h3>
      </div>
      <div className="row">
        <div className="col-xl-3 col-xxl-4">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="fs-20 mb-0">Overview</h4>
                </div>
                <div className="card-body pt-4">
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">Job Title:</h5>
                    <span>{jobDetails.jobpostingsubject}</span>
                  </div>
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">Job Experience:</h5>
                    <span>{jobDetails.jobexperience}</span>
                  </div>
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">Job Type:</h5>
                    <span>{jobDetails.jobtype}</span>
                  </div>
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">Posted Date:</h5>
                    <span>{jobDetails.jobpostdate}</span>
                  </div>
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">Closed Date:</h5>
                    <span>{jobDetails.joblastdate}</span>
                  </div>
                  <div className="mb-3 d-flex">
                    <h5 className="mb-1 fs-14 custom-label">
                      {" "}
                      Last Apply Date:
                    </h5>
                    <span>{jobDetails.joblastdate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-xxl-8">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-block">
                  <h4 className="fs-20 d-block">
                    <Link className="text-black" to={"#"}>
                      PHP Developer
                    </Link>
                  </h4>
                  <div className="d-block">
                    <span className="me-2">
                      <Link to={"#"}>
                        <i className="text-primary fas fa-briefcase me-2"></i>
                        {organizationDetails.organizationname}
                      </Link>
                    </span>
                    <span className="me-2">
                      <Link to={"#"}>
                        <i className="text-primary fas fa-map-marker-alt me-2"></i>
                        {organizationDetails.organizationcity}
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="card-body pb-0">
                  <h4 className="fs-20 mb-3">Description</h4>
                  <div className="ms-2">
                    <p>
                      <i className="text-primary fas fa-dot-circle me-2"></i>
                      {jobDetails.jobdescription}{" "}
                    </p>
                  </div>
                  <hr />
                  <h4 className="fs-20 mb-3">Job Details</h4>
                  <div className="row mb-3">
                    <div className="col-xl-6">
                      <div className="ms-2">
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Job Subject :</span>
                          <span className="font-w400">
                            {jobDetails.jobpostingsubject}
                          </span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Role:</span>
                          <span className="font-w400">
                            {" "}
                            {jobDetails.jobtype}
                          </span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Min Salary:</span>
                          <span className="font-w400">
                            {jobDetails.jobsalaryoffered}
                          </span>
                        </p>

                        <p className="font-w500 mb-3">
                          <span className="custom-label">Teaching Level:</span>
                          <span className="font-w400">
                            {" "}
                            {jobDetails.jobteachinglevel}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="ms-4">
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Job Experience:</span>
                          <span className="font-w400">
                            {jobDetails.jobexperience}
                          </span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Launges:</span>
                          <span className="font-w400">Hindi, English</span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Locality:</span>
                          <span className="font-w400">
                            {organizationDetails.organizationcity}
                          </span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Eligibility:</span>
                          <span className="font-w400">B.tech</span>
                        </p>
                        <p className="font-w500 mb-3">
                          <span className="custom-label">Organization:</span>
                          <span className="font-w400">
                            {" "}
                            {organizationDetails.organizationname}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-bottom border-top flex-wrap">
                    <span>Job ID: #{jobDetails.id}</span>
                    <span>
                      Posted By{" "}
                      <strong>{organizationDetails.organizationname}</strong>/
                      {jobDetails.jobpostdate}
                    </span>
                  </div>
                </div>
                <div className="card-footer border-0">
                  <div>
                    <Link to={"#"} className="btn btn-warning btn-sm me-2 mb-3">
                      <i className="fas fa-share-alt me-2"></i>Share Job
                    </Link>
                    <Link to={"#"} className="btn btn-secondary btn-sm mb-3">
                      <i className="fas fa-print me-2"></i>Print
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployerjobView;
