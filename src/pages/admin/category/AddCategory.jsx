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
import { uploadImage } from "../../../api/videos";
import { addCategory } from "../../../api/videos";
const AddCategory = () => {
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // const reader = new FileReader();

    // reader.onload = () => {
    //   setSelectedImage(reader.result);
    // };
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData);
      setSelectedImage(response?.Location);
      console.log("response+++++++++++", response?.Location);
      
    } catch (error) {
      console.log("error", error);
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
      !formData.postTitle 
    ) {
      setErrorMsg(true);
      window.scrollTo(0, 0);
      setLoading(false);
      return;
    }

    try {
      const testimonialData = {
        name: formData.tag,
        imageUrl:selectedImage,
        postCount:formData.postTitle,
        video_url:formData.description
      };
      const response = await addCategory(testimonialData);

        toast.success("Category Added Successfully!");
        setTimeout(() => {
          navigate("/category-list");
        }, 3000);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Error adding testimonial");
    } finally {
      setSelectedImage(null);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadImage(formData);
    console.log("response", response);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="main-conent-box">
          <h2 className="page-title">Add Category</h2>
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
                <Link to="/testimonial-list"> Category List</Link>
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
                        label="Post Count"
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
                        label="Video Url"
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
                      {/* <FormControlLabel
                        control={
                          <Switch
                            checked={formData.enableComments}
                            onChange={handleSwitchChange("enableComments")}
                          />
                        }
                        label="
                  Enable comments"
                      /> */}
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.publis}
                            onChange={handleSwitchChange("publis")}
                          />
                        }
                        label="
                  ACtive"
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

export default AddCategory;
