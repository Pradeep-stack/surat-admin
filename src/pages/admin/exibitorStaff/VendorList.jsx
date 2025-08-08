
import React, { useEffect, useState } from "react";
import "../../../assets/css/ParentsPage.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Pagination from "@mui/material/Pagination";
import {
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
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
import AddStallModal from "../../../components/AddStallModal";
import { upadateStallNumber, importUsers } from "../../../api/parents";
import { CommonImage } from "../../../config";

const ExhibitorStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parents = useSelector((state) => state?.parents?.parents);
  const filteredVendor = parents?.filter((parent) => parent?.userType === "staff");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parentsPerPage] = useState(200);
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [deletedDone, setDeletedDone] = useState(0);
  const [stallNumber, setStallNumber] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [filterStall, setFilterStall] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getParentsAsync());
      setLoader(false);
    };
    fetchData();
  }, [dispatch, deletedDone]);

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

  const uniqueStalls = [...new Set(filteredVendor?.map((vendor) => vendor?.stall_number))].filter(Boolean);

  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;

  const filteredParents = filteredVendor
    ?.filter((vendor) => {
      const phoneString = vendor?.phone?.toString() || "";
      const matchesSearch =
        vendor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        phoneString.includes(searchTerm) ||
        vendor?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStall = filterStall === "all" || vendor?.stall_number === filterStall;
      return matchesSearch && matchesStall;
    })
    ?.sort((a, b) => {
      if (sortColumn === "createdAt") {
        const dateA = new Date(a[sortColumn]);
        const dateB = new Date(b[sortColumn]);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = a[sortColumn]?.toString().toLowerCase() || "";
        const valueB = b[sortColumn]?.toString().toLowerCase() || "";
        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  const currentParents = filteredParents?.slice(indexOfFirstParent, indexOfLastParent);

  const handleDelete = (id) => {
    setDeleteTestId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (id) => {
    setDeleteTestId(id);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteParentAsync(deleteTestId));
      toast.success("Deleted Successfully!");
      setDeleteTestId(null);
      setIsDeleteModalOpen(false);
      setDeletedDone((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleConfirmEdit = async () => {
    try {
      await upadateStallNumber(deleteTestId, stallNumber);
      toast.success("Stall number updated successfully!");
      setDeleteTestId(null);
      setIsEditModalOpen(false);
      setDeletedDone((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to update stall number. Please try again.");
    }
  };

  const handleView = (parent) => {
    navigate(`/vendor-details`, { state: { parent } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStallFilterChange = (event) => {
    setFilterStall(event.target.value);
    setCurrentPage(1);
  };

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (!csvFile) {
      toast.error("Please select a CSV file first");
      return;
    }
    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      await importUsers(formData);
      toast.success("Users imported successfully!");
      setDeletedDone((prev) => prev + 1);
      setCsvFile(null);
      document.getElementById("csv-upload").value = "";
    } catch (error) {
      toast.error("Failed to import users. Please check the file format.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadSample = () => {
    const csvContent = [
      "name,email,phone,company,state,city,userType",
      "John Doe,john@example.com,1234567890,ABC Corp,Uttar Pradesh,noida,staff",
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_staff_import.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content-box mb-5">
      <div className="header-section">
        <h2 className="page-title">Exhibitor Staff List</h2>
        <Button
          variant="contained"
          onClick={handleDownloadSample}
          startIcon={<Icon icon="mdi:file-download-outline" />}
          className="download-sample-btn"
        >
          Download Sample
        </Button>
      </div>
      <div className="main-search-box">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <p>
            <Icon className="icon-green" icon="tabler:home-filled" />
            <Link to="/"> Dashboard </Link>
          </p>
          <p>Exhibitor Staff</p>
        </Breadcrumbs>
        <div className="filter-section">
          <TextField
            className="search-box-input"
            variant="outlined"
            size="small"
            placeholder="Search by name, email or phone"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="ion:search" width="20" height="20" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" size="small" className="stall-filter">
            <InputLabel>Stall Number</InputLabel>
            <Select
              value={filterStall}
              onChange={handleStallFilterChange}
              label="Stall Number"
            >
              <MenuItem value="all">All Stalls</MenuItem>
              {uniqueStalls.map((stall) => (
                <MenuItem key={stall} value={stall}>
                  {stall}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="csv-import-section">
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="csv-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<Icon icon="mdi:file-import-outline" />}
                className="select-csv-btn"
              >
                Select CSV
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={handleImport}
              disabled={!csvFile || isImporting}
              startIcon={<Icon icon="mdi:import" />}
              className="import-btn"
            >
              {isImporting ? "Importing..." : "Import"}
            </Button>
            {csvFile && <span className="csv-file-name">{csvFile.name}</span>}
          </div>
        </div>
      </div>

      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <TableContainer className="table-container mt-3">
          <Table className="responsive-table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-head-cell">S.No.</TableCell>
                <TableCell className="table-head-cell">Logo</TableCell>
                <TableCell
                  className="table-head-cell"
                  onClick={() => handleSort("name")}
                  style={{ cursor: "pointer" }}
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
                      className="sort-icon"
                    />
                  )}

                </TableCell>
                <TableCell
                  className="table-head-cell"
                  onClick={() => handleSort("email")}
                  style={{ cursor: "pointer" }}
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
                      className="sort-icon"
                    />
                  )}
                </TableCell>
                <TableCell className="table-head-cell">Company</TableCell>
                <TableCell
                  className="table-head-cell"
                  onClick={() => handleSort("phone")}
                  style={{ cursor: "pointer" }}
                >
                  Phone No
                  {sortColumn === "phone" && (
                    <Icon
                      icon={
                        sortDirection === "asc"
                          ? "material-symbols:arrow-upward"
                          : "material-symbols:arrow-downward"
                      }
                      width="18"
                      height="18"
                      className="sort-icon"
                    />
                  )}
                </TableCell>
                <TableCell className="table-head-cell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentParents?.length > 0 ? (
                currentParents?.map((parent, index) => (
                  <TableRow key={parent.id} className="table-row">
                    <TableCell className="table-body-cell" data-label="S.No.">
                      {index + 1 + (currentPage - 1) * parentsPerPage}
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Logo">
                      <img
                        src={parent?.profile_pic ? parent?.profile_pic : CommonImage}
                        alt={parent?.name}
                        className="profile-image"
                      />
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Name">
                      {parent?.name}
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Email">
                      {parent?.email}
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Company">
                      {parent?.company}
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Phone No">
                      {parent?.phone}
                    </TableCell>
                    <TableCell className="table-body-cell" data-label="Action">
                      <Icon
                        icon="lets-icons:view-fill"
                        width="26"
                        height="26"
                        className="action-icon view-icon"
                        onClick={() => handleView(parent)}
                      />
                      <Icon
                        icon="fluent:edit-16-filled"
                        width="26"
                        height="26"
                        className="action-icon edit-icon"
                        onClick={() => handleEdit(parent.phone)}
                      />
                      <Icon
                        icon="material-symbols:delete-rounded"
                        width="26"
                        height="26"
                        className="action-icon delete-icon"
                        onClick={() => handleDelete(parent.phone)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    No staff found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="pagination-main-box">
        <Grid container justifyContent="center" className="pagination-container">
          <Pagination
            count={Math.ceil(filteredParents.length / parentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        </Grid>
      </div>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <AddStallModal
        setStallNumber={setStallNumber}
        stallNumber={stallNumber}
        open1={isEditModalOpen}
        onClose1={() => setIsEditModalOpen(false)}
        onConfirm1={handleConfirmEdit}
      />
    </div>
  );
};

export default ExhibitorStaff;