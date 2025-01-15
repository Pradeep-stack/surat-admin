import React, { useState } from "react";
import "../assets/css/ParentDeclaration.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Form from "react-bootstrap/Form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ParentDeclaration = () => {
  const [formData, setFormData] = useState({
    parentDeclarationInfo: {
      twoYearOld: false,
      sixDigitCodeCYC: "",
      twoYearOldWorkParent: false,
      elevenDigitCodeCYC: "",
      threeAndFourUH: false,
      nationoffer: "",
      threeAndFourEH: false,
      elevenDigitCodeCC: "",
      forename: "",
      surname: "",
      dob: "",
      address: "",
      ethnicity: "",
      gender: "",
      confirmDOB: "",
      providerSignature: "",
      dateRecorded: "",
      parentsForename: "",
      parentsSurname: "",
      nationalInsuranceNumber: "",
      parentsDateofbirth: "",
      fundingClaimDetails: [
        {
          providerAName: "",
          startDate: "",
          hoursPerWeek: "",
          fullTerm: false,
          halfTerm: false,
          termTime: false,
          fullYear: false,
          fundedHours: "",
        },
      ],
      termlyFundedHours: "",
      applyForEYPP: false,
      livingAllowanceDLA: false,
      accurateAndTrue: false,
      privacyNotice: false,
      aboveTheEntitlement: false,
      fundedEntitlement: false,
      chargesOrServices: false,
      currentProvider: false,
      parentSignature: "",
      parentSDate: "",
      appropriateFundingTerm: [
        {
          fundingTerm: "",
          fParentSignature: "",
          fproviderSignature: "",
          fundingDate: "",
        },
      ],
    },
  });

  const initialFieldProvider = {
    providerName: "",
    startDate: "",
    hoursPerWeek: "",
    fullTerm: false,
    halfTerm: false,
    termTime: false,
    fullYear: false,
    fundedHours: "",
  };

  const [formFieldsProvider, setFormFieldsProvider] = useState([
    initialFieldProvider,
  ]);

  const handleAddFieldProvider = () => {
    setFormFieldsProvider([...formFieldsProvider, initialFieldProvider]);
  };

  const handleRemoveFieldProvider = (index) => {
    const fields = [...formFieldsProvider];
    fields.splice(index, 1);
    setFormFieldsProvider(fields);
  };

  const handleInputChangeProvider = (index, event) => {
    const { name, value, type, checked } = event.target;
    const fields = [...formFieldsProvider];
    if (type === "checkbox" || type === "radio") {
      fields[index][name] = checked;
    } else {
      fields[index][name] = value;
    }
    setFormFieldsProvider(fields);
  };

  const initialField = {
    fundingTerm: "",
    parentSignature: "",
    providerSignature: "",
    date: "",
  };

  const [formFields, setFormFields] = useState([initialField]);

  const handleAddField = () => {
    setFormFields([...formFields, initialField]);
  };

  const handleRemoveField = (index) => {
    const fields = [...formFields];
    fields.splice(index, 1);
    setFormFields(fields);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...formFields];
    fields[index][name] = value;
    setFormFields(fields);
  };

  return (
    <>
      <div className="main-conent-box mb-5">
        <h2 className="page-title">Application From</h2>

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
          <p>Parent Declaration</p>
        </Breadcrumbs>

        <div className="declaration-form-box">
          <Form>
            <Form.Group>
              <div className="row">
                <h6>PARENT DECLARATION FORM </h6>
                <p>
                  To read about how we use your data, please read our Early
                  Education Funding privacy notice, in conjunction with other
                  relevant council privacy notices such as Our privacy notice –
                  City of York Council. Please read the accompanying parent
                  information sheet which may help you in completing this form.
                </p>
                <div className="des-form-box">
                  <div className="col-md-12 col-sm-12">
                    <Form.Label> Entitlement type (please select) </Form.Label>
                  </div>
                  {/* <div className="col-md-8 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }} type="text" />
                  </div> */}
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>
                      2-year-old (15 hrs- 190hrs per term)
                    </Form.Label>
                    <div className="form-check " style={{ marginLeft: "10px" }}>
                      <Form.Check
                        type="radio"
                        name=""
                        style={{ borderColor: "black" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      placeholder="6-digit code approved by CYC"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>
                      2-year-old (working parent entitlement) (15 hrs- 190hrs
                      per term)
                    </Form.Label>
                    <div className="form-check " style={{ marginLeft: "10px" }}>
                      <Form.Check
                        type="radio"
                        name=""
                        style={{ borderColor: "black" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      placeholder="11-digit code approved by Childcare Choices"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>
                      3-& 4-year-old universal hours (15 hrs- 190hrs per term)
                    </Form.Label>
                    <div className="form-check " style={{ marginLeft: "10px" }}>
                      <Form.Check
                        type="radio"
                        name=""
                        style={{ borderColor: "black" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      placeholder="No code required as national offer"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>
                      3-& 4-year-old extended hours (30 hrs- 380hrs per term)
                    </Form.Label>
                    <div className="form-check " style={{ marginLeft: "10px" }}>
                      <Form.Check
                        type="radio"
                        name=""
                        style={{ borderColor: "black" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      placeholder="11-digit code issued by Childcare Choices"
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Child details </Form.Label>
                  </div>
                  {/* <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }} type="text" />
                  </div> */}
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Forename: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Surname: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Date of birth: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Address: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Ethnicity: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Gender: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name=""
                      style={{ borderColor: "black" }}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name=""
                      style={{ borderColor: "black", marginLeft: "10px" }}
                    />
                    <Form.Check
                      type="radio"
                      label="Other"
                      name=""
                      style={{ borderColor: "black", marginLeft: "10px" }}
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Evidence seen to confirm DOB: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Check
                      type="checkbox"
                      name=""
                      style={{ borderColor: "black" }}
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Provider signature: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Date recorded: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <div className="des-form-box">
                  <div className="col-md-12 col-sm-12">
                    <Form.Label>
                      {" "}
                      Parent/Carer details (main applicant details){" "}
                    </Form.Label>
                  </div>
                  {/* <div className="col-md-8 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }} type="text" />
                  </div> */}
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Forename: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Surname: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> National Insurance Number: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12">
                    <Form.Label> Date of birth: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <h4>Funding claim details </h4>
                <p>
                  Please complete for ALL funded entitlement taken, including at
                  provision outside City of York. Funding may not follow the
                  child if they move provider mid-term as the LA fund a minimum
                  of half a term.
                </p>
              </div>
            </Form.Group>
            <Form.Group>
              {formFieldsProvider.map((field, index) => (
                <div key={index} className="">
                  <div className="row mb-3 mt-4">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Provider A name:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="providerName"
                        value={field.providerName}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Start date at provider:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="startDate"
                        value={field.startDate}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Number of hours claimed per week:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="hoursPerWeek"
                        value={field.hoursPerWeek}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Full term</Form.Label>
                      <Form.Check
                        style={{ borderColor: "black", marginLeft: "10px" }}
                        type="radio"
                        name={`fullTerm${index}`}
                        checked={field.fullTerm}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Half term </Form.Label>
                      <Form.Check
                        style={{ borderColor: "black", marginLeft: "10px" }}
                        type="radio"
                        name={`halfTerm${index}`}
                        checked={field.halfTerm}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Term time (38 weeks) </Form.Label>
                      <Form.Check
                        style={{ borderColor: "black", marginLeft: "10px" }}
                        type="radio"
                        name={`termTime${index}`}
                        checked={field.termTime}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Across the full year </Form.Label>

                      <Form.Check
                        style={{ borderColor: "black", marginLeft: "10px" }}
                        type="radio"
                        name={`fullYear${index}`}
                        checked={field.fullYear}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>
                        Total number of funded hours claimed per term at this
                        provider:
                      </Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="fundedHours"
                        value={field.fundedHours}
                        onChange={(e) => handleInputChangeProvider(index, e)}
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFieldProvider(index)}
                        className="mt-2"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={handleAddFieldProvider}
                  className=" dec-btn-submit mt-3"
                >
                  Add More
                </button>
              </div>
            </Form.Group>

            <div className="des-form-box mt-4">
              <div className="col-md-6 col-sm-12 d-flex">
                <Form.Label>
                  Total number of termly funded hours claimed across all
                  providers (Provider A + Provider B + Provider C must not
                  exceed 190/380 across the term):{" "}
                </Form.Label>
              </div>
              <div className="col-md-6 col-sm-12">
                <Form.Control style={{ borderColor: "black" }} type="text" />
              </div>
            </div>

            <Form.Group>
              <div className="row">
                <h4>Early Years Pupil Premium (EYPP) </h4>
                <p>
                  EYPP is an additional sum of money paid to childcare providers
                  for children of families in receipt of certain benefits
                  (please see parent information sheet for criteria). This
                  funding will be used to enhance the quality of their early
                  years’ experience by improving the teaching & learning and
                  facilities and resources, with the aim of impacting positively
                  on your child’s progress and development.
                </p>
                <div className="des-form-box">
                  <div className="col-md-8 col-sm-12 d-flex">
                    <p>Do you wish to apply for EYPP for your child? </p>
                  </div>
                  <div className="col-md-4 col-sm-12 d-flex">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                      label="Yes"
                    />
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="checkbox"
                      value=""
                      label="No"
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <h4>Disability Access Fund (DAF) </h4>
                <p>
                  If your child is in receipt of Disability Living Allowance
                  (DLA) and is receiving the funded entitlement, they are
                  eligible for the Disability Access Fund (DAF). DAF is paid to
                  one nominated early years provider on an annual basis. The
                  purpose of DAF is to support providers to make reasonable
                  adjustments and build the capacity of their setting to support
                  children with additional needs.
                </p>
                <div className="des-form-box">
                  <div className="col-md-8 col-sm-12 d-flex">
                    <p>
                      Is your child eligible for and in receipt of Disability
                      Living Allowance (DLA)?{" "}
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12 d-flex">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                      label="Yes"
                    />

                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="checkbox"
                      value=""
                      label="No"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-12 col-sm-12">
                    <p>
                      If yes, provider to discuss with parent/carer as to which
                      setting will be the nominated provider to receive DAF (if
                      child attends more than one provider). Once decided,
                      provider emails earlyyearsfunding@york.gov.uk for a DAF
                      application form.{" "}
                    </p>
                  </div>
                  {/* <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }} type="text" />
                  </div> */}
                </div>
                <div className="des-form-box">
                  <div className="col-md-12 col-sm-12">
                    <Form.Label>
                      Please tick to agree to the following statements:
                    </Form.Label>
                  </div>
                  {/* <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }} type="text" />
                  </div> */}
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I certify that the information given on this form is
                      accurate and true.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I confirm that I have read and understood the privacy
                      notice.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I understand that my child is entitled to a maximum
                      entitlement of 190/380 hours per term, which can be taken
                      at a maximum of two sites in any one day. I will be
                      charged for any additional hours taken over and above the
                      entitlement.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I understand that the council will use the details
                      provided on this form to check with the DWP and/or HMRC
                      regarding my eligibility for the funded entitlement.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I have received and understood the information from this
                      provider regarding any potential additional charges and/or
                      services.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-10 col-sm-12">
                    <p>
                      I understand that if my child has claimed funded
                      entitlement at another provider, there is the expectation
                      that I have notified them of this. Failure to do so may
                      affect the funded entitlement my child will receive at
                      this current provider.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <Form.Check
                      style={{ borderColor: "black" }}
                      type="checkbox"
                      value=""
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Parent signature: </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Date </Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="des-form-box">
                  <div className="col-md-12 col-sm-12 d-flex">
                    <p>
                      If a child’s pattern of take up does not change from term
                      to term, the same Parent Declaration can be used and the
                      parent and provider are only required to resign below
                      indicating the appropriate funding term.{" "}
                    </p>
                  </div>
                  {/* <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Control
                      style={{ borderColor: "black" }} type="date" />
                  </div> */}
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              {formFields.map((field, index) => (
                <div key={index}>
                  <div className="row mb-3 mt-4">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Funding Term:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="fundingTerm"
                        value={field.fundingTerm}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Parent/Carer Signature:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="parentSignature"
                        value={field.parentSignature}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Provider signature:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="text"
                        name="providerSignature"
                        value={field.providerSignature}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Label>Date:</Form.Label>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex">
                      <Form.Control
                        style={{ borderColor: "black" }}
                        type="date"
                        name="date"
                        value={field.date}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveField(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="d-flex justify-content-end">
                <button
                  className="dec-btn-submit mt-3"
                  type="button"
                  onClick={handleAddField}
                >
                  Add More
                </button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ParentDeclaration;
