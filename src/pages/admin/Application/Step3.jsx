// src/Step1.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Step3 = ({ formData, setFormData, setCurrentStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("dependent")) {
      const [_, index, field] = name.split("-");
      const updatedChildren = [...formData.parentsGrant.parentChildInfo];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };
      setFormData((prevData) => ({
        ...prevData,
        parentsGrant: {
          ...prevData.parentsGrant,
          parentChildInfo: updatedChildren,
        },
      }));
    } else {
      const newValue = type === "radio" ? value === "true" : value;
      setFormData((prevData) => ({
        ...prevData,
        parentsGrant: {
          ...prevData.parentsGrant,
          [name]: newValue,
        },
      }));
    }
  };

  const addChild = () => {
    setFormData((prevState) => ({
      ...prevState,
      parentsGrant: {
        ...prevState.parentsGrant,
        parentChildInfo: [
          ...prevState.parentsGrant.parentChildInfo,
          { forneName: "", surname: "", dob: "", careStartDate: "" },
        ],
      },
    }));
  };

  const removeChild = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      parentsGrant: {
        ...prevState.parentsGrant,
        parentChildInfo: prevState.parentsGrant.parentChildInfo.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  return (
    <div className="main-application-form-box">
      <div className="app-form-secound">
        <Form.Group>
          <h5>
            <span>Section 2</span> {""}
            Parents’ Learning Allowance, Childcare Grant and Adult Dependants’
            Grant
          </h5>
          <div className="app-form-box">
            <div className="col-md-8 col-sm-12">
              <p>
                a) - Are you under 25, living with a partner and applying for
                Childcare Grant or Parents’ Learning Allowance?
              </p>
            </div>
            <div className="col-md-4 col-sm-12 d-flex ">
              <Form.Check
                type="radio"
                label="No"
                name="Under25"
                value={false}
                checked={formData.parentsGrant?.Under25 === false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Yes"
                name="Under25"
                value={true}
                checked={formData.parentsGrant?.Under25 === true}
                onChange={handleChange}
                className="checkbox-margin"
              />
            </div>
          </div>
          <div className="app-form-box">
            <div className="col-md-8 col-sm-12">
              <p>
                b) - Give the total estimated income after Income Tax and
                National Insurance deductions in academic year 2023/24 for:
              </p>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <Form.Control
                type="number"
                placeholder="You"
                name="yourEstimatedIncome"
                value={formData.parentsGrant.yourEstimatedIncome}
                onChange={handleChange}
              />
              <Form.Control
                type="number"
                placeholder="Your partner"
                name="patnerEstimatedIncome"
                value={formData.parentsGrant.patnerEstimatedIncome}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app-form-box">
            <div className="col-md-8 col-sm-12">
              <p>
                How much of this will be Child Tax Credit or the child element
                of Universal Credit for academic year 2023/24?
              </p>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <Form.Control
                type="number"
                placeholder="You"
                name="yourCredit"
                value={formData.parentsGrant.yourCredit}
                onChange={handleChange}
              />
              <Form.Control
                type="number"
                placeholder="Your partner"
                name="patnerCredit"
                value={formData.parentsGrant.patnerCredit}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app-form-box">
            <div className="col-md-8 col-sm-12">
              <p>c1) - Do you want to apply for Childcare Grant?</p>
            </div>
            <div className="col-md-4 col-sm-12 d-flex ">
              <Form.Check
                type="radio"
                label="No"
                name="applyGrant"
                value={false}
                checked={formData.parentsGrant.applyGrant === false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Yes"
                name="applyGrant"
                value={true}
                checked={formData.parentsGrant.applyGrant === true}
                onChange={handleChange}
                className="checkbox-margin"
              />
            </div>
          </div>
          <div className="app-form-box">
            <div className="col-md-8 col-sm-12">
              <p>
                c2)- During the academic year, do you or your partner expect to
                receive:
              </p>
              <ul>
                <li>
                  the childcare element of Working Tax Credit or Universal
                  Credit; or
                </li>
                <li>
                  Tax-Free Childcare from HM Revenue and Customs (HMRC); or
                </li>
                <li>
                  Childcare Allowance from the National Health Service (NHS) as
                  part of a student finance package?
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-12 d-flex ">
              <Form.Check
                type="radio"
                label="No"
                name="hmHmrc"
                value={false}
                checked={formData.parentsGrant.hmHmrc === false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Yes"
                name="hmHmrc"
                value={true}
                checked={formData.parentsGrant.hmHmrc === true}
                onChange={handleChange}
                className="checkbox-margin"
              />
            </div>
          </div>

          {/* Child Details */}
          {formData?.parentsGrant?.parentChildInfo?.map((child, index) => (
            <div key={index}>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>
                    c) - Give details of the children you need Childcare Grant
                    for during this academic year
                  </p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="text"
                    placeholder="Child Forename(s)"
                    name={`dependent-${index}-forneName`}
                    value={child.forneName}
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Surname"
                    name={`dependent-${index}-surname`}
                    value={child.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>Date of birth (DDMMYYYY)</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="date"
                    name={`dependent-${index}-dob`}
                    value={child.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>Childcare start date (DDMMYYYY)</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="date"
                    name={`dependent-${index}-careStartDate`}
                    value={child.careStartDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {index >= 1 && (
                <div className="my-4 d-flex justify-content-end">
                  {" "}
                  <Button
                    onClick={() => removeChild(index)}
                    style={{ background: "rgb(0, 167, 111)" }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
          <div className="my-4 d-flex justify-content-end">
            <Button
              style={{ background: "rgb(0, 167, 111)" }}
              onClick={addChild}
            >
              Add Another Child
            </Button>
          </div>
        </Form.Group>
        <div className="app-form-secound">
          <Form.Group>
            <div className="row">
              {/* d1 - Apply for Adult Dependants' Grant */}
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>d1) - Are you applying for Adult Dependants’ Grant?</p>
                </div>
                <div className="col-md-4 col-sm-12 d-flex">
                  <Form.Check
                    type="radio"
                    label="No"
                    name="rUAFAdultGrant"
                    value={false}
                    checked={formData.parentsGrant.rUAFAdultGrant === false}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="rUAFAdultGrant"
                    value={true}
                    checked={formData.parentsGrant.rUAFAdultGrant === true}
                    onChange={handleChange}
                    className="checkbox-margin"
                  />
                </div>
              </div>

              {/* d2 - Details about the adult dependant */}
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>
                    d2) - Who is your adult dependant? <br />
                    If you are applying for Adult Dependants’ Grant for an adult
                    who is or will be claiming student finance, you are not
                    eligible to apply for an Adult Dependants’ Grant for them.{" "}
                    <br />
                    If at any point during your studies the adult dependent on
                    you claims student finance and you are in receipt of Adult
                    Dependants’ Grant, you should notify us immediately.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="text"
                    placeholder="Adult Dependant's Name"
                    name="adultDependantName"
                    value={formData.parentsGrant.adultDependantName}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Your husband"
                    name="adultDependant"
                    value="Your Husband"
                    checked={
                      formData.parentsGrant.adultDependant === "Your Husband"
                    }
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Your wife"
                    name="adultDependant"
                    value="Your Wife"
                    checked={
                      formData.parentsGrant.adultDependant === "Your Wife"
                    }
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Your civil partner"
                    name="adultDependant"
                    value="Your Civil partner"
                    checked={
                      formData.parentsGrant.adultDependant ===
                      "Your Civil partner"
                    }
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Your partner (if you are 25 or over)"
                    name="adultDependant"
                    value="Your Partner"
                    checked={
                      formData.parentsGrant.adultDependant === "Your Partner"
                    }
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Other adult dependant"
                    name="adultDependant"
                    value="Other"
                    checked={formData.parentsGrant.adultDependant === "Other"}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* d3 - Dependant's income question */}
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>
                    d3) - Will your other adult dependant’s income be more than
                    £3,796 for the academic year 2023/24?
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 d-flex">
                  <Form.Check
                    type="radio"
                    label="No"
                    name="otherAdultDependent"
                    value={false}
                    checked={
                      formData.parentsGrant.otherAdultDependent === false
                    }
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="otherAdultDependent"
                    value={true}
                    checked={formData.parentsGrant.otherAdultDependent === true}
                    onChange={handleChange}
                    className="checkbox-margin"
                  />
                </div>
              </div>
            </div>
          </Form.Group>
        </div>
      </div>
      <div className="app-form-conent">
        <h4>Applying for an Adult Dependants’ Grant</h4>
        <p>
          You will not be able to apply for Adult Dependants’ Grant if your
          other adult dependant’s income is more than £3,796 in the academic
          year 2023/24.
        </p>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>
            d4) - Give your adult dependant’s income for the 2021-22 tax year.
          </p>
          <h6>Income</h6>
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>
            All salary/wages and self-employed income (include income from
            property)
          </p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="text"
            placeholder="Salary/Wages"
            name="allIncome"
            value={formData.parentsGrant.allIncome}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>
            All pension income (including private, occupational and state){" "}
            <br />
            If you receive a lump sum pension, only declare the amount you
            received that you paid tax on.
          </p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="number"
            placeholder="Pension"
            name="allPensionIncome"
            value={formData.parentsGrant.allPensionIncome}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>
            All gross taxable income from interest, investments and dividends
          </p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="number"
            placeholder="Investments"
            name="allGrossIncome"
            value={formData.parentsGrant.allGrossIncome}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>Taxable state benefits</p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="text"
            placeholder="Benefits"
            name="stateBenefits"
            value={formData.parentsGrant.stateBenefits}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>All other taxable income</p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="number"
            placeholder="Other Income"
            name="allTaxableIncom"
            value={formData.parentsGrant.allTaxableIncom}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <h6>Deductions</h6>
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>
            Private pension contributions and Additional Voluntary Contributions
            (AVCs)
          </p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="number"
            placeholder="Enter amount"
            name="avcs"
            value={formData.parentsGrant.avcs}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="app-form-box">
        <div className="col-md-8 col-sm-12">
          <p>Allowable expenses on which tax relief was claimed</p>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form.Control
            type="number"
            placeholder="Enter amount"
            name="taxRelief"
            value={formData.parentsGrant.taxRelief}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="application-next-btn-box">
        <Button
          onClick={() => setCurrentStep(3)}
          style={{
            width: "150px",
            marginRight: "10px",
            background: "rgb(0, 167, 111)",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(5)}
          style={{ width: "150px", background: "rgb(0, 167, 111)" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
