import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import avatar from "../../assets/images/user.png";
import firmIcon from "../../assets/images/building.png";
import logo from "../../assets/images/splitup-logo.png";
import "../../assets/css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const [activeForm, setForm] = useState("user");
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: null,
    password: "",
    user_type: activeForm,
  });

  const [centerFormData, setCenterFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: null,
    user_type: activeForm,
  });
  // const handleFormUser = () => {
  //   setForm("user");
  // };
  // const handleFormFirm = () => {
  //   setForm("firm");
  // };
  const handleFormUser = () => {
    setForm("user");
    setFormData({
      ...formData,
      user_type: "user",
    });
  };

  const handleFormFirm = () => {
    setForm("center");
    setCenterFormData({
      ...centerFormData,
      user_type: "center",
    });
  };

  const handleInputeChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCenterInputChange = (event) => {
    const { name, value } = event.target;
    setCenterFormData({
      ...centerFormData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeForm === "user") {
      if (!formData.email && !formData.fullName && !formData.password && !formData.phone) {
        toast.error("Please fill the data..!");
        return
      }
      setLoader(true);
      const response = await dispatch(
        registerUserAsync({ ...formData, username: formData.email })
      );
      if (response.type !== "user/register/rejected") {
        toast.success("Register Successfully!");
        navigate("/login");
        setLoader(false);
      } else {
        toast.error("Email or phone alreday registred");
        setLoader(false);
      }
    }
    if (activeForm === "center") {
      if (!centerFormData.email && !centerFormData.fullName && !centerFormData.password && !centerFormData.phone) {
        toast.error("Please fill the data..!");
        return
      }
      setLoader(true);
      const response = await dispatch(
        registerUserAsync({ ...centerFormData, username: centerFormData.email })
      );
      console.log("response", response)
      if (response.type !== "user/register/rejected") {
        toast.success("Register Successfully!");
        navigate("/login");
        setLoader(false);
      } else {
        toast.error("Email or phone alreday registred");
        setLoader(false);
      }
    }
  };


  return (
    <>
      <div className="register-main-box">
        <Container style={{backgroundColor: "#f7f7f7"}} className="reg-form-container">
          <Row
            className={`p-3 ${activeForm === "user" ? "design-right" : " design-left"
              }`}
          >
            <Col
              md={7}
              className="p-4 design-element reg-form-left"
              style={{ opacity: activeForm === "user" ? 1 : 0 }}
            >
              <div className="reg-form-header">Sign Up</div>
              <div style={{ marginTop: "10px" }}>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        style={{ marginRight: "5px" }}
                        className="mb-2"
                      >
                        <Form.Label htmlFor="first_name">
                          First Name
                        </Form.Label>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputeChange}
                          placeholder="First Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        style={{ marginLeft: "5px" }}
                        className="mb-2"
                      >
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          name="last name"
                          placeholder="Last Name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group id="email">
                    <Form.Label htmlFor="email_id">Email</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputeChange}
                      placeholder="Your Email"
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label htmlFor="email_id">Password</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputeChange}
                      placeholder="Your Password"
                    />
                  </Form.Group>

                  <Row>
                    <Col xs={12}>
                      <Form.Group
                        // style={{ marginLeft: "5px" }}
                        className="mb-2"
                      >
                        <Form.Label htmlFor="mobile_number">
                          Mobile Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          className="form-control"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]*"
                          placeholder="Mobile Number"
                          value={formData.phone}
                          onChange={handleInputeChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="login-btn"
                    onClick={handleSubmit}
                  >
                    {loader ? "Process.." : "Sign Up"}
                    <FontAwesomeIcon
                      className="login-icon"
                      icon={faArrowRight}
                    />
                  </Button>

                  <div className="register-link">
                    Already have an account?
                    <Link style={{ marginLeft: "10px" }} to="/">
                      Sign in
                    </Link>
                  </div>

                </Form>
              </div>
            </Col>
            <Col md={5} className="p-2 design-element  reg-form-overlay">
              <Row>
                <Col md={12}>
                  <div>
                    <img width={"200px"} src={logo} alt="User" />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="reg-right-text">
                    <h3>Your App For Navigating Family Court.</h3>
                    <p>
                      Learn from the top trainer and give yourself More Text
                      Here
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <div className="reset-text">

              <Link style={{ marginLeft: "10px" }} to="/">
                <svg
                  fill="#000000"
                  width="25px"
                  height="15px"
                  viewBox="0 0 200 250"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z" />
                </svg>
                Back to home page
              </Link>

            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
