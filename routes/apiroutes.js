const express = require("express");
const { registerValidation } = require("../middleware/validation");
const router = express.Router();
const {
  register,
  login,
  resetpassword,
} = require("../controllers/authcontroller");
const {
  byidseekerupdate,
  seekerupload,
  getSeekerById,
  createSeeker,
  deleteSeekerById,
} = require("../controllers/seekerscontroller");
const {
  employerupload,
  byidemployerupdate,
  getEmployerById,
  createEmployer,
  deleteEmployerById,
} = require("../controllers/employeecontroller");
const { getAllUsers, deleteUserById, getUserById } = require("../controllers/usercontroller");
const { createorganization, getorganizationemployerbyid, updateOrganizationById, getOrganizationById, deleteOrganizationById, getAllOrganizations } = require("../controllers/organizationcontroller");
const { createjobs, getJobById, updateJobById, getJobsByOrganizationId, deleteJobById, getAllJobs } = require("../controllers/jobscontrollers");
const { createjobportal, getJobPortalEntriesBySeekerId, getJobPortalEntriesByJobId, updateJobPortalEntryById, deleteJobPortalEntryById, getAlljobportal } = require("../controllers/jobportalcontroller");
const { createplacements, getPlacementById, getPlacementsByJobId, getPlacementsBySeekerId, getPlacementsByOrganizationId, updatePlacementById, deletePlacementById } = require("../controllers/placementcontroller");
const { createPayment, getPaymentsByPlacementId, updatePaymentByPlacementId, deletePaymentByPlacementId } = require("../controllers/paymentscontroller");

////////userAuthentication APIs/////
router.post("/register", register);
router.post("/login", login);
router.post("/passwordreset", resetpassword);

////////userController APIs/////
router.get("/getallusers", getAllUsers);
router.get("/getuserbyid", getUserById);
router.delete("/idbydeleteuser", deleteUserById);

////////seeker APIS ///////
router.post("/postseekers", seekerupload,createSeeker);
router.put("/seekerupdatebyid", seekerupload, byidseekerupdate);
router.get("/getbyseekerid", getSeekerById);
router.delete("/idbydeleteseeker", deleteSeekerById);

////////employer APIS ///////
router.post("/postemployers", employerupload,createEmployer);
router.put("/employerupdatebyid", employerupload, byidemployerupdate);
router.get("/getbyemployerid", getEmployerById);
router.delete("/idbydeleteemployer", deleteEmployerById);

////////organization APIS ///////
router.post("/postorganization", createorganization);
router.get("/getorganizationbyid", getorganizationemployerbyid);
router.put("/organizationupdatebyid", updateOrganizationById);
router.get("/organizationgetbyid", getOrganizationById);
router.delete("/idbydeleteorganization", deleteOrganizationById);

//////////jobs APIS////////////
router.post("/postjobs", createjobs);
router.get("/alljobsget", getAllJobs);
router.get("/AllOrganizationsget", getAllOrganizations);
router.get("/getjobsbyorganizationid", getJobsByOrganizationId);
router.get("/jobsgetbyid", getJobById);
router.put("/jobsupdatebyid", updateJobById);
router.delete("/idbydeletejobs", deleteJobById);

//////////////jobportal APIS ////////////
router.post("/postjobportal", createjobportal);
router.get("/getjobprotalbyseekerid", getJobPortalEntriesBySeekerId);
router.get("/getjobprotalall", getAlljobportal);
router.get("/getjobportalbyjobid", getJobPortalEntriesByJobId);
router.put("/updatejobportalid", updateJobPortalEntryById);
router.delete("/deletejobportalid", deleteJobPortalEntryById);

//////////////
router.post("/postplacements", createplacements);
router.get("/idbyplacements", getPlacementById);
router.get("/placementsjobbyid", getPlacementsByJobId);
router.get("/placementsbyseekerid", getPlacementsBySeekerId);
router.get("/placementsbyorganizationid", getPlacementsByOrganizationId);
router.put("/updateplacementbyid", updatePlacementById);
router.delete("/deleteplacmentbyid", deletePlacementById);


///////////////////

router.post("/postpayments", createPayment);
router.get("/getpaymentsbyid", getPaymentsByPlacementId);
router.put("/updatepaymentsbyid", updatePaymentByPlacementId);
router.delete("/deletepaymentsbyid", deletePaymentByPlacementId);


module.exports = router;
