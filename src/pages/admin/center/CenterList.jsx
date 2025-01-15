import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCentersAsync,
  deleteCenterAsync,
} from "../../../features/center/centerThunk";
import { deleteCenter } from "../../../features/center/centerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import DeleteModal from "../../../components/DeleteModal";
const CenterList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const centers = useSelector((state) => state?.centers?.centers);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [CentersPerPage] = useState(6);
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getCentersAsync());
      setLoader(false);
    };

    fetchData();
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

  const indexOfLastCenter = currentPage * CentersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - CentersPerPage;
  const filteredCenters = centers
    ?.filter((center) =>
      center?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  const currentCenters = filteredCenters?.slice(
    indexOfFirstCenter,
    indexOfLastCenter
  );

  const handleDelete = (id) => {
    setDeleteTestId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setLoader(true);
    dispatch(deleteCenterAsync(deleteTestId));
    toast.success("Deleted Successfully!");

    setDeleteTestId();
    setIsDeleteModalOpen(false);
    setLoader(false);
  };

  const handleView = (center) => {
    navigate(`/center-detail`, { state: { center } });
  };
  const handleEdit = (center) => {
    navigate(`/update-center`, { state: { center } });
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="main-conent-box mb-5">
        <h2 className="page-title">Center List</h2>
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
            <p>Center List</p>
          </Breadcrumbs>
          <div className="d-flex">
            <input
              className="serch-box-input"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* <button onClick={handleSearch} className="serac-icon" >
              <Icon icon="flowbite:search-outline" />
            </button> */}
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
                  <TableCell
                    className="table-head-cell"
                    onClick={() => handleSort("fullName")}
                  >
                    Center Name{" "}
                    {sortColumn === "fullName" && (
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
                    align="center"
                    onClick={() => handleSort("email")}
                  >
                    Email
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
                  <TableCell className="table-head-cell" align="center">
                    Phone No
                  </TableCell>
                  <TableCell className="table-head-cell" align="center">
                    User
                  </TableCell>
                  <TableCell className="table-head-cell" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCenters?.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell
                      className="table-body-cell"
                      // style={{ width: "25%" }}
                    >
                      <div className="table-body-cell-2">
                        {/* <img className="mini-avatar" src={avatar} /> */}
                        <div>
                          <span>{center?.fullName} </span>
                          {/* <span className="table-email">{center?.email}</span> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-body-cell" align="center">
                      {center?.email}
                    </TableCell>
                    <TableCell className="table-body-cell" align="center">
                      {center?.phone}
                    </TableCell>
                    <TableCell className="table-body-cell" align="center">
                      {center?.user_type}
                    </TableCell>
                    <TableCell className="table-body-cell" align="center">
                      <Icon
                        icon="lets-icons:view-fill"
                        width="26"
                        height="26"
                        style={{
                          color: "#ba890f",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(center)}
                      />

                      <Icon
                        icon="fluent:edit-16-filled"
                        width="20"
                        height="20"
                        style={{
                          color: "#ba890f",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEdit(center)}
                      />
                      <Icon
                        icon="material-symbols:delete-rounded"
                        width="20"
                        height="20"
                        style={{
                          color: "#ba890f",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(center._id)}
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
              count={Math.ceil(filteredCenters.length / CentersPerPage)}
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
  );
};

export default CenterList;
