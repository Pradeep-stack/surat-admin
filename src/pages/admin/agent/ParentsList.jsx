import { useEffect, useState } from "react";
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
import { CommonImage } from "../../../config";
import { importUsers } from "../../../api/parents";

const ParentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parents = useSelector((state) => state?.parents?.parents);
  const filteredUser = parents?.filter(
    (parent) => parent?.userType === "agent"
  );
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parentsPerPage] = useState(20);
  const [deleteTestId, setDeleteTestId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [deletedDone, setDeletedDone] = useState(0);
  const [filterCompany, setFilterCompany] = useState("all");
  const [csvFile, setCsvFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

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

  // Get unique companies for filter dropdown
  const uniqueCompanies = [
    ...new Set(filteredUser?.map((parent) => parent?.company)),
  ].filter(Boolean);

  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;

  const filteredParents = filteredUser
    ?.filter((parent) => {
      // Convert phone to string for searching
      const phoneString = parent?.phone?.toString() || "";

      // Search filter
      const matchesSearch =
        parent?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        phoneString.includes(searchTerm) ||
        parent?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      // Company filter
      const matchesCompany =
        filterCompany === "all" || parent?.company === filterCompany;

      return matchesSearch && matchesCompany;
    })
    ?.sort((a, b) => {
      if (sortColumn === "createdAt") {
        const dateA = new Date(a[sortColumn]);
        const dateB = new Date(b[sortColumn]);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = a[sortColumn]?.toString().toLowerCase();
        const valueB = b[sortColumn]?.toString().toLowerCase();

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
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
      await dispatch(deleteParentAsync(deleteTestId));
      toast.success("Deleted Successfully!");
      setDeleteTestId(null);
      setIsDeleteModalOpen(false);
      setDeletedDone((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleView = (parent) => {
    navigate(`/parent-details`, { state: { parent } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCompanyFilterChange = (event) => {
    setFilterCompany(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
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
    // CSV headers and sample data
    const csvContent = [
      "name,email,phone,company, state, city, userType",
      "John Doe,john@example.com,1234567890,ABC Corp,Uttar Pradesh,noida,agent",  
    ].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_agent_import.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="main-conent-box mb-5">
        
         <div className="d-flex justify-content-between align-items-center">
         <h2 className="page-title">Agent List</h2>  <Button
                        variant="contained"
                        onClick={handleDownloadSample}
                        startIcon={<Icon icon="mdi:file-download-outline" />}
                        style={{ backgroundColor: "#1976d2", color: "white" }}
                      >
                        Download Sample
                      </Button>
                </div>
        <div className="main-serch-box">
          <Breadcrumbs aria-label="breadcrumb">
            <p>
              <Icon
                className="icon-green"
                style={{ fontSize: "20px", marginBottom: "7px" }}
                icon="tabler:home-filled"
              />
              <Link to="/"> Dashboard </Link>
            </p>
            <p>Agent</p>
          </Breadcrumbs>

          <div className="d-flex" style={{ gap: "15px" }}>
            <TextField
              className="serch-box-input"
              variant="outlined"
              size="small"
              placeholder="Search by name, phone or company"
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

            <FormControl
              variant="outlined"
              size="small"
              style={{ minWidth: 120 }}
            >
              <InputLabel>Company</InputLabel>
              <Select
                value={filterCompany}
                onChange={handleCompanyFilterChange}
                label="Company"
              >
                <MenuItem value="all">All Companies</MenuItem>
                {uniqueCompanies.map((company) => (
                  <MenuItem key={company} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* CSV Import Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                  style={{ backgroundColor: "#008000", color: "white" }}
                >
                  Select CSV
                </Button>
              </label>
              <Button
                variant="contained"
                onClick={handleImport}
                disabled={!csvFile || isImporting}
                startIcon={<Icon icon="mdi:import" />}
                style={{ backgroundColor: "#ba890f", color: "white" }}
              >
                {isImporting ? "Importing..." : "Import"}
              </Button>
             
              {csvFile && (
                <span style={{ marginLeft: "10px" }}>{csvFile.name}</span>
              )}
             
            </div>
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
                  <TableCell className="table-head-cell">Image</TableCell>
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
                        style={{
                          marginLeft: "5px",
                          color: "#ba890f",
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell
                    className="table-head-cell"
                    onClick={() => handleSort("company")}
                    style={{ cursor: "pointer" }}
                  >
                    Company
                    {sortColumn === "company" && (
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
                        style={{
                          marginLeft: "5px",
                          color: "#ba890f",
                        }}
                      />
                    )}
                  </TableCell>
                  {/* <TableCell className="table-head-cell">Status</TableCell> */}
                  <TableCell className="table-head-cell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentParents?.length > 0 ? (
                  currentParents?.map((parent, index) => (
                    <TableRow key={parent.id}>
                      <TableCell className="table-body-cell">
                        {index + 1 + (currentPage - 1) * parentsPerPage}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        <div className="table-body-cell-2">
                          <div>
                            <img
                              src={
                                parent?.profile_pic
                                  ? parent?.profile_pic
                                  : CommonImage
                              }
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

                      <TableCell className="table-body-cell">
                        {parent?.company}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {parent?.phone}
                      </TableCell>
                      {/* <TableCell className="table-body-cell">
                        {parent?.isWatched ? (
                          <span style={{ color: "green" }}> Watched</span>
                        ) : (
                          <span style={{ color: "red" }}>Not Watched</span>
                        )}
                      </TableCell> */}
                      <TableCell className="table-body-cell">
                        {/* <Icon
                          icon="lets-icons:view-fill"
                          width="26"
                          height="26"
                          style={{
                            color: "#ba890f",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleView(parent)}
                        /> */}
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
                      No parents found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
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
  );
};

export default ParentsList;
