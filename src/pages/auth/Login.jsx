import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/splitup-logo.png";
import "../../assets/css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../features/user/userThunks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData?.email && formData?.password) {
      setLoader(true);
      try {
        const response = await dispatch(loginUserAsync(formData));
        if (response.type === "user/login/fulfilled") {
          // alert("login success full");
          toast.success("Login Successfully!");
          navigate("/");
          setLoader(false);
        } else {
          toast.error("Invaild email or password");
          setLoader(false);
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed");
        setLoader(false);
      }
    } else {
      toast.error("Please Fill The Data");
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="container">

          <div className="left-login-box">
            <div className="login-logo">
              <img  src={logo} alt="User" />
              <h2> Welcome Back </h2>
            </div>

            <div>
              <Form>
                <Form.Group id="email">
                <Form.Label htmlFor="email_id">Email</Form.Label>
                  <Form.Control
                    className="input-grp"
                    autoFocus
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                  />

                </Form.Group>
                <Form.Group>
                  <Form.Group id="password">
                  <Form.Label htmlFor="email_id">Password</Form.Label>
              
                      <Form.Control
                        autoFocus
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Your Password"
                      />
                 
                  </Form.Group>
                </Form.Group>
                <div className="keep-me-logged">
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      label="Keep me logged in"
                    />
                  </Form.Group>
                  {/* <div>
                      <a href="">Forgot Password</a>
                    </div> */}
                </div>

                {!loader ? (
                  <Button
                    type="submit"
                    className="login-btn"
                    onClick={handleSubmit}
                  >
                    Login
                    <FontAwesomeIcon
                      className="login-icon"
                      icon={faArrowRight}
                    />
                  </Button>
                ) : (
                  <Button type="submit" className="login-btn">
                    Login....!
                    <FontAwesomeIcon
                      className="login-icon"
                      icon={faArrowRight}
                    />
                  </Button>
                )}

                {/* <div className="register-link">
                  Don’t have an account yet?
                  <Link style={{ marginLeft: "10px" }} to="/register">
                    Sign up
                  </Link>
                </div> */}
              </Form>
            </div>

          </div>



        </div>
      </div>
    </>
  );
};

export default Login;
