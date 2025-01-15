// import React from "react";
import "../../../assets/css/ParentsPage.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import topbanner from "../../../assets/images/cover_4.jpg";
import { useLocation } from "react-router-dom";
import { getUserByPhone } from "../../../api/parents";
import { useCallback, useEffect, useState } from "react";

const ParentsDetail = () => {
  const location = useLocation();
  const phone = location.state.parent;
  const[parent, setParent] = useState({});

  const fetchUserByPhone = useCallback(async () => {
    try {
      if (phone) {
        const response = await getUserByPhone(phone);
        setParent(response.data);
      }
    } catch (error) {
      console.error('Error fetching user by phone:', error);
    }
  }, [phone]);

  useEffect(() => {
    fetchUserByPhone();
  }, [fetchUserByPhone]);

  console.log(parent);


  return (
    <>
    
 <div className="main-conent-box mb-5">
        <h2 className="page-title">Parents Details</h2>
        <div className="breadcrumbs-container">
          <Breadcrumbs
            className="link-breadcrumb"
            title="Basic"
            divider={true}
            isCard={false}
          >
            <p>
              <Icon
                className="icon-green"
                style={{ fontSize: "20px", marginBottom: "7px" }}
                icon="tabler:home-filled"
              />
              <Link to="/"> Dashboard</Link>
            </p>
            <p>Parents Details</p>
          </Breadcrumbs>
          <Link to="/parents-list">
            <button className="custom-btn-green">
              {" "}
              <Icon icon="ep:arrow-left-bold" width="20" height="20" /> Back To
              List
            </button>
          </Link>
        </div>

        <div className="center-top-box">
          <img className="top-banner" src={topbanner} />
          <div className="testimcenter-avatar">
            <div className="center-detail">
              <img className="mini-avatar" src={parent?.profile_pic} />
              <div className="center-title">
                <h3>{parent?.name}</h3>
                <h5>{parent?.username}</h5>
              </div>
            </div>
          </div>
          <div className="center-banner-bottom">
            {/* <span className="print">
              {" "}
              <Icon style={{ fontSize: "22px" }} icon="ion:print-sharp" /> Print
            </span>
            <span className="print">
              {" "}
              <Icon style={{ fontSize: "22px" }} icon="basil:edit-solid" /> Edit
            </span>
            <span>
              {" "}
              <Icon
                style={{ fontSize: "22px" }}
                icon="mage:share-fill"
              /> Share{" "}
            </span> */}
           </div>
        </div>

        <div className="row">
          <div className=" mt-4">
            <div className="theme-card2">
              <h5>About</h5>
              <div className="about-details">
                <div>
                  <h6>
                    {" "}
                    <Icon className="about-icon" icon="basil:user-solid" />{" "}
                    {parent?.name}
                  </h6>
                  <h6>
                    {" "}
                    <Icon className="about-icon" icon="mage:email-fill" />{" "}
                    {parent?.company}
                  </h6>
                  <h6>
                    {" "}
                    <Icon
                      className="about-icon"
                      icon="mage:mobile-phone-fill"
                    />{" "}
                    {parent?.phone}
                  </h6>
                  <h6>
                    {" "}
                    <Icon
                      className="about-icon"
                      icon="fluent:location-16-filled"
                    />{" "}
                 {parent?.city}
                  </h6>
                  {/* <h6>
                    {" "}
                    <Icon
                      className="about-icon"
                      icon="fluent:time-20-regular"
                    />{" "}
                 {parent?.updatedAt}
                  </h6> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

export default ParentsDetail;
