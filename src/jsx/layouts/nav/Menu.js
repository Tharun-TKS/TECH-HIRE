export const AdminMenu = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-025-dashboard"></i>,
    content: [
      {
        title: "Dashboard Light",
        to: "dashboard",
      },
      {
        title: "Dashboard Dark",
        to: "dashboard-dark",
      },
    ],
  },
  //Users
  {
    title: "Users",
    iconStyle: <i className="flaticon-041-graph"></i>,
    to: "users-list",
  },
  // Jobs
  {
    title: "Jobs",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-050-info" />,
    content: [
      {
        title: "Jobs",
        to: "search-jobs",
      },
      {
        title: "Job Lists",
        to: "job-list",
      },
      {
        title: "Job View",
        to: "job-view",
      },
      {
        title: "Job Application",
        to: "job-application",
      },
      {
        title: "New Job",
        to: "new-job",
      },
    ],
  },
  // Organizations
  {
    title: "Organizations",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-381-networking" />,
    content: [
      {
        title: "Organization Lists",
        to: "organizations-list",
      },
      {
        title: "Organization View",
        to: "job-view",
      },
    ],
  },
  // Placements
  {
    title: "Placements",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-013-checkmark" />,
    content: [
      {
        title: "Placement Lists",
        to: "job-list",
      },
      {
        title: "Add Placements",
        to: "form-validation",
      },
    ],
  },
  //Payments
  {
    title: "Payments",
    iconStyle: <i className="flaticon-041-graph"></i>,
    to: "job-list",
  },
];

export const EmployerMenu = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-025-dashboard"></i>,
    content: [
      {
        title: "Dashboard Light",
        to: "dashboard",
      },
      {
        title: "Dashboard Dark",
        to: "dashboard-dark",
      },
    ],
  },
  // Jobs
  {
    title: "Jobs",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-050-info" />,
    content: [
      {
        title: "Job Lists",
        to: "employer-job-list",
      },
      {
        title: "Job Application",
        to: "employer-jobapplication",
      },
      {
        title: "New Job",
        to: "new-job",
      },
    ],
  },
  // Organizations
  {
    title: "Organizations",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-381-networking" />,
    content: [
      {
        title: "Organization Lists",
        to: "employer-organizations",
      },
      {
        title: "Add Organization",
        to: "employer-addorganization",
      },
    ],
  },
  // Placements
  {
    title: "Placements",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-013-checkmark" />,
    content: [
      {
        title: "Placement Lists",
        to: "job-list",
      },
      {
        title: "Add Placements",
        to: "form-validation",
      },
    ],
  },
];

export const SeekerMenu = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-025-dashboard"></i>,
    content: [
      {
        title: "Dashboard Light",
        to: "dashboard",
      },
      {
        title: "Dashboard Dark",
        to: "dashboard-dark",
      },
    ],
  },
  // Jobs
  {
    title: "Jobs",
    classChange: "mm-collapse",
    iconStyle: <i className="flaticon-050-info" />,
    content: [
      {
        title: "Job Lists",
        to: "seeker-joblist",
      },
      {
        title: "Job Application",
        to: "seeker-jobapplication",
      },
    ],
  },
  //Payments
  {
    title: "Payments",
    iconStyle: <i className="flaticon-041-graph"></i>,
    to: "seeker-payments",
  },
  //Placements
  {
    title: "Placements",
    iconStyle: <i className="flaticon-013-checkmark" />,
    to: "seeker-placements",
  },
];
