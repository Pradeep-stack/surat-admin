import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateParentAsync } from "../../../features/parents/parentsThunk";

const UpdateParents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { parent } = location.state;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: parent.fullName,
    email: parent.email,
    phone: parent.phone,
  });

  useEffect(() => {
    setFormData({
      fullName: parent.fullName,
      email: parent.email,
      phone: parent.phone,
    });
  }, [parent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   dispatch(updateParentAsync({ id: parent._id, data: formData }));
  //   toast.success("Parent updated successfully!");
  //   navigate("/parents-list");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateParentAsync({ id: parent._id, data: formData }));
      toast.success("Parent updated successfully!");
      navigate("/parents-list");
    } catch (error) {
      toast.error("Failed to update center.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="main-conent-box">
          <h2 className="page-title">Update Parents </h2>
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
                <Link to="/parents-list"> Parents List</Link>
              </p>
              <p>Update Parents </p>
            </Breadcrumbs>
          </div>
          <div>
            <div className="add-container">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    maxRows={4}
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    maxRows={4}
                  />
                </div>
                <div>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxRows={4}
                  />
                </div>

                <div className="submit-btn-box" disabled={loading}>
                  <button type="submit" className="btn-submit">
                    {loading ? "Updating..." : "Submit"}
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

export default UpdateParents;
