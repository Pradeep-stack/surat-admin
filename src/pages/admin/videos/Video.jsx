import React, { useEffect, useState } from "react";
import "../../../assets/css/Video.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoAsync,
  deleteVideoAsync,
} from "../../../features/video/videoThunk";
import Loader from "../../../components/Loader";
import DeleteModal from "../../../components/DeleteModal";
import { toast } from "react-toastify";
import { IMG_URL } from "../../../config/index";
const Video = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state?.videos?.videos);
  const [loader, setLoader] = useState(false);
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getVideoAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handleDelete = (id) => {
    setDeleteTestId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteVideoAsync(deleteTestId));
    toast.success("Deleted Successfully!");
    setDeleteTestId();
    setIsDeleteModalOpen(false);
  };

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Function to generate download URL
  const getDownloadUrl = (url) => {
    return `${IMG_URL}/download?url=${encodeURIComponent(url)}`;
  };
  return (
    <>
      <div className="main-conent-box">
        <h2 className="page-title">Video List</h2>
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
            <p>Modules List </p>
          </Breadcrumbs>

          <Link to="/add-video">
            <button className="new-post-btn">+ Add Modules</button>
          </Link>
        </div>
        {loader ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div>
            {/* <h2 style={{ marginLeft: "20px", marginTop: "20px" }}>Videos</h2> */}
            <div className="video-card-row">
              <div className="row">
                {currentVideos?.map((video) => (
                  <div className="col-6 col-md-4 col-sm-6">
                    <div className="card" key={video.id}>
                      <iframe
                        // src={video?.url}
                        src={getEmbedUrl(video?.video_url)}
                        frameBorder="0"
                        allowFullScreen
                        title={video?.name}
                      ></iframe>
                      <div className="card-body">
                        <h6 className="card-title">{video?.name}</h6>
                        <p className="card-text">{video?.description}</p>
                        <p className="card-text">{video?.category}</p>
                      </div>
                      {/* <div className="video-bottom-btn">
                        <Icon
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          icon="material-symbols:delete-rounded"
                          onClick={() => handleDelete(video._id)}
                        />
                        <a href={getDownloadUrl(video?.url)} download>
                          <Icon
                            style={{ fontSize: "22px", cursor: "pointer" }}
                            icon="material-symbols:download-rounded"
                          />
                        </a>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
            count={Math.ceil(videos.length / videosPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Video;
