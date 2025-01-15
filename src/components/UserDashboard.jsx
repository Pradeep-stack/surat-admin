import dashimg from "../assets/images/dash1.png";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { Icon } from "@iconify/react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { getApplicationForUser } from "../api/application";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { getParentsAsync } from "../features/parents/parentsThunk";

const UserDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const formId = userForm && userForm[0]?._id;
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchApplication = async () => {
      if (user?._id) {
        const response = await getApplicationForUser(user._id);

        setUserForm(response?.data);
      }
    };
    fetchApplication();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getParentsAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleView = (item) => {
    navigate(`/parent-declaration-preview`, { state: { item } });
  };
  const handleEdit = (item) => {
    navigate(`/update-declaration-form`, { state: { item } });
  };

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
              <div className="col col-lg-12 col-md-12 col-sm-12">
                <div className="welcm-msg">
                  <div className="row">
                    <div className="col col-lg-7 col-md-7 col-sm-12">
                      <div className="welcm-left-box">
                        <h3 className="mb-3">
                          Welcome! {userData?.fullName} 👋 <br></br>
                        </h3>
                        <p style={{ marginTop: "0px" }}>
                          You are required to fill the Application Form for
                          Dependants Grants.
                        </p>
                        <p>
                          Please proceed to the Application Form section below
                        </p>
                        {!userForm?.length && (
                          <Link to="/declration-form">
                            <button className="custom-btn-green">
                              Register Now
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="col col-lg-5 col-md-5 col-sm-12">
                      <div className="d-flex justify-content-center">
                        <img src={dashimg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Application Status Section */}
          <div className="application-status-box">
            <h4>Application No: {userForm && userForm[0]?._id}</h4>
          </div>
          <div className="">
            <div className="user-dash-main-detail">
              <div className="row">
                <div className="col col-md-6 col-sm-12">
                  <div className="user-dash-detail">
                    <div className="appl-sta-title">Appliction Status :</div>
                    <div>
                      {userForm && userForm[0]?.status && (
                        <>
                          {userForm && userForm[0]?.status === "pending" && (
                            <span className="badge-blue">
                              {userForm && userForm[0]?.status}
                            </span>
                          )}
                          {userForm &&
                            userForm[0]?.status === "Under Review" && (
                              <span className="badge-yellow">
                                {userForm && userForm[0]?.status}
                              </span>
                            )}
                          {userForm && userForm[0]?.status === "Accept" && (
                            <span className="badge-green">
                              {userForm && userForm[0]?.status}
                            </span>
                          )}
                          {userForm && userForm[0]?.status === "Reject" && (
                            <span className="badge-red">
                              {userForm && userForm[0]?.status}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col col-md-6 col-sm-12">
                  <div className="user-dash-detail">
                    <div className="appl-sta-title">Appliction Entry :</div>
                    <div>
                      <span
                        className={
                          !userForm?.length ? "badge-red" : "badge-green"
                        }
                      >
                        {!userForm?.length ? "Not Completed" : "Completed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col col-md-6 col-sm-12">
                  <div className="user-dash-detail">
                    <div className="appl-sta-title">Preview Appliction :</div>
                    <div>
                      {userForm?.length ? (
                        <button
                          className="custom-btn-green-2"
                          onClick={() =>
                            handleView(userForm && userForm[0]?._id)
                          }
                        >
                          <Icon
                            icon="lets-icons:view-fill"
                            width="20"
                            height="20"
                          />
                          View
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col col-md-6 col-sm-12">
                  <div className="user-dash-detail">
                    <div className="appl-sta-title">Edit Appliction :</div>
                    <div>
                      {" "}
                      {userForm?.length ? (
                        <button
                          className="custom-btn-green-2"
                          onClick={() =>
                            handleEdit(userForm && userForm[0]?._id)
                          }
                        >
                          <Icon
                            icon="basil:edit-solid"
                            width="26"
                            height="26"
                          />
                          Edit
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* <div className="col col-md-6 col-sm-12">
                <div className="user-dash-detail">
                  <div className="appl-sta-title">Print Appliction :</div>
                  <div>
                    {userForm?.length ? (
                      <Link className="custom-btn-green-2">
                        <Icon
                          icon="lets-icons:print-duotone"
                          width="26"
                          height="26"
                        />
                        Print
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div> */}
              </div>

              {/* <div className="row">
              <div className="col col-md-6 col-sm-12">
                <div className="user-dash-detail">
                  <div className="appl-sta-title">Edit Appliction :</div>
                  <div>
                    {" "}
                    {userForm?.length ? (
                      <Link
                        className="custom-btn-green-2"
                        to="/update-declaration-form"
                      >
                        <Icon icon="basil:edit-solid" width="26" height="26" />
                        Edit
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
