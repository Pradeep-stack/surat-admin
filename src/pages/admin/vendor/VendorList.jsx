import  { useEffect, useState } from "react";
import "../../../assets/css/ParentsPage.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getParentsAsync,
  deleteParentAsync,
} from "../../../features/parents/parentsThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import DeleteModal from "../../../components/DeleteModal";
const VendorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parents = useSelector((state) => state?.parents?.parents);
  const filteredVendor = parents?.filter((parent) => parent?.userType === "admin");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parentsPerPage] = useState(6);
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [deletedDone, setDeletedDone] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getParentsAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch, deletedDone]); // Add `deletedDone` to dependencies to refresh after deletion

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

  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;
  const filteredParents = filteredVendor
    ?.filter((parent) =>
      parent?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  const currentParents = filteredParents?.slice(
    indexOfFirstParent,
    indexOfLastParent
  );

  const handleDelete = (id) => {
    setDeleteTestId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteParentAsync(deleteTestId)); // Await the delete action
      toast.success("Deleted Successfully!");
      setDeleteTestId(null);
      setIsDeleteModalOpen(false);
      setDeletedDone((prev) => prev + 1); // Trigger `useEffect` to refresh the list
    } catch (error) {
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleView = (parent) => {
    navigate(`/vendor-details`, { state: { parent } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <>
        <div className="main-conent-box mb-5">
          <h2 className="page-title">Vendors List</h2>
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
                <Link to="/"> Dashboard </Link>
              </p>
              <p>Vendors</p>
            </Breadcrumbs>
            <div className="d-flex">
              <input
                className="serch-box-input"
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {loader ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : (
            <TableContainer className="table-container mt-3">
              <Table>
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell className="table-head-cell">S.No.</TableCell>
                    <TableCell
                    className="table-head-cell"
                 
                    onClick={() => handleSort("name")}
                  >
                    Logo
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
                      onClick={() => handleSort("name")}
                    >
                      Name
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
                    >
                      Email
                    </TableCell>
                    <TableCell className="table-head-cell" >
                      Phone No
                    </TableCell>
                    {/* <TableCell className="table-head-cell" >
                      User
                    </TableCell> */}
                    <TableCell className="table-head-cell" >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentParents?.map((parent, index) => (
                    <TableRow key={parent.id}>
                         <TableCell className="table-body-cell" >
                        {index+1}
                      </TableCell>
                      <TableCell className="table-body-cell" >
                        <div className="table-body-cell-2">
                          <div>
                            <img
                              src={parent?.profile_pic}
                              alt={parent?.name}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="table-body-cell">
                        <div className="table-body-cell-2">
                          <div>
                            <span>{parent?.name} </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="table-body-cell" >
                        {parent?.email}
                      </TableCell>
                      <TableCell className="table-body-cell" >
                        {parent?.phone}
                      </TableCell>
                      {/* <TableCell className="table-body-cell" >
                        {parent?.user_type}
                      </TableCell> */}
                      <TableCell className="table-body-cell" >
                        <Icon
                          icon="lets-icons:view-fill"
                          width="26"
                          height="26"
                          style={{
                            color: "#ba890f",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleView(parent.phone)}
                        />
                       {/* <Icon
                          icon="fluent:edit-16-filled"
                          width="20"
                          height="20"
                          style={{
                            color: "#ba890f",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEdit(parent)}
                        />*/}
                        &nbsp; &nbsp;
                        <Icon
                          icon="material-symbols:delete-rounded"
                          width="20"
                          height="20"
                          style={{
                            color: "#ba890f",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(parent.phone)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <div className="pegination-main-box">
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
                count={Math.ceil(filteredParents.length / parentsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          </div>
        </div>
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </>
    </>
  );
};

export default VendorList;
