import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routess } from "../src/routes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/DashboardNavbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LandingHomePage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Application";
import Application from "./pages/Application";
import CenterList from "./pages/admin/center/CenterList";
import CenterDetail from "./pages/admin/center/CenterDetail";
import ParentsList from "./pages/admin/parents/ParentsList";
import ParentsDetail from "./pages/admin/parents/ParentsDetail";
import TestimonialList from "./pages/admin/testimonials/TestimonialList";
import AddTestimonial from "./pages/admin/testimonials/AddTestimonial";
import Video from "./pages/admin/videos/Video";
import KanbanBoard from "./pages/admin/kanban/KanbanBoard";
import AddVideo from "./pages/admin/videos/AddVideo";
import UserApplicationForm from "./components/UserApplicationFrom";
import EditApplication from "./components/EditApplication";
import ApplicationList from "./pages/admin/Application/ApplicationList";
import UpdateParents from "./pages/admin/parents/UpdateParents";
import ApplicationFrom from "./pages/admin/Application/ApplicationFrom";
import ApplicationPreview from "./pages/admin/Application/ApplicationPreview";
import UpdateCenter from "./pages/admin/center/UpdateCenter";
import ParentDeclaration from "./components/ParentDeclaration";
import UpdateDeclarationForm from "./components/UpdateDeclarationForm.jsx";
import ParentDeclarationPreview from "./components/ParentDeclarationPreview";
import DeclrationForm from "./pages/admin/declrationForm/index.jsx";
import SetHours from "./components/SetHours.jsx";
import AddCategory from "./pages/admin/category/AddCategory.jsx";
import AddProduct from "./pages/admin/product/AddProduct.jsx";
import { useEffect, useState } from "react";
import { setUser } from "./features/user/userSlice";
import CategoryList from "./pages/admin/category/CategoryList.jsx";
import ProductList from "./pages/admin/product/ProductList.jsx";
import VendorList from "./pages/admin/vendor/VendorList.jsx";
import VendorDetail from "./pages/admin/vendor/VendorDetail.jsx";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const doremone = JSON.parse(localStorage.getItem("userData"));
    if (doremone) {
      setUserData(doremone);
      dispatch(setUser(doremone));
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      {userData ? (
        <>
          <Navbar />
          <div className="dashboard-content">
            <div className="main-content">
              <Routes>
                <Route
                  path={Routess.Dashboard.path}
                  element={<Dashboard userData={userData} />}
                />
                <Route path={Routess.Home.path} element={<Home />} />
                <Route
                  path={Routess.CenterList.path}
                  element={<CenterList />}
                />
                <Route
                  path={Routess.CenterDetail.path}
                  element={<CenterDetail />}
                />
                <Route
                  path={Routess.UpdateCenter.path}
                  element={<UpdateCenter />}
                />
                <Route
                  path={Routess.Applications.path}
                  element={<Application />}
                />
                <Route
                  path={Routess.ApplicationList.path}
                  element={<ApplicationList />}
                />
                <Route
                  path={Routess.ParentsList.path}
                  element={<ParentsList />}
                />
                <Route
                  path={Routess.ParentsDetail.path}
                  element={<ParentsDetail />}
                />
                <Route
                  path={Routess.VendorList.path}
                  element={<VendorList />}
                />
                <Route
                  path={Routess.VendorDetail.path}
                  element={<VendorDetail />}
                />
                <Route
                  path={Routess.UpdateParents.path}
                  element={<UpdateParents />}
                />
                <Route
                  path={Routess.Testimonial.path}
                  element={<TestimonialList />}
                />
                <Route
                  path={Routess.AddTestimonial.path}
                  element={<AddTestimonial />}
                />
                <Route path={Routess.Video.path} element={<Video />} />
                <Route path={Routess.AddVideo.path} element={<AddVideo />} />
                <Route
                  path={Routess.KanbanBoard.path}
                  element={<KanbanBoard />}
                />
                <Route
                  path={Routess.UserApplicationForm.path}
                  element={<UserApplicationForm />}
                />
                <Route
                  path={Routess.EditApplication.path}
                  element={<EditApplication />}
                />
                <Route
                  path={Routess.ApplicationFrom.path}
                  element={<ApplicationFrom />}
                />
                <Route
                  path={Routess.ParentDeclaration.path}
                  element={<ParentDeclaration />}
                />

                <Route
                  path={Routess.ApplicationPreview.path}
                  element={<ApplicationPreview />}
                />

                <Route
                  path={Routess.ParentDeclarationPreview.path}
                  element={<ParentDeclarationPreview />}
                />
                <Route
                  path={Routess.DeclrationForm.path}
                  element={<DeclrationForm />}
                />

                <Route
                  path={Routess.UpdateDeclarationForm.path}
                  element={<UpdateDeclarationForm />}
                />
                <Route path={Routess.SetHours.path} element={<SetHours />} />
                <Route path={Routess.AddCategory.path} element={<AddCategory />} />
                <Route path={Routess.AddProduct.path} element={<AddProduct />} />
                <Route path={Routess.CategoryList.path} element={<CategoryList />} />
                <Route path={Routess.ProductList.path} element={<ProductList />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path={Routess.LandingHomePage.path}
            element={<LandingHomePage />}
          />
          <Route path={Routess.Login.path} element={<Login />} />
          <Route path={Routess.Register.path} element={<Register />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
