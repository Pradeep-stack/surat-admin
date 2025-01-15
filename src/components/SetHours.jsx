import React, { useState, useEffect } from "react";
import "../assets/css/Hours.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addHours, getHours } from "../api/Hours";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "./Loader";

const SetHours = () => {
  const [formData, setFormData] = useState({
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [hoursData, setHoursData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !formData.optionOne ||
      !formData.optionTwo ||
      !formData.optionThree ||
      !formData.optionFour
    ) {
      setErrorMsg(true);
      window.scrollTo(0, 0);
      setLoading(false);
      return;
    }
    try {
      const response = await addHours(formData);
      if (response) {
        toast.success("Form submitted successfully!");
        fetchHours();
        setFormData({
          optionOne: "",
          optionTwo: "",
          optionThree: "",
          optionFour: "",
        });
      } else {
        console.log("validation error");
      }
    } catch (error) {
      console.error("Error adding form:", error);
      toast.error("Error adding form");
    } finally {
      setLoading(false);
    }
  };
  const fetchHours = async () => {
    setLoader(true);
    const response = await getHours();
    setLoader(false);
    setHoursData(response);
  };
  useEffect(() => {
    fetchHours();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="main-content-box">
          {/* <h2 className="page-title">Add Hours</h2> */}
          <h4>Number of hours claimed per week</h4>
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
              <p>
                <Icon
                  className="icon-green"
                  style={{ fontSize: "20px", marginBottom: "7px" }}
                />
                <Link> Add</Link>
              </p>
              {/* <p>List </p> */}
            </Breadcrumbs>
          </div>
          <div>
            <div className="add-container">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "97%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <TextField
                      type="number"
                      id="optionOne"
                      label="Option 1"
                      maxRows={4}
                      value={formData.optionOne}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.optionOne && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>

                  <div className="col col-md-6 col-sm-12">
                    <TextField
                      type="number"
                      id="optionTwo"
                      label="Option 2"
                      maxRows={4}
                      value={formData.optionTwo}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.optionTwo && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <TextField
                      type="number"
                      id="optionThree"
                      label="Option 3"
                      maxRows={4}
                      value={formData.optionThree}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.optionThree && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <TextField
                      type="number"
                      id="optionFour"
                      label="Option 4"
                      maxRows={4}
                      value={formData.optionFour}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.optionFour && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="submit-btn-box">
                  <button type="submit" className="btn-submit">
                    {loading ? "submitted..." : "Submit"}
                  </button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="main-content-box mb-5">
          <TableContainer
            className="table-container mt-3"
            style={{ width: "97.5%", margin: "auto" }}
          >
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell">Option 1</TableCell>
                  <TableCell className="table-head-cell" align="center">
                    Option 2
                  </TableCell>
                  <TableCell className="table-head-cell" align="center">
                    Option 3
                  </TableCell>
                  <TableCell className="table-head-cell" align="center">
                    Option 4
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="table-body-cell">
                    {hoursData?.optionOne} Hour
                  </TableCell>
                  <TableCell className="table-body-cell" align="center">
                    {hoursData?.optionTwo} Hour
                  </TableCell>
                  <TableCell className="table-body-cell" align="center">
                    {hoursData?.optionThree} Hour
                  </TableCell>
                  <TableCell className="table-body-cell" align="center">
                    {hoursData?.optionFour} Hour
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default SetHours;
