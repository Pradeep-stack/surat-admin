import { useState } from "react";
import "../../../assets/css/AddTestimonial.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Fileimg from "../../../assets/images/upload.png";
import { useDispatch } from "react-redux";
import { addTestimonialAsync } from "../../../features/testimonial/testinmonialThunks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const AddTestimonial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postTitle: "",
    tag: "",
    description: "",
    contant: "",
    metaTag: "",
    metaKeyword: "",
    metaDescription: "",
    enableComments: false,
    publis: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSwitchChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.postTitle ||
      !formData.tag ||
      !formData.description ||
      !formData.contant ||
      !formData.metaTag ||
      !formData.metaKeyword ||
      !formData.metaDescription
    ) {
      setErrorMsg(true);
      window.scrollTo(0, 0);
      setLoading(false);
      return;
    }

    try {
      const testimonialData = {
        ...formData,
        cover: selectedImage,
      };
      const response = await dispatch(addTestimonialAsync(testimonialData));
      if (response.type === "testimonial/addTestimonial/fulfilled") {
        toast.success("Testimonial Added Successfully!");
        setTimeout(() => {
          navigate("/testimonial-list");
        }, 3000);
        return;
      }
      console.error("Error adding testimonial");
      toast.error("Please fill out all fields.");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Error adding testimonial");
    } finally {
      setSelectedImage(null);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="main-conent-box">
          <h2 className="page-title">Add Event</h2>
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
                <Link to="/testimonial-list"> Event List</Link>
              </p>
              <p>Add Event </p>
            </Breadcrumbs>
          </div>
          <div>
            <div className="add-container">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "95%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="tag"
                        label="Name"
                        value={formData.tag}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.tag && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="postTitle"
                        label="Post title"
                        value={formData.postTitle}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.postTitle && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
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
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="contant"
                        label="Content"
                        multiline
                        rows={4}
                        value={formData.contant}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.contant && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="metaTag"
                        label="Meta Title"
                        value={formData.metaTag}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.metaTag && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="metaKeyword"
                        label="Meta Keywords"
                        value={formData.metaKeyword}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.metaKeyword && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <div className="add-input-fields">
                      <TextField
                        id="metaDescription"
                        label="Meta Description"
                        multiline
                        rows={4}
                        value={formData.metaDescription}
                        onChange={handleChange}
                      />
                      {errorMsg && !formData.metaDescription && (
                        <span className="alert-input" style={{ color: "red" }}>
                          {" "}
                          this is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <label htmlFor="input-file" className="drop-area">
                      <input
                        type="file"
                        accept="image/*"
                        id="input-file"
                        hidden
                        onChange={handleFileChange}
                      />
                      <div className="img-view">
                        {selectedImage ? (
                          <img src={selectedImage} alt="Selected" />
                        ) : (
                          <>
                            <img src={Fileimg} alt="Default" />
                            <p>Drag and drop or Click here to upload image</p>
                            <span>Upload any image from desktop</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.enableComments}
                            onChange={handleSwitchChange("enableComments")}
                          />
                        }
                        label="
                  Enable comments"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.publis}
                            onChange={handleSwitchChange("publis")}
                          />
                        }
                        label="
                  Publish"
                      />
                    </FormGroup>
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <div className="submit-btn-box">
                      <button type="submit" className="btn-submit">
                        {loading ? "Submitted..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTestimonial;
