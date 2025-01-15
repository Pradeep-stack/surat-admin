// src/Step1.js
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCentersAsync } from "../../../features/center/centerThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationRegister = ({ formData, setFormData, setCurrentStep }) => {
  const dispatch = useDispatch();
  const centers = useSelector((state) => state?.centers?.centers);
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCentersAsync());
  }, [dispatch]);

  useEffect(() => {
    const isValid =
      formData.centerId && formData.name && formData.email && formData.contact;
    setIsFormValid(isValid);
  }, [formData]);

  const handleNextClick = () => {
    if (!isFormValid) {
      toast.error("Please fill out all fields.");
      return;
    }
    setCurrentStep(2);
  };

  // const handleChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If the input is a number field, limit it to 10 digits
    if (name === 'contact') {
      const maxLength = 10;
      // Using regex to allow only digits and limit the length
      if (value.length <= maxLength && /^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  return (
    <>
      <div className="main-application-form-box">
        <Form>
          <Form.Group>
            <div className="row">
                <div className="col-md-4 col-sm-12">
                  <Form.Label htmlFor="centerId">Select Center</Form.Label>
                </div>
                <div className="col-md-8 col-sm-12">
                  <Form.Control
                    as="select"
                    id="centerId"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleChange}
                    className="form-select"
                    style={{ borderColor: "black" }}
                    required
                  >
                    <option value="">Select Center</option>
                    {centers &&
                      centers.map((center) => (
                        <option key={center._id} value={center._id}>
                          {center.fullName}
                        </option>
                      ))}
                  </Form.Control>
                </div>
              
                <div className="col-md-4 col-sm-12">
                  <Form.Label htmlFor="name">Full Name</Form.Label>
                </div>
                <div className="col-md-8 col-sm-12">
                  <Form.Control
                    id="name"
                    name="name"
                    type="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ borderColor: "black" }}
                    required
                  />
                </div>
             
                <div className="col-md-4 col-sm-12">
                  <Form.Label htmlFor="email">Email</Form.Label>
                </div>
                <div className="col-md-8 col-sm-12">
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ borderColor: "black" }}
                    required
                  />
                </div>
             
             
                <div className="col-md-4 col-sm-12">
                  <Form.Label htmlFor="contact">Contact</Form.Label>
                </div>
                <div className="col-md-8 col-sm-12">
                  <Form.Control
                    id="contact"
                    name="contact"
                    type="number"
                    value={formData.contact}
                    onChange={handleChange}
                    style={{ borderColor: "black" }}
                    maxLength={10}
                    required
                  />
                </div>
            </div>
          </Form.Group>
          <div className="application-next-btn-box">
            <Button
              onClick={handleNextClick}
              style={{
                width: "150px",
                background: "rgb(0, 167, 111)",
                border: "none",
              }}
            >
              Next
            </Button>
            
          </div>
        </Form>
      </div>
    </>
  );
};

export default ApplicationRegister;
