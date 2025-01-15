import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCentersAsync,
  deleteCenterAsync,
} from "../../../features/center/centerThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ConfirmationModal from "../../../components/ConfirmationModal";
import {
  getApplicationForCenter,
  getApplicationForAdmin,
  updateApplication,
  deleteApplication,
} from "../../../api/application";
import Loader from "../../../components/Loader";
import { getCategories } from "../../../api/videos";
const CategoryList = () => {
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectModalOpen, setrejectModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalClsoe, setModalClose] = useState(false);
  const [acceptApplication, setAcceptApplication] = useState(false);
  const [rejectApplication, setRejectApplication] = useState(false);
  const [acceptId, setAcceptId] = useState("");
  const [rejectId, setRejectId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchApplication = async () => {
    setLoader(true);
    try {
    const resonse = await getCategories();
    console.log("response", resonse);
    setApplicationData(resonse?.data);
    setLoader(false);
    } catch (error) {
      console.log("error in getting reposnse from api")
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchApplication();
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const indexOfLastApplication = currentPage * applicationPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationPerPage;
  const fillteredApplication = applicationData
    ?.filter((item) =>
      item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  const currentApplications = fillteredApplication?.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  //   this is use for the modal
  const handleClose = () => {
    setModalOpen(false);
    setrejectModalOpen(false);
    setDeleteModalOpen(false);
  };
  const handleOpen = (id) => {
    setModalOpen(true);
    setAcceptId(id);
  };
  const handleRejectModalOpen = (id) => {
    setrejectModalOpen(true);
    setRejectId(id);
  };
  const handledeleteModalOpen = (id) => {
    setDeleteModalOpen(true);
    setDeleteId(id);
  };
  //   this is use for the accept and reject application
  const handleAccept = async () => {
    setAcceptApplication(true);
    setrejectModalOpen(false);
    setModalOpen(false);
    const response = await updateApplication(acceptId, { status: "Accept" });
    fetchApplication();

    //  immplemet accept function here for the application
  };
  const handleReject = async () => {
    console.log("this is reject modal");
    setRejectApplication(true);
    setrejectModalOpen(false);
    setModalOpen(false);
    const response = await updateApplication(rejectId, { status: "Reject" });
    fetchApplication();
  };
  const handleDelete = async () => {
    console.log("this is delete modal", deleteId);
    setRejectApplication(true);
    setDeleteModalOpen(false);
    setModalOpen(false);
    const response = await deleteApplication(deleteId);
    fetchApplication();
  };

  const handleView = (item) => {
    navigate(`/parent-declaration-preview`, { state: { item } });
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* this is the ConfirmationModal  */}
      <ConfirmationModal
        className="confirmation-modal"
        handleClose={handleClose}
        handleOpen={modalOpen}
        message={"Accept"}
        handleAccept={handleAccept}
      />
      <ConfirmationModal
        handleClose={handleClose}
        rejectModalOpen={rejectModalOpen}
        message={"Reject"}
        handleReject={handleReject}
      />
      <ConfirmationModal
        handleClose={handleClose}
        deleteModalOpen={deleteModalOpen}
        message={"Delete"}
        handleDelete={handleDelete}
      />

      <div className="main-conent-box mb-5">
        <h2 className="page-title">Application List</h2>
        <div className="main-serch-box">
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
            <p>Category List</p>
          </Breadcrumbs>
          <Link to="/add-category">
            <button className="new-post-btn">+ New Category</button>
          </Link>
        </div>

        {loader ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : !applicationData?.length ? (
          <>
            <div className="centered-box">
              <Icon
                icon="lets-icons:file-dock-duotone"
                width="60"
                height="60"
                style={{
                  color: "red",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <h2>You Have No Data</h2>
            </div>
          </>
        ) : (
          <TableContainer className="table-container mt-3">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell">
                    S.No.
                  </TableCell>
                  <TableCell
                    className="table-head-cell"
                 
                    onClick={() => handleSort("name")}
                  >
                    Image
                    {sortColumn === "name" && (
                      <Icon
                        icon={
                          sortDirection === "asc"
                            ? "material-symbols:arrow-upward"
                            : "material-symbols:arrow-downward"
                        }
                        width="18"
                        height="18"
                        style={{
                          marginLeft: "5px",
                          color: "#ba890f",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    className="table-head-cell"
                 
                    onClick={() => handleSort("email")}
                  >
                    Name
                    {sortColumn === "email" && (
                      <Icon
                        icon={
                          sortDirection === "asc"
                            ? "material-symbols:arrow-upward"
                            : "material-symbols:arrow-downward"
                        }
                        width="18"
                        height="18"
                        style={{
                          marginLeft: "5px",
                          color: "#ba890f",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="table-head-cell" >
                    Description
                  </TableCell>
                  {/* <TableCell
                    className="table-head-cell"
                 
                    onClick={() => handleSort("status")}
                  >
                    Status
                    {sortColumn === "status" && (
                      <Icon
                        icon={
                          sortDirection === "asc"
                            ? "material-symbols:arrow-upward"
                            : "material-symbols:arrow-downward"
                        }
                        width="18"
                        height="18"
                        style={{
                          marginLeft: "5px",
                          color: "#ba890f",
                        }}
                      />
                    )}
                  </TableCell> */}
                  <TableCell className="table-head-cell" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {currentApplications?.map((item, index) => (
                <TableBody key={item?._id}>
                  <TableRow>
                    <TableCell className="table-body-cell">
                      <div className="list-detail">{index+1}</div>
                    </TableCell>
                    <TableCell className="table-body-cell" >
                      <div className="list-detail-image">
                        <img
                          src={item?.imageUrl}
                          alt="image"
                          className="list-image"
                          width={"50px"}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="table-body-cell" >
                      <div className="list-detail-email">{item?.name}</div>
                    </TableCell>
                    <TableCell className="table-body-cell" >
                      {item?.postCount}
                    </TableCell>
                    {/* <TableCell className="table-body-cell" >
                      {item?.status === "pending" && (
                        <span className="badge-blue">{item?.status}</span>
                      )}
                      {item?.status === "Accept" && (
                        <span className="badge-green">{item?.status?"Accept":"Active"}</span>
                      )}
                      {item?.status === "Reject" && (
                        <span className="badge-red">{item?.status}</span>
                      )}
                      {item?.status === "Under Review" && (
                        <span className="badge-yellow">{item?.status==="Under Review" && "Pending"}</span>
                      )}
                    </TableCell> */}
                    {/* <TableCell className="table-body-cell" align="center">
                      <Button
                        className="list-btn-accept"
                        onClick={() => handleOpen(item._id)}
                      >
                        Active
                      </Button>
                      <Button
                        className="list-btn-reject"
                        onClick={() => handleRejectModalOpen(item._id)}
                      >
                        De-active
                      </Button>

                      <Icon
                        icon="lets-icons:view-fill"
                        width="26"
                        height="26"
                        style={{
                          color: "#ba890f",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(item._id)}
                      />
                      {user.user_type === "admin" && (
                        <Icon
                          icon="material-symbols:delete-rounded"
                          width="20"
                          height="20"
                          style={{
                            color: "red",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handledeleteModalOpen(item._id)}
                        />
                      )}
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
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
            count={Math.ceil(fillteredApplication.length / applicationPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </div>
    </>
  );
};

export default CategoryList;
