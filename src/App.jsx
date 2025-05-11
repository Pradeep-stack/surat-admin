import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routess } from "../src/routes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/DashboardNavbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Application";
import ParentsList from "./pages/admin/buyer/ParentsList.jsx";
import ParentsDetail from "./pages/admin/buyer/ParentsDetail.jsx";
import ExhibitorMember from "./pages/admin/exibitorMember/VendorList.jsx";
import ExhibitorStaff from "./pages/admin/exibitorStaff/VendorList.jsx";
import { useEffect, useState } from "react";
import { setUser } from "./features/user/userSlice";
import VendorList from "./pages/admin/exibitor/VendorList.jsx";
import VendorDetail from "./pages/admin/exibitor/VendorDetail.jsx";
import AgentList from "./pages/admin/agent/ParentsList.jsx";

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
                  path={Routess.ParentsList.path}
                  element={<ParentsList />}
                />
                <Route
                  path={Routess.AgentList.path}
                  element={<AgentList />}
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
                  path={Routess.VendorMembers.path}
                  element={<ExhibitorMember />}
                />
                <Route
                  path={Routess.VendorStaff.path}
                  element={<ExhibitorStaff />}
                />
                <Route
                  path={Routess.VendorDetail.path}
                  element={<VendorDetail />}
                />
                        
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path={Routess.Login.path} element={<Login />} />
          <Route path={Routess.Register.path} element={<Register />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
