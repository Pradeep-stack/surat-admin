import React, { useState, useEffect } from "react";
import "../../../assets/css/AddTestimonial.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addVideoAsync } from "../../../features/video/videoThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCategories } from "../../../api/videos";
import { uploadImage } from "../../../api/videos";
import { addProducts } from "../../../api/videos";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
const AddVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [names, setcategories] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const fetchApplication = async () => {
    try {
      const resonse = await getCategories();
      setcategories(resonse?.data?.map((item) => item.name));
    } catch (error) {
      console.log("error in getting reposnse from api");
    }
  };
  useEffect(() => {
    fetchApplication();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!formData.title) {
      setErrorMsg(true);
      window.scrollTo(0, 0);
      setLoading(false);
      return;
    }
    try {
      const testimonialData = {
        category: personName[0],
        img_url:
          "https://firebasestorage.googleapis.com/v0/b/splituppay.firebasestorage.app/o/catImages%2Fd1.png?alt=media&token=54fbbdda-3fac-4fac-b927-aaaa4b1ad926",
        name: formData.title,
        video_url: formData.url,
        description: formData.description,
      };
      const response = await addProducts(testimonialData);
      console.log("testimonialData", testimonialData);
      toast.success("Category Added Successfully!");
      setTimeout(() => {
        navigate("/video");
      }, 3000);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Error adding testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="main-conent-box">
          <h2 className="page-title">Add Modules</h2>
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
                <Link to="/video"> Modules List</Link>
              </p>
              <p>Add Modules </p>
            </Breadcrumbs>
          </div>
          <div>
            {/* <h2 style={{ marginLeft: "20px", marginTop: "20px" }}>New Video</h2> */}
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
                      id="title"
                      label="Modules Title"
                      maxRows={4}
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.title && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>

                  <div className="col col-md-6 col-sm-12">
                    <TextField
                      id="url"
                      label="URL"
                      maxRows={4}
                      value={formData.url}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.url && (
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
                      id="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errorMsg && !formData.description && (
                      <span className="alert-input" style={{ color: "red" }}>
                        {" "}
                        this is required
                      </span>
                    )}
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <FormControl sx={{ m: 1, width: 560 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="category"
                        multiple
                        value={personName}
                        onChange={handleChange1}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
    </>
  );
};

export default AddVideo;
