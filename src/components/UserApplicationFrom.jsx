import { useState, useEffect } from "react";
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
import { addApplicationAsync } from "../features/application/applicationThunk";

const UserApplicationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const centers = useSelector((state) => state?.centers?.centers);
  const user = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "",
    grade: "",
    email: "",
    contact: "",
    emergencyContact: "",
    centerId: "",
    motherName: "",
    fatherName: "",
    homeAddress: "",
    city: "",
    postalCode: "",
    address: "",
    userId: user._id,
  });

  useEffect(() => {
    dispatch(getCentersAsync());
  }, [dispatch]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.childName) tempErrors.childName = "Child name is required";
    if (!formData.age) tempErrors.age = "Age is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.grade) tempErrors.grade = "Grade is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.contact) tempErrors.contact = "Contact is required";
    if (!formData.emergencyContact)
      tempErrors.emergencyContact = "Emergency contact is required";
    if (!formData.centerId) tempErrors.centerId = "Center is required";
    if (!formData.motherName)
      tempErrors.motherName = "Mother's name is required";
    if (!formData.fatherName)
      tempErrors.fatherName = "Father's name is required";
    if (!formData.homeAddress)
      tempErrors.homeAddress = "Home address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.postalCode) tempErrors.postalCode = "Postal code is required";
    if (!formData.address) tempErrors.address = "State is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) return;
    try {
      dispatch(addApplicationAsync(formData));
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error adding application:", error);
      toast.error("Error adding application");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-conent-box mb-5">
        <h2 className="page-title">Application From</h2>

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
          <p>Add Application</p>
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
                value={formData.centerId}
                onChange={handleChange}
                error={!!errors.centerId}
                helperText={errors.centerId}
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
                value={formData.childName}
                onChange={handleChange}
                error={!!errors.childName}
                helperText={errors.childName}
              />
              <TextField
                id="motherName"
                name="motherName"
                label="Mother's Name"
                value={formData.motherName}
                onChange={handleChange}
                error={!!errors.motherName}
                helperText={errors.motherName}
              />
            </div>

            <div>
              <TextField
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                value={formData.fatherName}
                onChange={handleChange}
                error={!!errors.fatherName}
                helperText={errors.fatherName}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id="contact"
                name="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
                inputProps={{ type: "number" }}
                error={!!errors.contact}
                helperText={errors.contact}
              />
            </div>
            <div>
              <TextField
                id="emergencyContact"
                name="emergencyContact"
                label="Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleChange}
                inputProps={{ type: "number" }}
                error={!!errors.emergencyContact}
                helperText={errors.emergencyContact}
              />
              <TextField
                id="age"
                name="age"
                label="Age"
                value={formData.age}
                onChange={handleChange}
                inputProps={{ type: "number" }}
                error={!!errors.age}
                helperText={errors.age}
              />
              <FormControl style={{ marginLeft: "20px" }}>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="gender-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
                {/* {errors.gender && (
                  <p
                    style={{
                      color: "red",
                      margin: "0 0 0 10px",
                      fontSize: "12px",
                    }}
                  >
                    {errors.gender}
                  </p>
                )} */}
              </FormControl>
            </div>
            <div>
              <TextField
                id="grade"
                name="grade"
                label="Grade"
                value={formData.grade}
                onChange={handleChange}
                error={!!errors.grade}
                helperText={errors.grade}
              />
              <TextField
                id="homeAddress"
                name="homeAddress"
                label="Home Address"
                value={formData.homeAddress}
                onChange={handleChange}
                error={!!errors.homeAddress}
                helperText={errors.homeAddress}
              />
              <TextField
                id="city"
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </div>
            <div>
              <TextField
                id="address"
                name="address"
                label="State"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
              />
            </div>

            <div className="app-submit-btn">
              <button
                type="submit"
                className="app-btn-submit"
                disabled={loading}
              >
                {loading ? "Submitted..." : "Submit"}
              </button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default UserApplicationForm;
