// src/Step1.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Step1 = ({ setCurrentStep, formData, setFormData }) => {
  const handleDependantIncome = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...formData.dependantGrantsInfo };
    newInfo[name] = value;
    setFormData((prevState) => ({
      ...prevState,
      dependantGrantsInfo: newInfo,
    }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="main-application-form-box">
        <Form.Group>
          <div className="row">
            <h5>
              <span>2023/24</span> Application form for Dependants’ Grants{" "}
              <span>sfe</span>
            </h5>
            <p>
              To find out how we’ll use the information you provide go to
              <span>www.gov.uk/studentfinance</span> to read our Privacy Notice
              before completing this form.
            </p>
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Customer Reference Number</Form.Label>
              </div>
              <div className="col-md-8 col-sm-12">
                <Form.Control
                  type="number"
                  name="dReferenceNumber"
                  value={formData.dependantGrantsInfo.dReferenceNumber}
                  onChange={(e) => handleDependantIncome(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="row">
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Name</Form.Label>
              </div>
              <div className="col-md-8 col-sm-12">
                <Form.Control
                  type="text"
                  name="dGrantName"
                  value={formData.dependantGrantsInfo.dGrantName}
                  onChange={(e) => handleDependantIncome(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="row">
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Date of birth (DDMMYYYY)</Form.Label>
              </div>
              <div className="col-md-8 col-sm-12">
                <Form.Control
                  type="date"
                  name="dGrantDOB"
                  value={formData.dependantGrantsInfo.dGrantDOB}
                  onChange={(e) => handleDependantIncome(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="row">
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Contact address</Form.Label>
              </div>
              <div className="col-md-8 col-sm-12">
                <Form.Control
                  type="text"
                  name="dContectAdd"
                  value={formData.dependantGrantsInfo.dContectAdd}
                  onChange={(e) => handleDependantIncome(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="row">
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Postcode</Form.Label>
              </div>
              <div className="col-md-8 col-sm-12">
                <Form.Control
                  type="text"
                  name="dPostalCode"
                  value={formData.dependantGrantsInfo.dPostalCode}
                  onChange={(e) => handleDependantIncome(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>

        <div className="app-form-conent">
          <h4>Who should complete this form?</h4>
          <p>
            Complete this form if you want to apply for any of the following
            Dependants’ Grants:
          </p>
          <ul>
            <li> Parents’ Learning Allowance</li>
            <li>Childcare Grant</li>
            <li>Adult Dependants’ Grant</li>
          </ul>
          <p>
            Also use this form if you have already applied for Childcare Grant
            and want to add additional children.
          </p>
          <p>
            If you no longer need Childcare Grant for one or more of your
            children call us on 0300 100 0607. If you are applying for Adult
            Dependants’ Grant for an adult who is or will be claiming student
            finance, you are not eligible to apply for an Adult Dependants’
            Grant for them. If at any point during your studies the adult
            dependent on you claims student finance and you are in receipt of
            Adult Dependants’ Grant, you should notify us immediately. For more
            information on Dependants’ Grants go to www.gov.uk/studentfinance
          </p>
          <h4>How do I complete this form?</h4>
          <ul>
            <li>
              {" "}
              Answer every question in sections 1 & 2, then sign and date the
              declaration.{" "}
            </li>
            <li>
              If any questions do not apply to you, please write ‘N/A’ or ‘None’
              as your answer.
            </li>
            <li>
              You need to send evidence with your application whenever you see
              this icon.
            </li>
            <li>
              If any questions are left blank we will not be able to process
              this application.
            </li>
            <li>
              Any photocopied financial documents you send to us with this form
              will be securely destroyed once we have checked them.
            </li>
          </ul>
          <h4>Where do I send my form?</h4>
          <p>
            Once you have completed this form, signed and dated the declaration,
            please return it to{" "}
          </p>
          <h6>Student Finance England </h6>
          <h6>PO Box 210 </h6>
          <h6>Darlington </h6>
          <h6>DL1 9HJ </h6>
        </div>
        <div className="application-next-btn-box">
          {" "}
          <Button
            onClick={() => setCurrentStep(3)}
            style={{ width: "150px", background: "rgb(0, 167, 111)" }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step1;
