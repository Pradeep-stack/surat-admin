import React, { useState, useEffect } from "react";
import dashimg from "../assets/images/dash1.png";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicationForCenter,
  getApplicationForAdmin,
} from "../api/application";
import { getParentsAsync } from "../features/parents/parentsThunk";
import Loader from "./Loader";

const AdminDashboard = ({ userData }) => {
  const totalData = useSelector((state) => state);
  const [applicationData, setApplicationData] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const fetchApplication = async () => {
    if (user.user_type === "center") {
      const response = await getApplicationForCenter(user._id);
      setApplicationData(response?.data);
    } else if (user.user_type === "admin") {
      const response = await getApplicationForAdmin(user._id);
      setApplicationData(response?.data);
    } else {
      console.log("You are not eligible");
      return;
    }
  };
  useEffect(() => {
    fetchApplication();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getParentsAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  // console.log("applicationData",applicationData);
  return (
    <>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="main-conent-box mb-5">
          <div className="welcom-box">
            <div className="row">
              <div className="col col-lg-8 col-md-8 col-sm-12">
                <div className="welcm-msg">
                  <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                      <div className="welcm-left-box">
                        <h3 className="mb-3">
                          Welcome back {userData?.fullName} 👋
                        </h3>
                        <p>
                          If you are going to use a passage of Lorem Ipsum, you
                          need to be sure there anything.
                        </p>
                        {/* <button className="custom-btn-green">Go Now</button> */}
                      </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                      <div className="d-flex justify-content-center">
                        <img src={dashimg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col col-lg-4 col-md-4 col-sm-12">
                <div className="welcm-msg-right">
                  <div className="welcm-right-box">
                    <div className="dash-img-back d-flex justify-content-center mb-3 mt-2">
                      {/* <img className="wlcm-img" src={userimg} alt="" /> */}
                      <Icon
                        icon="fa6-solid:building-user"
                        width="80"
                        height="80"
                        style={{ color: "#ba890f" }}
                      />
                    </div>
                    <h2>{totalData?.centers?.centers?.length}k</h2>
                    <p>Customers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-lg-4 col-md-4 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2>{totalData?.parents?.parents?.length}k</h2>
                    <p>Category </p>
                  </div>
                  <div className="dash-img-back d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="solar:users-group-two-rounded-bold-duotone"
                      width="80"
                      height="80"
                      style={{ color: "#ba890f" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col col-lg-4 col-md-4 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2>{applicationData?.length}k</h2>
                    <p>All Modules </p>
                  </div>
                  <div className="dash-img-back d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="lets-icons:file-dock-fill"
                      width="80"
                      height="80"
                      style={{ color: "#ba890f" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col col-lg-4 col-md-4 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2>{totalData?.testimonial?.testimonials?.length}k</h2>
                    <p>Events </p>
                  </div>
                  <div className="dash-img-back d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="bi:chat-left-quote-fill"
                      width="60"
                      height="60"
                      style={{ color: "#ba890f" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
