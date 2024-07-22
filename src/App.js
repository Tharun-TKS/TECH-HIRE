import { lazy, Suspense, useContext } from "react";

/// Components
import UserPrivateRoute from "./protectedroutes/UserPrivateRoute";
import { ThemeContext } from "./context/ThemeContext";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
/// Css
import "./jsx/index.css";
import "./jsx/chart.css";
import "./jsx/step.css";

/// Layout
import Nav from "./jsx/layouts/nav";
import Footer from "./jsx/layouts/Footer";
import ScrollToTop from "./jsx/pages/ScrollToTop";
import Home from "./jsx/components/Dashboard/Home";
import DashboardDark from "./jsx/components/Dashboard/DashboardDark";
import Jobs from "./jsx/components/Dashboard/Jobs";
import Applications from "./jsx/components/Dashboard/Applications";
import MyProfile from "./jsx/components/Dashboard/MyProfile";
import Statistics from "./jsx/components/Dashboard/Statistics";
import Companies from "./jsx/components/Dashboard/Companies";
import Task from "./jsx/components/Dashboard/Task";
import JobLists from "./jsx/components/Jobs/JobLists";
import JobView from "./jsx/components/Jobs/JobView";
import JobApplication from "./jsx/components/Jobs/JobApplication";
import ApplyJob from "./jsx/components/Jobs/ApplyJob";
import NewJob from "./jsx/components/Jobs/NewJob";
import UserProfile from "./jsx/components/Jobs/UserProfile";
import Content from "./jsx/components/Cms/Content";
import Menu from "./jsx/components/Cms/Menu";
import EmailTemplate from "./jsx/components/Cms/EmailTemplate";
import Blog from "./jsx/components/Cms/Blog";
import ContentAdd from "./jsx/components/Cms/ContentAdd";
import AddMail from "./jsx/components/Cms/AddMail";
import AddBlog from "./jsx/components/Cms/AddBlog";
import BlogCategory from "./jsx/components/Cms/BlogCategory";
import AppProfile from "./jsx/components/AppsMenu/AppProfile/AppProfile";
import Compose from "./jsx/components/AppsMenu/Email/Compose/Compose";
import Inbox from "./jsx/components/AppsMenu/Email/Inbox/Inbox";
import Read from "./jsx/components/AppsMenu/Email/Read/Read";
import Calendar from "./jsx/components/AppsMenu/Calendar/Calendar";
import PostDetails from "./jsx/components/AppsMenu/AppProfile/PostDetails";
import SparklineChart from "./jsx/components/charts/Sparkline";
import ChartJs from "./jsx/components/charts/Chartjs";
//import Chartist from "./jsx/components/charts/chartist";
import RechartJs from "./jsx/components/charts/rechart";
import ApexChart from "./jsx/components/charts/apexcharts";
import UiAlert from "./jsx/components/bootstrap/Alert";
import UiBadge from "./jsx/components/bootstrap/Badge";
import UiButton from "./jsx/components/bootstrap/Button";
import UiModal from "./jsx/components/bootstrap/Modal";
import UiButtonGroup from "./jsx/components/bootstrap/ButtonGroup";
import UiAccordion from "./jsx/components/bootstrap/Accordion";
import UiListGroup from "./jsx/components/bootstrap/ListGroup";
import UiCards from "./jsx/components/bootstrap/Cards";
import UiCarousel from "./jsx/components/bootstrap/Carousel";
import UiDropDown from "./jsx/components/bootstrap/DropDown";
import UiPopOver from "./jsx/components/bootstrap/PopOver";
import UiProgressBar from "./jsx/components/bootstrap/ProgressBar";
import UiTab from "./jsx/components/bootstrap/Tab";
import UiPagination from "./jsx/components/bootstrap/Pagination";
import UiTypography from "./jsx/components/bootstrap/Typography";
import UiGrid from "./jsx/components/bootstrap/Grid";
import MainSweetAlert from "./jsx/components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./jsx/components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./jsx/components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./jsx/components/PluginsMenu/Lightgallery/Lightgallery";
import Select2 from "./jsx/components/PluginsMenu/Select2/Select2";
import Todo from "./jsx/pages/Todo";
import Widget from "./jsx/pages/Widget";
import ProductGrid from "./jsx/components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./jsx/components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./jsx/components/AppsMenu/Shop/ProductGrid/ProductDetail";
import ProductOrder from "./jsx/components/AppsMenu/Shop/ProductOrder";
import Checkout from "./jsx/components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./jsx/components/AppsMenu/Shop/Invoice/Invoice";
import Customers from "./jsx/components/AppsMenu/Shop/Customers/Customers";
import Element from "./jsx/components/Forms/Element/Element";
import Wizard from "./jsx/components/Forms/Wizard/Wizard";
import CkEditor from "./jsx/components/Forms/CkEditor/CkEditor";
import Pickers from "./jsx/components/Forms/Pickers/Pickers";
import FormValidation from "./jsx/components/Forms/FormValidation/FormValidation";
import FilteringTable from "./jsx/components/table/FilteringTable/FilteringTable";
import SortingTable from "./jsx/components/table/SortingTable/SortingTable";
import DataTable from "./jsx/components/table/DataTable";
import BootstrapTable from "./jsx/components/table/BootstrapTable";
import LockScreen from "./jsx/pages/LockScreen";
import Error400 from "./jsx/pages/Error400";
import Error403 from "./jsx/pages/Error403";
import Error404 from "./jsx/pages/Error404";
import Error500 from "./jsx/pages/Error500";
import Error503 from "./jsx/pages/Error503";
import Setting from "./jsx/layouts/Setting";
import OrganizationsList from "./jsx/components/Dashboard/Admin/OrganizationsList";
import Userslist from "./jsx/components/Dashboard/Admin/Userslist";
import UserViewProfile from "./jsx/components/Dashboard/Admin/UserViewProfile";
import EmployerJobList from "./jsx/components/Dashboard/Employer/EmployerJobList";
import EmployerjobView from "./jsx/components/Dashboard/Employer/EmployerJobView";
import EmployerJobApplication from "./jsx/components/Dashboard/Employer/EmployerJobApplication";
import SeekerJobView from "./jsx/components/Dashboard/Seeker/SeekerJobView";
import SeekerJobApplication from "./jsx/components/Dashboard/Seeker/SeekerJobApplication";
import SeekerPayments from "./jsx/components/Dashboard/Seeker/SeekerPayments";
import SeekerPlacements from "./jsx/components/Dashboard/Seeker/SeekerPlacements";
import SeekerJobList from "./jsx/components/Dashboard/Seeker/SeekerJobList";
import Landing from "./jsx/pages/Landing";
import EmployerOrganizations from "./jsx/components/Dashboard/Employer/EmployerOrganizations";
import EmployerOrganizationView from "./jsx/components/Dashboard/Employer/EmployerOrganizationView";
import EmployerAddOrganization from "./jsx/components/Dashboard/Employer/EmployerAddOrganization";

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <>
      <div
        id="main-wrapper"
        className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
      <Setting />
    </>
  );
}

