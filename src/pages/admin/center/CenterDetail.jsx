// import React from "react";
import "../../../assets/css/Center.css";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import topbanner from "../../../assets/images/cover_4.jpg";
import avatar from "../../../assets/images/avatar_12.jpg";
import { useLocation } from "react-router-dom";

const CenterDetail = () => {
  const location = useLocation();
  const center = location.state.center;

  return (
    <>
      <div className="main-conent-box mb-5">
        <h2 className="page-title">Center Details</h2>
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
            <p>Center Details</p>
          </Breadcrumbs>
          <Link to="/center">
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
              <img className="mini-avatar" src={avatar} />
              <div className="center-title">
                <h3>{center?.fullName}</h3>
                <h5>{center?.username}</h5>
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
          <div className="col-lg-5 col-md-5 col-sm-12 mt-4">
            <div className="theme-card2">
              <h5>About</h5>
              <div className="about-details">
                <div>
                  <h6>
                    {" "}
                    <Icon className="about-icon" icon="basil:user-solid" />{" "}
                    {center?.fullName}
                  </h6>
                  <h6>
                    {" "}
                    <Icon className="about-icon" icon="mage:email-fill" />{" "}
                    {center?.email}
                  </h6>
                  <h6>
                    {" "}
                    <Icon
                      className="about-icon"
                      icon="mage:mobile-phone-fill"
                    />{" "}
                    {center?.phone}
                  </h6>
                  <h6>
                    {" "}
                    <Icon
                      className="about-icon"
                      icon="fluent:location-16-filled"
                    />{" "}
                    Greater Noida, Greater Noida Up{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12 mt-4">
            <div className="theme-card2 ml-3">
              <h5>Details</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Architecto repellat labore eos rerum, sunt vitae? Explicabo
                excepturi voluptate iusto, deserunt iure esse fugiat odit
                nostrum expedita nisi architecto id itaque officiis tempore?
                Eius totam dolorum velit quaerat, quibusdam fuga, error fugit
                quam mollitia non perferendis dolorem corrupti optio, labore
                est?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterDetail;
