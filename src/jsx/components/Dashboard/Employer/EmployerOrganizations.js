import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import {
  getOrganizationByEmployerId,
  updateOrganizationById,
  deleteOrganizationById,
  addOrganization,
} from "../../../../services/OrganizationService";

const EmployerOrganizations = () => {
  //Modal box
  const [addCard, setAddCard] = useState(false);

  const [organizations, setOrganizations] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const employerId = user ? user.id : null;

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = () => {
    getOrganizationByEmployerId(employerId)
      .then((data) => {
        setOrganizations(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // delete data
  const handleDeleteClick = async (organizationId) => {
    try {
      const confirmDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Organization!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (confirmDelete) {
        await deleteOrganizationById(organizationId);
        // Update UI after deletion
        const updatedOrganizations = organizations.filter(organization => organization.id !== organizationId);
        setOrganizations(updatedOrganizations);
        swal("Success", "Organization deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //Add data
  const [addFormData, setAddFormData] = useState({
    organizationname: "",
    organizationcity: "",
    organizationstate: "",
    organizationdescription: "",
  });

  // Add organization function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  //Add Submit data
  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const AddOrganization = await addOrganization(
        employerId,
        addFormData
      );
      fetchOrganizations();
      setAddCard(false);
      swal("Good job!", "Successfully Added", "success");
    } catch (error) {
      console.error("Error adding Organization:", error);
      swal("Oops", "An error occurred while updating the Organization.", "error");
    }
  };

  //Edit start
  const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editOrganizationId, setEditOrganizationId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, organization) => {
    event.preventDefault();
    setEditOrganizationId(organization.id);
    const formValues = {
      organizationname: organization.organizationname,
      organizationcity: organization.organizationcity,
      organizationstate: organization.organizationstate,
      organizationdescription: organization.organizationdescription,
    };
    setEditFormData(formValues);
    setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    organizationname: "",
    organizationcity: "",
    organizationstate: "",
    organizationdescription: "",
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

  // edit form data submit
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedOrganization = await updateOrganizationById(
        editOrganizationId,
        editFormData
      );
      fetchOrganizations();
      setEditModal(false);
      swal("Good job!", "Successfully Updated", "success");
    } catch (error) {
      console.error("Error updating Organization:", error);
      swal("Oops", "An error occurred while updating the Organization.", "error");
    }
  };
  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600  me-auto">Organization List</h4>
        <div>
          <Link
            to={"#"}
            className="btn btn-primary me-3 btn-sm"
            onClick={() => setAddCard(true)}
          >
            <i className="fas fa-plus me-2"></i>Add New Organization
          </Link>
          <Modal className="modal fade" show={addCard} onHide={setAddCard}>
            <div role="document">
              <div className="">
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title fs-20">Add New Organization</h4>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setAddCard(false)}
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
                            Organization Name
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationname"
                              required="required"
                              onChange={handleAddFormChange}
                              placeholder="Organization Name"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">Organization City</label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationcity"
                              required="required"
                              onChange={handleAddFormChange}
                              placeholder="Organization City"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                          Organization State
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationstate"
                              required="required"
                              onChange={handleAddFormChange}
                              placeholder="Organization State"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                          Organization Description
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationdescription"
                              required="required"
                              onChange={handleAddFormChange}
                              placeholder="Organization Description"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleAddFormSubmit}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddCard(false)}
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
          <Modal className="modal fade" show={editModal} onHide={setEditModal}>
            <div role="document">
              <div>
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title fs-20">Update Organization</h4>
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
                            Organization Name
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationname"
                              required="required"
                              value={editFormData.organizationname}
                              onChange={handleEditFormChange}
                              placeholder="Organization Name"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Organization City
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationcity"
                              required="required"
                              value={editFormData.organizationcity}
                              onChange={handleEditFormChange}
                              placeholder="Organization City"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Organization State
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationstate"
                              required="required"
                              value={editFormData.organizationstate}
                              onChange={handleEditFormChange}
                              placeholder="Organization State"
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="text-black font-w500">
                            Organization Description
                          </label>
                          <div className="contact-name">
                            <input
                              type="text"
                              className="form-control"
                              autocomplete="off"
                              name="organizationdescription"
                              required="required"
                              value={editFormData.organizationdescription}
                              onChange={handleEditFormChange}
                              placeholder="Organization Description"
                            />
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
            <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>registered Date</th>
                  <th>Description</th>
                  <th className="action-buttons d-flex justify-content-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((organization, index) => (
                  <tr key={index}>
                    <td>{organization.id}</td>
                    <td>{organization.organizationname}</td>
                    <td>{organization.organizationcity}</td>
                    <td>{organization.organizationstate}</td>
                    <td>{organization.organizationregistereddate}</td>
                    <td>{organization.organizationdescription}</td>
                    <td>
                      <div className="action-buttons d-flex justify-content-end">
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
                          onClick={(event) =>
                            handleEditClick(event, organization)
                          }
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
                          onClick={() => handleDeleteClick(organization.id)}
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
export default EmployerOrganizations;
