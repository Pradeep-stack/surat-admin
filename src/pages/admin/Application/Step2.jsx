// src/Step1.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Step2 = ({ formData, setFormData, setCurrentStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the field belongs to dependent children
    if (name.includes("dependent")) {
      const [_, index, field] = name.split("-");
      const updatedChildren = [...formData.studentFinancial.sfDependentChild];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };
      setFormData((prevData) => ({
        ...prevData,
        studentFinancial: {
          ...prevData.studentFinancial,
          sfDependentChild: updatedChildren,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const addMoreChild = () => {
    setFormData((prevData) => ({
      ...prevData,
      studentFinancial: {
        ...prevData.studentFinancial,
        sfDependentChild: [
          ...prevData.studentFinancial.sfDependentChild,
          {
            fullName: "",
            relationToYou: "",
            childDOB: "",
            childLiveWith: "",
            totalIncome: null,
          },
        ],
      },
    }));
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = [...formData.studentFinancial.sfDependentChild];
    updatedChildren.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      studentFinancial: {
        ...prevData.studentFinancial,
        sfDependentChild: updatedChildren,
      },
    }));
  };

  const handleStudentFinancial = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...formData.studentFinancial };
    newInfo[name] = value;
    setFormData((prevState) => ({ ...prevState, studentFinancial: newInfo }));
  };
  return (
    <div className="main-application-form-box">
      <div className="app-form-secound">
        {/* <h5>
          {" "}
          <span>Section 1</span> Student financial questions
        </h5> */}
        <Form.Group>
          <div className="row">
            <h5>
              {" "}
              <span>Section 1</span> Student financial questions
            </h5>
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Unearned income</Form.Label>
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-6 col-sm-12">
                <p>
                  a) - i) Estimate the total taxable unearned income, before
                  deductions, that you expect to receive in academic year
                  2023/24.
                </p>
                <p>ii) What is the source of this income?</p>
              </div>

              <div className="col-md-6 col-sm-12">
                <Form.Control
                   type="number"
                  name="sfTotalIncome"
                  value={formData.studentFinancial.sfTotalIncome}
                  onChange={(e) => handleStudentFinancial(e)}
                />
                <Form.Control
                  as="textarea"
                  name="sfIncomeSource"
                  rows={2}
                  value={formData.studentFinancial.sfIncomeSource}
                  onChange={(e) => handleStudentFinancial(e)}
                />
              </div>
            </div>
          </div>
        </Form.Group>
      </div>
      <div className="app-form-conent">
        <h6>What is taxable unearned income?</h6>
        <p>
          Taxable unearned income is any income you receive from the following
          sources:
        </p>
        <div className="row">
          <div className="app-form-box">
            <div className="col-md-6 col-sm-12">
              <ul>
                <li>Bank or building society gross interest</li>
                <li>Property, lettings or rent</li>
                <li>Dividends or investments</li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-12">
              <ul>
                <li>Trusts or sponsorships</li>
                <li>Any other payment received for attending the course</li>
              </ul>
            </div>
          </div>
        </div>
        <h6>Don’t include any:</h6>
        <div className="row">
          <div className="app-form-box">
            <div className="col-md-6 col-sm-12">
              <ul>
                <li>Earnings from full or part-time work</li>
                <li>Maintenance Loan or grant payments you may receive</li>
                <li>Payments you receive from parents under a covenant</li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-12">
              <ul>
                <li>Teacher Training Bursaries</li>
                <li>Higher Education Bursaries (for care leavers)</li>
                <li>
                  Bounties paid by the armed services to reservists or
                  disablement or invalidity pensions
                </li>
                <li>ISAs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="app-form-secound">
        <Form.Group>
          <div className="row">
            <div className="app-form-box">
              <div className="col-md-4 col-sm-12">
                <Form.Label>Payments from an employer</Form.Label>
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>b) - Will you be employed during the academic year?</p>
              </div>
              <div className="col-md-4 col-sm-12 d-flex">
                <Form.Check
                  type="checkbox"
                  label="NO"
                  checked={!formData.studentFinancial.sfEmployedBe}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfEmployedBe: !prevData.studentFinancial.sfEmployedBe,
                      },
                    }))
                  }
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Check
                  type="checkbox"
                  label="YES"
                  checked={formData.studentFinancial.sfEmployedBe}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfEmployedBe: !prevData.studentFinancial.sfEmployedBe,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  c) - Will your employer be releasing you to attend your course
                  for the academic year 2023/24? <br />
                  No Yes if no go to e If ‘Yes’, how much will your employer pay
                  you for time spent attending your course during this period?
                </p>
              </div>
              <div className="col-md-4 col-sm-12 d-flex">
                <Form.Check
                  type="checkbox"
                  label="NO"
                  checked={!formData.studentFinancial.sfEmployerBe}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfEmployerBe: !prevData.studentFinancial.sfEmployerBe,
                      },
                    }))
                  }
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Check
                  type="checkbox"
                  label="YES"
                  checked={formData.studentFinancial.sfEmployerBe}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfEmployerBe: !prevData.studentFinancial.sfEmployerBe,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <p></p>
            </div>
            <div className="col-md-4 col-sm-12">
              <Form.Control
                type="number"
                name="sfPayment"
                value={formData.studentFinancial.sfPayment}
                onChange={(e) => handleStudentFinancial(e)}
                disabled={!formData.studentFinancial.sfEmployerBe}
              />
            </div>
          </div>
        </Form.Group>
      </div>

      <div className="app-form-conent">
        <h6>What should I include in my answer?</h6>
        <p>
          Only enter an amount for question b if you are being released from
          employment by your employer to attend your course. Only include salary
          or wages that you will receive from that employer for days you are
          attending your course.
        </p>
        <p>
          Any earnings from salary or wages entered here may affect your student
          finance entitlement. Do not provide any amount here if you are a
          student who is working while studying but have not been specifically
          released by your employer to attend your course.
        </p>
      </div>
      <div className="app-form-secound">
        <Form.Group>
          <div className="row">
            {/* <h5>
              {" "}
              <span>Section 1</span> Student financial questions
            </h5> */}
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  d) - During the academic year 2023/24, will you or your
                  employer pay any money into a pension fund on your behalf?{" "}
                  <br /> If ‘Yes’, how much during this period?
                </p>
              </div>
              <div className="col-md-4 col-sm-12 d-flex">
                <Form.Check
                  type="checkbox"
                  label="NO"
                  checked={!formData.studentFinancial.sfPensionFund}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfPensionFund: !prevData.studentFinancial.sfPensionFund,
                      },
                    }))
                  }
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Check
                  type="checkbox"
                  label="YES"
                  checked={formData.studentFinancial.sfPensionFund}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      studentFinancial: {
                        ...prevData.studentFinancial,
                        sfPensionFund: !prevData.studentFinancial.sfPensionFund,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <p></p>
            </div>
            <div className="col-md-4 col-sm-12">
              <Form.Control
                type="number"
                name="sfPensionFundTotal"
                value={formData.studentFinancial.sfPensionFundTotal}
                onChange={(e) => handleStudentFinancial(e)}
                disabled={!formData.studentFinancial.sfPensionFund}
              />
            </div>
          </div>

          {formData?.studentFinancial?.sfDependentChild.map((child, index) => (
            <div key={index}>
              <div className="app-form-box">
                <div className="col-md-4 col-sm-12">
                  <Form.Label>Dependent children</Form.Label>
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>
                    e) - When stating the child’s income, include their income
                    from all sources after income tax and National Insurance
                    contributions in tax year 2021-22.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="text"
                    name={`dependent-${index}-fullName`}
                    placeholder="Child full name"
                    value={child.fullName}
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="text"
                    name={`dependent-${index}-relationToYou`}
                    placeholder="Relationship to you"
                    value={child.relationToYou}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>Do include any income the child gets from:</p>
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <ul>
                    <li>working</li>
                    <li>interest earned on savings</li>
                    <li>investments</li>
                    <li>any maintenance payments</li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-12">
                  <p>Date of birth (DDMMYYYY)</p>
                  <Form.Control
                    type="date"
                    name={`dependent-${index}-childDOB`}
                    placeholder="Date of birth (DDMMYYYY)"
                    value={child.childDOB}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-8 col-sm-12">
                  <p>Don’t include income from:</p>
                  <ul>
                    <li>Child Benefit</li>
                    <li>
                      Child Tax Credit or the childcare element of Universal
                      Credit
                    </li>
                    <li>Government Child Trust</li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-12">
                  <Form.Control
                    type="text"
                    name={`dependent-${index}-childLiveWith`}
                    placeholder="Government Child Trust"
                    value={child.childLiveWith}
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="number"
                    name={`dependent-${index}-totalIncome`}
                    placeholder="Income from all sources after income tax and social security"
                    value={child.totalIncome}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {index >= 1 && (
                <div className="my-4 d-flex justify-content-end">
                  <Button
                    onClick={() => handleRemoveChild(index)}
                    style={{ background: "rgb(0, 167, 111)" }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="my-4 d-flex justify-content-end">
            {" "}
            <Button
              style={{ background: "rgb(0, 167, 111)" }}
              onClick={addMoreChild}
            >
              Add More Child
            </Button>
          </div>
        </Form.Group>
      </div>
      <div className="application-next-btn-box">
        <Button
          onClick={() => setCurrentStep(2)}
          style={{
            width: "150px",
            marginRight: "10px",
            background: "rgb(0, 167, 111)",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(4)}
          style={{ width: "150px", background: "rgb(0, 167, 111)" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2;
