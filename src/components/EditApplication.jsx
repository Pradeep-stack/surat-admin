import React, { useState, useEffect } from "react";
import "../assets/css/UserApplicationFrom.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCentersAsync } from "../features/center/centerThunk";
import {
  getApplicationAsync,
  updateApplicationAsync,
} from "../features/application/applicationThunk";

const EditApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const centers = useSelector((state) => state?.centers?.centers);
  const user = useSelector((state) => state?.user?.user?._id);
  const application = useSelector(
    (state) => state?.applications?.applications?.data?.[0]
  );
  //   console.log("application++++++", application);
  useEffect(() => {
    dispatch(getApplicationAsync(user));
    dispatch(getCentersAsync());
  }, [dispatch, user]);

  const [formValues, setFormValues] = useState({
    centerId: "",
    childName: "",
    motherName: "",
    fatherName: "",
    email: "",
    contact: "",
    emergencyContact: "",
    age: "",
    gender: "",
    grade: "",
    homeAddress: "",
    city: "",
    address: "",
    postalCode: "",
  });

  useEffect(() => {
    if (application) {
      setFormValues({
        centerId: application.centerId[0],
        childName: application.childName,
        motherName: application.motherName,
        fatherName: application.fatherName,
        email: application.email,
        contact: application.contact,
        emergencyContact: application.emergencyContact,
        age: application.age,
        gender: application.gender,
        grade: application.grade,
        homeAddress: application.homeAddress,
        city: application.city,
        address: application.address,
        postalCode: application.postalCode,
      });
    }
  }, [application]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateApplicationAsync({ userId: application._id, formData: formValues })
    );
    toast.success("Application updated successfully!");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <div className="main-conent-box mb-5">
        <h2 className="page-title">Update Application From</h2>

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
          <p>Update Application</p>
        </Breadcrumbs>
        <div className="reg-form-header">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "15ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                id="centerId"
                name="centerId"
                select
                label="Select Center"
                placeholder="Select Center"
                value={formValues.centerId}
                onChange={handleInputChange}
              >
                {centers &&
                  centers.map((center) => (
                    <MenuItem key={center._id} value={center._id}>
                      {center.fullName}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                id="childName"
                name="childName"
                label="Child Name"
                value={formValues.childName}
                onChange={handleInputChange}
              />
              <TextField
                id="motherName"
                name="motherName"
                label="Mother's Name"
                value={formValues.motherName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <TextField
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                value={formValues.fatherName}
                onChange={handleInputChange}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                id="contact"
                name="contact"
                label="Contact"
                value={formValues.contact}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="emergencyContact"
                name="emergencyContact"
                label="Emergency Contact"
                value={formValues.emergencyContact}
                onChange={handleInputChange}
              />
              <TextField
                id="age"
                name="age"
                label="Age"
                value={formValues.age}
                onChange={handleInputChange}
              />
              <FormControl style={{ marginLeft: "20px" }}>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="gender-label"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <TextField
                id="grade"
                name="grade"
                label="Grade"
                value={formValues.grade}
                onChange={handleInputChange}
              />
              <TextField
                id="homeAddress"
                name="homeAddress"
                label="Home Address"
                value={formValues.homeAddress}
                onChange={handleInputChange}
              />
              <TextField
                id="city"
                name="city"
                label="City"
                value={formValues.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="address"
                name="address"
                label="State"
                value={formValues.address}
                onChange={handleInputChange}
              />
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                value={formValues.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="app-submit-btn">
              <button type="submit" className="app-btn-submit">
                Update
              </button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EditApplication;
