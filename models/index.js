const User = require ("./User")
const Seeker = require ("./seeker")
const employer = require ("./employer")
const Organization = require("./organization")
const jobs = require("./jobs")
const jobportal= require("./jobportal")
const placement = require ("./placement")
const payments = require("./payments")


User.hasOne(Seeker, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});
Seeker.belongsTo(User, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});

///////////////////

User.hasOne(employer, { foreignKey: 'employeid' , onDelete: 'CASCADE'});
employer.belongsTo(User, { foreignKey: 'employeid' , onDelete: 'CASCADE'});

////////////////

User.hasMany(Organization, { foreignKey: 'employeid' , onDelete: 'CASCADE'});
Organization.belongsTo(User, { foreignKey: 'employeid' , onDelete: 'CASCADE'});

//////////////////////

Organization.hasMany(jobs, { foreignKey: 'organizationid' , onDelete: 'CASCADE'});
jobs.belongsTo(Organization, { foreignKey: 'organizationid' , onDelete: 'CASCADE'});


//////////////////

jobs.hasMany(jobportal, { foreignKey: 'jobid' , onDelete: 'CASCADE'});
jobportal.belongsTo(jobs, { foreignKey: 'jobid' , onDelete: 'CASCADE'});

User.hasMany(jobportal, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});
jobportal.belongsTo(User, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});



///////////////////
jobs.hasOne(placement, { foreignKey: 'jobid' , onDelete: 'CASCADE'});
placement.belongsTo(jobs, { foreignKey: 'jobid' , onDelete: 'CASCADE'});

User.hasMany(placement, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});
placement.belongsTo(User, { foreignKey: 'seekerid' , onDelete: 'CASCADE'});

Organization.hasMany(placement, { foreignKey: 'organizationid' , onDelete: 'CASCADE'});
placement.belongsTo(Organization, { foreignKey: 'organizationid' , onDelete: 'CASCADE'});




/////////////////////
placement.hasMany(payments, { foreignKey: 'placementid' , onDelete: 'CASCADE'});
payments.belongsTo(placement, { foreignKey: 'placementid' , onDelete: 'CASCADE'});


module.exports ={User,Seeker,employer,Organization,jobs,jobportal,placement,payments}