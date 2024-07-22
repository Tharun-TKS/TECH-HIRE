import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { fetchUsers, deleteUser } from '../../../../services/UserService';

const Userslist = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch users from API
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setContacts(users.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  // Delete user function
  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (confirmDelete) {
        await deleteUser(userId);
        // Update UI after deletion
        const updatedContacts = contacts.filter(contact => contact.id !== userId);
        setContacts(updatedContacts);
        swal("Success", "User deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600 me-auto">Users List</h4>
        <div></div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
              <thead>
                <tr>
                  <th>No</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered Date</th>
                  <th className="action-buttons d-flex justify-content-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.username}</td>
                    <td>{contact.email}</td>
                    <td>{contact.role}</td>
                    <td>{contact.registrationdate}</td>
                    <td>
                      <div className="action-buttons d-flex justify-content-start">
                        <Link to={`/user-viewprofile/${contact.id}`} className="btn btn-success light mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="svg-main-icon" width="24px" height="24px" viewBox="0 0 32 32" x="0px" y="0px"><g data-name="Layer 21"><path d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z" fill="#000000" fillRule="nonzero"></path><circle cx="16" cy="16" r="3" fill="#000000" fillRule="nonzero"></circle></g></svg>
                        </Link>
                        <button className="btn btn-danger light" onClick={() => handleDeleteUser(contact.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero"></path>
                              <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-md-flex d-block align-items-center justify-content-between text-center flex-wrap mt-md-0 mt-3">
          <div className='mb-md-0 mb-2'>
            <h5 className="mb-0">Showing {contacts.length} entries</h5>
          </div>
          <nav>
            <ul className="pagination pagination-circle justify-content-center">
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link">
                  <i className='fa fa-angle-double-left' />
                </Link>
              </li>
              <li className="page-item active"><Link to={"#"} className="page-link">1</Link></li>
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link">
                  <i className='fa fa-angle-double-right' />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Userslist;
