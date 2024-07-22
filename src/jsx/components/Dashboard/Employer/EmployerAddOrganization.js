import React, { useState } from "react";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { addOrganization } from "../../../../services/OrganizationService";

const EmployerAddOrganization = () => {

  const user = useSelector((state) => state.auth.user);
  const employerId = user ? user.id : null;

  // Add data
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

  // Add Submit data
  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const AddOrganization = await addOrganization(
        employerId,
        addFormData
      );
      swal("Good job!", "Successfully Added", "success");
    } catch (error) {
      console.error("Error adding Organization:", error);
      swal("Oops", "An error occurred while adding the Organization.", "error");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">New Organization</h3>
      </div>    
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleAddFormSubmit}>
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">Company Name<span className="text-danger scale5 ms-2">*</span></label>
                    <input 
                      type="text" 
                      className="form-control solid" 
                      placeholder="Name" 
                      name="organizationname"
                      value={addFormData.organizationname}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">City<span className="text-danger scale5 ms-2">*</span></label>
                    <input 
                      type="text" 
                      className="form-control solid" 
                      placeholder="City" 
                      name="organizationcity"
                      value={addFormData.organizationcity}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">State<span className="text-danger scale5 ms-2">*</span></label>
                    <input 
                      type="text" 
                      className="form-control solid" 
                      placeholder="State" 
                      name="organizationstate"
                      value={addFormData.organizationstate}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div className="col-xl-12 mb-4">
                    <label className="form-label font-w600">Description<span className="text-danger scale5 ms-2">*</span></label>
                    <textarea 
                      className="form-control solid" 
                      rows="4" 
                      name="organizationdescription"
                      value={addFormData.organizationdescription}
                      onChange={handleAddFormChange}
                    ></textarea>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default EmployerAddOrganization;
