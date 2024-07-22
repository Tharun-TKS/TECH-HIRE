import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import {
  fetchOrganizations,
  updateOrganizationById,
  deleteOrganizationById,
  getOrganizationById,
} from "../../../../services/OrganizationService"; // Import the service functions

const OrganizationsList = () => {
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchOrganizations();
      setContacts(data.data || []); // Assume data is an array of organizations
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete data
  const handleDeleteClick = async (contactId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this organization!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteOrganizationById(contactId);
          const newContacts = contacts.filter(
            (contact) => contact.id !== contactId
          );
          setContacts(newContacts);
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

  // Edit start
  const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editContactId, setEditContactId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      organizationname: contact.organizationname,
      organizationcity: contact.organizationcity,
      organizationstate: contact.organizationstate,
      organizationdescription: contact.organizationdescription,
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
        editContactId,
        editFormData
      );
      fetchData();
      setEditModal(false);
      swal("Good job!", "Successfully Updated", "success");
    } catch (error) {
      console.error("Error updating organization:", error);
      swal(
        "Oops",
        "An error occurred while updating the organization.",
        "error"
      );
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600 me-auto">Organization List</h4>
        <div>
          <Modal
            className="modal fade"
            show={editModal}
            onHide={() => setEditModal(false)}
          >
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
                              autoComplete="off"
                              name="organizationname"
                              required="required"
                              value={editFormData.organizationname}
                              onChange={handleEditFormChange}
                              placeholder="organizationname"
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
                              autoComplete="off"
                              name="organizationcity"
                              required="required"
                              value={editFormData.organizationcity}
                              onChange={handleEditFormChange}
                              placeholder="organizationcity"
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
                              autoComplete="off"
                              name="organizationstate"
                              required="required"
                              value={editFormData.organizationstate}
                              onChange={handleEditFormChange}
                              placeholder="organizationstate"
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
                              autoComplete="off"
                              name="organizationdescription"
                              required="required"
                              value={editFormData.organizationdescription}
                              onChange={handleEditFormChange}
                              placeholder="organizationdescription"
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
                  <th>Registered Date</th>
                  <th className="action-buttons d-flex justify-content-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.organizationname}</td>
                    <td>{contact.organizationcity}</td>
                    <td className="wspace-no">{contact.organizationstate}</td>
                    <td>{contact.organizationregistereddate}</td>
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
        <div className="d-md-flex d-block align-items-center justify-content-between text-center flex-wrap mt-md-0 mt-3">
          <div className="mb-md-0 mb-2">
            <h5 className="mb-0">
              Showing {contacts.length} of {contacts.length} entries
            </h5>
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
export default OrganizationsList;
