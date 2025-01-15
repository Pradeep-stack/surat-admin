import React, { useEffect, useState } from "react";
import "../../../assets/css/TestimonialList.css";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import topbanner from "../../../assets/images/cover_4.jpg";
import avatar from "../../../assets/images/avatar_12.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonialsAsync,
  deleteTestimonialAsync,
} from "../../../features/testimonial/testinmonialThunks";
import { toast } from "react-toastify";
import DeleteModal from "../../../components/DeleteModal";
import axios from "axios";
import { API_URL } from "../../../config";
import Loader from "../../../components/Loader";
const TestimonialList = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state?.testimonial?.testimonials);
  const user = useSelector((state) => state?.user?.user);
  // console.log("testimonialsList++++++++++++", testimonials);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getTestimonialsAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteTestId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTestimonialAsync(deleteTestId));
    toast.success("Deleted Successfully!");
    setDeleteTestId();
    setIsDeleteModalOpen(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="main-conent-box">
        <h2 className="page-title">Event List</h2>
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
            <p>Event List </p>
          </Breadcrumbs>
          <Link to="/add-testimonial">
            <button className="new-post-btn">+ New Post</button>
          </Link>
        </div>
        {loader ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="row">
              {testimonials?.slice(startIndex, endIndex).map((testimonial) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-12"
                  key={testimonial.id}
                >
                  <div className="center-top-box" style={{ margin: "10px" }}>
                    <img className="testimonial-top-banner" src={topbanner} />
                    <div className="testimonial-avatar">
                      <div className="testimonial-detail">
                        <h6 className="date">
                          {new Date(
                            testimonial?.createdAt
                          ).toLocaleDateString()}
                        </h6>
                        <div className="name-testi-box">
                          <img className="mini-avatar" src={avatar} />
                          <p className="testimonial-name">{testimonial.tag}</p>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-banner-bottom">
                      <div className="testimonial-para">
                        <h6 className="test-name">{testimonial?.postTitle}</h6>
                        <p>{testimonial?.description}</p>
                      </div>
                      {/* <span className="print">
                      {" "}
                      <Icon
                        style={{ fontSize: "22px" }}
                        icon="ion:print-sharp"
                      />
                    </span> */}
                      {/* <span className="print">
                      {" "}
                      <Icon
                        style={{ fontSize: "22px" }}
                        icon="basil:edit-solid"
                      />{" "}
                    </span> */}
                      {user?.user_type === "admin" && (
                        <span>
                          {" "}
                          <Icon
                            style={{ fontSize: "22px", cursor: "pointer" }}
                            icon="material-symbols:delete-rounded"
                            onClick={() => handleDelete(testimonial._id)}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Grid
              container
              justifyContent="center"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                position: "fixed",
                bottom: "0",
                left: "0",
              }}
            >
              <Pagination
                count={Math.ceil(testimonials.length / itemsPerPage)}
                page={currentPage}
                color="primary"
                onChange={handlePageChange}
              />
            </Grid>
          </div>
        )}
      </div>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default TestimonialList;
