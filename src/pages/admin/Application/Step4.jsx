// src/Step1.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Step4 = ({ formData, setFormData, setCurrentStep, handleSubmit }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeclarationChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...formData.declaration };
    newInfo[name] = value;
    setFormData((prevState) => ({ ...prevState, declaration: newInfo }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      signature: e.target.files[0],
    });
  };

  return (
    <div>
      <div className="app-form-conent">
        <h4>Declaration</h4>
        <ul>
          <li>
            I confirm that to the best of my knowledge and belief, the
            information I have provided is true and complete. If it is not I
            understand I may not receive financial support, any support I have
            received may be withdrawn and I could be prosecuted.
          </li>
          <li>
            I agree to give the Student Loans Company Ltd (SLC) any information
            they require to process my application and agree to tell them
            immediately if my circumstances change in any way that might affect
            my entitlement to financial support. I understand that if I do not
            do this, I may not receive any further payments, and may have to
            repay the financial support I have already received.
          </li>
          <li>
            I agree that in the event of receiving an overpayment of financial
            support, I am obligated to repay this in full.
          </li>
        </ul>
        <h4>Childcare Grant</h4>
        <ul>
          <li>
            I understand and agree that in order to receive Childcare Grant, my
            personal details and my children’s details will be shared to a
            contracted third party who will be handling the administration of
            Childcare Grants on behalf of SLC.
          </li>
          <li>
            I understand that if I do not inform SLC of any change of
            circumstances that affect the amount of Childcare Grant I am
            entitled to, I will have to pay back any overpayment.
          </li>
          <li>
            I confirm that neither I nor my husband, wife, civil partner or
            cohabiting partner have chosen to receive support for childcare from
            the childcare element of: (i) the Working Tax Credit; (ii), the
            Universal Credit; (iii) Tax-Free Childcare; and/or (iv) the NHS
            Childcare Allowance; and I agree to tell SLC immediately if I or my
            husband, wife, civil partner or cohabiting partner does receive this
            support. I understand that SLC reserves the right to share my
            personal data with HMRC to check whether I am in receipt of
            childcare support from HMRC.
          </li>
        </ul>
        <div className="app-form-box">
          <div className="col-md-12 col-sm-12">
            <Form.Control
              type="text"
              placeholder="Your full name (in BLOCK CAPITALS)"
              name="fullNameInC"
              value={formData.declaration.fullNameInC}
              onChange={(e) => handleDeclarationChange(e)}
            />
          </div>
        </div>
        <div className="app-form-box">
          <div className="col-md-6 col-sm-12 p-1">
            <Form.Group>
              <Form.Label>Your signature</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                custom
              />
            </Form.Group>
          </div>
          <div className="col-md-6 col-sm-12">
            <Form.Group>
              <Form.Label>Today’s date </Form.Label>
              <Form.Control
                type="date"
                placeholder="Today’s date (DDMMYYYY)"
                name="todayDate"
                value={formData.declaration.todayDate}
                onChange={(e) => handleDeclarationChange(e)}
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <div className="app-form-conent">
        <h4>Additional notes</h4>
        <p>
          If you are providing extra information please clearly mark what
          section and question the information is about.
        </p>
        <div className="app-form-box">
          <div className="col-md-12 col-sm-12 p-1">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="additionalNotes"
              value={formData.declaration.additionalNotes}
              onChange={(e) => handleDeclarationChange(e)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="application-next-btn-box">
        <Button
          onClick={() => setCurrentStep(4)}
          style={{
            width: "150px",
            marginRight: "10px",
            background: "rgb(0, 167, 111)",
          }}
        >
          Previous
        </Button>
        <Button
          style={{ width: "150px", background: "rgb(0, 167, 111)" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Step4;