const allroutes = [
  /// allroutes
  { url: "", component: <Home /> },
  { url: "dashboard", component: <Home /> },
  { url: "dashboard-dark", component: <DashboardDark /> },
  { url: "search-jobs", component: <Jobs /> },
  { url: "applications", component: <Applications /> },
  { url: "my-profile", component: <MyProfile /> },
  { url: "statistics", component: <Statistics /> },
  { url: "companies", component: <Companies /> },
  { url: "task", component: <Task /> },

  //Jobs
  { url: "job-list", component: <JobLists /> },
  { url: "job-view", component: <JobView /> },
  { url: "job-application", component: <JobApplication /> },
  { url: "apply-job", component: <ApplyJob /> },
  { url: "new-job", component: <NewJob /> },
  { url: "user-profile", component: <UserProfile /> },

  //Cms
  { url: "content", component: <Content /> },
  { url: "menu", component: <Menu /> },
  { url: "email-template", component: <EmailTemplate /> },
  { url: "blog", component: <Blog /> },
  { url: "add-content", component: <ContentAdd /> },
  { url: "add-email", component: <AddMail /> },
  { url: "add-blog", component: <AddBlog /> },
  { url: "blog-category", component: <BlogCategory /> },

  /// Apps
  { url: "app-profile", component: <AppProfile /> },
  { url: "email-compose", component: <Compose /> },
  { url: "email-inbox", component: <Inbox /> },
  { url: "email-read", component: <Read /> },
  { url: "app-calender", component: <Calendar /> },
  { url: "post-details", component: <PostDetails /> },

  /// Chart
  { url: "chart-sparkline", component: <SparklineChart /> },
  { url: "chart-chartjs", component: <ChartJs /> },
  //{ url: "chart-chartist", component: Chartist },
  { url: "chart-apexchart", component: <ApexChart /> },
  { url: "chart-rechart", component: <RechartJs /> },

  /// Bootstrap
  { url: "ui-alert", component: <UiAlert /> },
  { url: "ui-badge", component: <UiBadge /> },
  { url: "ui-button", component: <UiButton /> },
  { url: "ui-modal", component: <UiModal /> },
  { url: "ui-button-group", component: <UiButtonGroup /> },
  { url: "ui-accordion", component: <UiAccordion /> },
  { url: "ui-list-group", component: <UiListGroup /> },
  { url: "ui-card", component: <UiCards /> },
  { url: "ui-carousel", component: <UiCarousel /> },
  { url: "ui-dropdown", component: <UiDropDown /> },
  { url: "ui-popover", component: <UiPopOver /> },
  { url: "ui-progressbar", component: <UiProgressBar /> },
  { url: "ui-tab", component: <UiTab /> },
  { url: "ui-pagination", component: <UiPagination /> },
  { url: "ui-typography", component: <UiTypography /> },
  { url: "ui-grid", component: <UiGrid /> },

  /// Plugin
  { url: "uc-select2", component: <Select2 /> },
  //{ url: "uc-nestable", component: Nestable },
  //{ url: "uc-noui-slider", component: MainNouiSlider },
  { url: "uc-sweetalert", component: <MainSweetAlert /> },
  { url: "uc-toastr", component: <Toastr /> },
  { url: "map-jqvmap", component: <JqvMap /> },
  { url: "uc-lightgallery", component: <Lightgallery /> },

  ///Redux
  { url: "todo", component: <Todo /> },
  /// Widget
  { url: "widget-basic", component: <Widget /> },

  /// Shop
  { url: "ecom-product-grid", component: <ProductGrid /> },
  { url: "ecom-product-list", component: <ProductList /> },
  { url: "ecom-product-detail", component: <ProductDetail /> },
  { url: "ecom-product-order", component: <ProductOrder /> },
  { url: "ecom-checkout", component: <Checkout /> },
  { url: "ecom-invoice", component: <Invoice /> },
  { url: "ecom-customers", component: <Customers /> },

  /// Form
  { url: "form-element", component: <Element /> },
  { url: "form-wizard", component: <Wizard /> },
  { url: "form-ckeditor", component: <CkEditor /> },
  { url: "form-pickers", component: <Pickers /> },
  { url: "form-validation", component: <FormValidation /> },

  /// table
  { url: "table-filtering", component: <FilteringTable /> },
  { url: "table-sorting", component: <SortingTable /> },
  { url: "table-datatable-basic", component: <DataTable /> },
  { url: "table-bootstrap-basic", component: <BootstrapTable /> },

  // Admin
  { url: "users-list", component: <Userslist /> },
  { url: "organizations-list", component: <OrganizationsList /> },
  { url: 'user-viewprofile/:id', component: <UserViewProfile/> },

  // Employer
  { url: 'employer-organizations', component: <EmployerOrganizations/> },
  { url: 'employer-job-list', component: <EmployerJobList/> },
  { url: "employer-jobview/:id", component: <EmployerjobView/> },
  { url: "employer-jobapplication", component: <EmployerJobApplication/> },
  { url: "employer-organizationview/:id", component: <EmployerOrganizationView/> },
  { url: "employer-addorganization", component: <EmployerAddOrganization/> },
  
  // Seeker
  { url: "seeker-joblist", component: <SeekerJobList /> },
  { url: "seeker-jobview/:id", component: <SeekerJobView /> },
  { url: "seeker-jobapplication", component: <SeekerJobApplication /> },
  { url: "seeker-payments", component: <SeekerPayments /> },
  { url: "seeker-placements", component: <SeekerPlacements /> },
];

const SignUp = lazy(() => import("./jsx/pages/Registration"));
const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function App() {
  return (
    <div className="vh-100">
      <Suspense
        fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
      >
        <Routes>
        <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/page-register" element={<SignUp />} />
          <Route path="/page-forgot-password" element={<ForgotPassword />} />
          <Route path="/page-lock-screen" element={<LockScreen />} />
          <Route path="/page-error-400" element={<Error400 />} />
          <Route path="/page-error-403" element={<Error403 />} />
          <Route path="/page-error-404" element={<Error404 />} />
          <Route path="/page-error-500" element={<Error500 />} />
          <Route path="/page-error-503" element={<Error503 />} />
          <Route element={<UserPrivateRoute element={<MainLayout />} />}>
            {allroutes.map((data, i) => (
              <Route
                key={i}
                exact
                path={`${data.url}`}
                element={data.component}
              />
            ))}
          </Route>
        </Routes>
        <ScrollToTop />
      </Suspense>
    </div>
  );
}

export default withRouter(App);
