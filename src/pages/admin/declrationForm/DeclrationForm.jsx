// src/Step1.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { uploadImage, addApplicationForm } from "../../../api/application";
import { validateForm } from "./formValidation";
import { getHours } from "../../../api/Hours";
const DeclrationForm = ({
  setCurrentStep,
  formData,
  setFormData,
  handleSubmit,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [errorMsg, setErrorMsg] = useState(false);
  const [hoursData, setHoursData] = useState([]);
  const fetchHours = async () => {
    const response = await getHours();
    setHoursData(response);
  };
  useEffect(() => {
    fetchHours();
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    updatedFormData.appropriateFundingTerm[index][name] = value;
    setFormData(updatedFormData);
  };

  const handleAddField = () => {
    setFormData((prevState) => ({
      ...prevState,
      appropriateFundingTerm: [
        ...prevState.appropriateFundingTerm,
        {
          fundingTerm: "",
          fParentSignature: null,
          fproviderSignature: null,
          fundingDate: "",
        },
      ],
    }));
  };

  const handleRemoveField = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      appropriateFundingTerm: prevState.appropriateFundingTerm.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // provider

  const handleChangeProviderA = (index, e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => {
      const updatedFundingClaimDetails = [...prevData.providerA];
      updatedFundingClaimDetails[index] = {
        ...updatedFundingClaimDetails[index],
        [name]: value,
      };
      return {
        ...prevData,
        providerA: updatedFundingClaimDetails,
      };
    });
  };
  const handleChangeProviderB = (index, e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => {
      const updatedFundingClaimDetails = [...prevData.providerB];
      updatedFundingClaimDetails[index] = {
        ...updatedFundingClaimDetails[index],
        [name]: value,
      };
      return {
        ...prevData,
        providerB: updatedFundingClaimDetails,
      };
    });
  };
  const handleChangeProviderC = (index, e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => {
      const updatedFundingClaimDetails = [...prevData.providerC];
      updatedFundingClaimDetails[index] = {
        ...updatedFundingClaimDetails[index],
        [name]: value,
      };
      return {
        ...prevData,
        providerC: updatedFundingClaimDetails,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const [imgData, setImgData] = useState({
    providerSignature: null,
    parentSignature: null,
    fParentSignature: null,
    fproviderSignature: null,
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setImgData({
      ...imgData,
      [fieldName]: e.target.files[0],
    });
    handleImgUpload(file, fieldName);
  };
  const handleImgUpload = async (file, fieldName) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await uploadImage(formData);
        if (response) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: response.data.filePath,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImgageTerm = async (e, fieldName, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData);
    if (response) {
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        updatedFormData.appropriateFundingTerm[index][fieldName] =
          response.data.filePath;
        return updatedFormData;
      });
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      applyForEYPP: value,
    }));
  };
  const handleRadioChangedaf = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      daf: value,
    }));
  };

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const postData = async (e) => {
    setLoading(true);
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted");
      try {
        await handleSubmit(e);
        setLoading(false);
      } catch (error) {
        console.error("Error adding application:", error);
        setLoading(false);
      }
    } else {
      console.log("Validation failed");
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  // const postData = (e) => {
  //   setLoading(true);
  //   e.preventDefault();

  //   const newErrors = validateForm(formData);
  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     console.log("Form submitted");
  //     handleSubmit(e);
  //     setLoading(false);
  //   } else {
  //     console.log("Validation failed");
  //     window.scrollTo(0, 0);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="declaration-form-box">
        <Form>
          <Form.Group>
            <div className="row">
              <h6>PARENT DECLARATION FORM</h6>
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
              </div>

              <div className="des-form-box">
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Label>2-year-old (15 hrs- 190hrs per term)</Form.Label>
                  <div className="form-check" style={{ marginLeft: "10px" }}>
                    <Form.Check
                      type="radio"
                      name="entitlementType"
                      value="twoYearOld"
                      checked={formData.entitlementType === "twoYearOld"}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          entitlementType: "twoYearOld",
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="tel"
                    placeholder="6-digit code approved by CYC"
                    name="sixDigitCodeCYC"
                    value={
                      formData.entitlementType === "twoYearOld"
                        ? formData.sixDigitCodeCYC
                        : ""
                    }
                    pattern="[0-9]{10} 10"
                    maxLength="6"
                    onChange={handleInputChange}
                    disabled={formData.entitlementType !== "twoYearOld"}
                  />
                  {errors.sixDigitCodeCYC && (
                    <div className="error-message">
                      {errors.sixDigitCodeCYC}
                    </div>
                  )}
                </div>
              </div>

              <div className="des-form-box">
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Label>
                    2-year-old (working parent entitlement) (15 hrs- 190hrs per
                    term)
                  </Form.Label>
                  <div className="form-check" style={{ marginLeft: "10px" }}>
                    <Form.Check
                      type="radio"
                      name="entitlementType"
                      value="twoYearOldWorkParent"
                      checked={
                        formData.entitlementType === "twoYearOldWorkParent"
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="tel"
                    placeholder="11-digit code approved by Childcare Choices"
                    name="elevenDigitCodeCYC"
                    value={
                      formData.entitlementType === "twoYearOldWorkParent"
                        ? formData.elevenDigitCodeCYC
                        : ""
                    }
                    onChange={handleInputChange}
                    pattern="[0-9]{10} 10"
                    maxLength="11"
                    disabled={
                      formData.entitlementType !== "twoYearOldWorkParent"
                    }
                  />
                  {errors.elevenDigitCodeCYC && (
                    <div className="error-message">
                      {errors.elevenDigitCodeCYC}
                    </div>
                  )}
                </div>
              </div>

              <div className="des-form-box">
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Label>
                    3-& 4-year-old universal hours (15 hrs- 190hrs per term)
                  </Form.Label>
                  <div className="form-check" style={{ marginLeft: "10px" }}>
                    <Form.Check
                      type="radio"
                      name="entitlementType"
                      value="threeAndFourUH"
                      checked={formData.entitlementType === "threeAndFourUH"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="number"
                    placeholder="No code required as national offer"
                    name="threeAndFourUH"
                    value={
                      formData.entitlementType === "threeAndFourUH"
                        ? formData.threeAndFourUH
                        : ""
                    }
                    onChange={handleInputChange}
                    disabled={formData.entitlementType !== "threeAndFourUH"}
                  />
                </div>
              </div>

              <div className="des-form-box">
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Label>
                    3-& 4-year-old extended hours (30 hrs- 380hrs per term)
                  </Form.Label>
                  <div className="form-check" style={{ marginLeft: "10px" }}>
                    <Form.Check
                      type="radio"
                      name="entitlementType"
                      value="threeAndFourEH"
                      checked={formData.entitlementType === "threeAndFourEH"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="tel"
                    placeholder="11-digit code issued by Childcare Choices"
                    name="elevenDigitCodeCC"
                    value={
                      formData.entitlementType === "threeAndFourEH"
                        ? formData.elevenDigitCodeCC
                        : ""
                    }
                    onChange={handleInputChange}
                    pattern="[0-9]{10} 10"
                    maxLength="11"
                    disabled={formData.entitlementType !== "threeAndFourEH"}
                  />
                  {errors.elevenDigitCodeCC && (
                    <div className="error-message">
                      {errors.elevenDigitCodeCC}
                    </div>
                  )}
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
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label> Forename: </Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="text"
                    name="forename"
                    value={formData.forename}
                    onChange={handleInputChange}
                  />
                  {errors.forename && (
                    <div className="error-message">{errors.forename}</div>
                  )}
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
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                  />
                  {errors.surname && (
                    <div className="error-message">{errors.surname}</div>
                  )}
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
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && (
                    <div className="error-message">{errors.dob}</div>
                  )}
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
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && (
                    <div className="error-message">{errors.address}</div>
                  )}
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
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleInputChange}
                  />
                  {errors.ethnicity && (
                    <div className="error-message">{errors.ethnicity}</div>
                  )}
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
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    style={{ borderColor: "black" }}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    style={{ borderColor: "black", marginLeft: "10px" }}
                  />
                  <Form.Check
                    type="radio"
                    label="Other"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleInputChange}
                    style={{ borderColor: "black", marginLeft: "10px" }}
                  />{" "}
                  &nbsp;&nbsp;
                  {errors.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label> Evidence seen to confirm DOB: </Form.Label>
                </div>
                <div className="col-md-6 col-sm-12 ">
                  <Form.Check
                    type="checkbox"
                    name="confirmDOB"
                    checked={formData.confirmDOB}
                    onChange={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        confirmDOB: !prevData.confirmDOB,
                      }))
                    }
                    style={{ borderColor: "black" }}
                  />
                  {!formData.confirmDOB && (
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "birthCertificate")}
                      custom="true"
                    />
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label> Provider signature: </Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "providerSignature")}
                    custom="true"
                  />
                  {errors.providerSignature && (
                    <div className="error-message">
                      {errors.providerSignature}
                    </div>
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label> Date recorded: </Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="date"
                    name="dateRecorded"
                    value={formData.dateRecorded}
                    onChange={handleInputChange}
                  />
                  {errors.dateRecorded && (
                    <div className="error-message">{errors.dateRecorded}</div>
                  )}
                </div>
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <div className="row">
              <div className="des-form-box">
                <div className="col-md-12 col-sm-12">
                  <Form.Label>
                    Parent/Carer details (main applicant details)
                  </Form.Label>
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label>Forename:</Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="text"
                    name="parentsForename"
                    value={formData.parentsForename}
                    onChange={handleInputChange}
                  />
                  {errors.parentsForename && (
                    <div className="error-message">
                      {errors.parentsForename}
                    </div>
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label>Surname:</Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="text"
                    name="parentsSurname"
                    value={formData.parentsSurname}
                    onChange={handleInputChange}
                  />
                  {errors.parentsSurname && (
                    <div className="error-message">{errors.parentsSurname}</div>
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label>National Insurance Number:</Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="number"
                    name="nationalInsuranceNumber"
                    value={formData.nationalInsuranceNumber}
                    onChange={handleInputChange}
                  />
                  {errors.nationalInsuranceNumber && (
                    <div className="error-message">
                      {errors.nationalInsuranceNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12">
                  <Form.Label>Date of birth:</Form.Label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="date"
                    name="parentsDateofbirth"
                    value={formData.parentsDateofbirth}
                    onChange={handleInputChange}
                  />
                  {errors.parentsDateofbirth && (
                    <div className="error-message">
                      {errors.parentsDateofbirth}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <div className="row">
              <h4>Funding claim details </h4>
              <p>
                Please complete for ALL funded entitlement taken, including at
                provision outside City of York. Funding may not follow the child
                if they move provider mid-term as the LA fund a minimum of half
                a term.
              </p>
            </div>
          </Form.Group>
          <Form.Group>
            {formData.providerA?.map((field, index) => (
              <div key={index} className="">
                <div className="row mb-3 mt-4">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Provider A name:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      name="providerAName"
                      value={field.providerAName}
                      onChange={(e) => handleChangeProviderA(index, e)}
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
                      type="date"
                      name="startDateA"
                      value={field.startDateA}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Number of hours claimed per week:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Select
                      style={{ borderColor: "black" }}
                      name="hoursPerWeekA"
                      value={field.hoursPerWeekA}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    >
                      <option value="">Select hours</option>
                      <option value={hoursData?.optionOne}>
                        {hoursData?.optionOne} hours
                      </option>
                      <option value={hoursData.optionTwo}>
                        {hoursData?.optionTwo} hours
                      </option>
                      <option value={hoursData.optionThree}>
                        {hoursData?.optionThree} hours
                      </option>
                      <option value={hoursData.optionFour}>
                        {hoursData?.optionFour} hours
                      </option>
                    </Form.Select>
                  </div>
                </div>
                <div className="row mb-3">
                  {errors.fundingTermA && (
                    <div className="error-message">{errors.fundingTermA}</div>
                  )}
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Full term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermA`}
                      value="fullTerm"
                      checked={field.fundingTermA === "fullTerm"}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Half term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermA`}
                      value="halfTerm"
                      checked={field.fundingTermA === "halfTerm"}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Term time (38 weeks)</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermA`}
                      value="termTime"
                      checked={field.fundingTermA === "termTime"}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Across the full year</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermA`}
                      value="fullYear"
                      checked={field.fundingTermA === "fullYear"}
                      onChange={(e) => handleChangeProviderA(index, e)}
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
                      type="number"
                      name="fundedHoursA"
                      value={field.fundedHoursA}
                      onChange={(e) => handleChangeProviderA(index, e)}
                    />
                  </div>
                </div>
                {/* {index > 0 && (
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFieldProvider(index)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                )} */}
              </div>
            ))}

            {/* <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={handleAddFieldProvider}
                className=" dec-btn-submit mt-3"
              >
                Add More
              </button>
            </div> */}
          </Form.Group>
          <Form.Group>
            {formData.providerB?.map((field, index) => (
              <div key={index} className="">
                <div className="row mb-3 mt-4">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Provider B name:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      name="providerBName"
                      value={field.providerBName}
                      onChange={(e) => handleChangeProviderB(index, e)}
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
                      type="date"
                      name="startDateB"
                      value={field.startDateB}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Number of hours claimed per week:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Select
                      style={{ borderColor: "black" }}
                      name="hoursPerWeekB"
                      value={field.hoursPerWeekB}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    >
                      <option value="">Select hours</option>
                      <option value={hoursData?.optionOne}>
                        {hoursData?.optionOne} hours
                      </option>
                      <option value={hoursData.optionTwo}>
                        {hoursData?.optionTwo} hours
                      </option>
                      <option value={hoursData.optionThree}>
                        {hoursData?.optionThree} hours
                      </option>
                      <option value={hoursData.optionFour}>
                        {hoursData?.optionFour} hours
                      </option>
                    </Form.Select>
                  </div>
                </div>
                <div className="row mb-3">
                  {errors.fundingTermB && (
                    <div className="error-message">{errors.fundingTermB}</div>
                  )}
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Full term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermB`}
                      value="fullTerm"
                      checked={field.fundingTermB === "fullTerm"}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Half term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermB`}
                      value="halfTerm"
                      checked={field.fundingTermB === "halfTerm"}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Term time (38 weeks)</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermB`}
                      value="termTime"
                      checked={field.fundingTermB === "termTime"}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Across the full year</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermB`}
                      value="fullYear"
                      checked={field.fundingTermB === "fullYear"}
                      onChange={(e) => handleChangeProviderB(index, e)}
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
                      type="number"
                      name="fundedHoursB"
                      value={field.fundedHoursB}
                      onChange={(e) => handleChangeProviderB(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Form.Group>
          <Form.Group>
            {formData.providerC?.map((field, index) => (
              <div key={index} className="">
                <div className="row mb-3 mt-4">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Provider C name:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Control
                      style={{ borderColor: "black" }}
                      type="text"
                      name="providerCName"
                      value={field.providerCName}
                      onChange={(e) => handleChangeProviderC(index, e)}
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
                      type="date"
                      name="startDateC"
                      value={field.startDateC}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Number of hours claimed per week:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <Form.Select
                      style={{ borderColor: "black" }}
                      name="hoursPerWeekC"
                      value={field.hoursPerWeekC}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    >
                      <option value="">Select hours</option>
                      <option value={hoursData?.optionOne}>
                        {hoursData?.optionOne} hours
                      </option>
                      <option value={hoursData.optionTwo}>
                        {hoursData?.optionTwo} hours
                      </option>
                      <option value={hoursData.optionThree}>
                        {hoursData?.optionThree} hours
                      </option>
                      <option value={hoursData.optionFour}>
                        {hoursData?.optionFour} hours
                      </option>
                    </Form.Select>
                  </div>
                </div>
                <div className="row mb-3">
                  {errors.fundingTermC && (
                    <div className="error-message">{errors.fundingTermC}</div>
                  )}
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Full term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermC`}
                      value="fullTerm"
                      checked={field.fundingTermC === "fullTerm"}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Half term</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermC`}
                      value="halfTerm"
                      checked={field.fundingTermC === "halfTerm"}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Term time (38 weeks)</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermC`}
                      value="termTime"
                      checked={field.fundingTermC === "termTime"}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Across the full year</Form.Label>
                    <Form.Check
                      style={{ borderColor: "black", marginLeft: "10px" }}
                      type="radio"
                      name={`fundingTermC`}
                      value="fullYear"
                      checked={field.fundingTermC === "fullYear"}
                      onChange={(e) => handleChangeProviderC(index, e)}
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
                      type="number"
                      name="fundedHoursC"
                      value={field.fundedHoursC}
                      onChange={(e) => handleChangeProviderC(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Form.Group>

          <div className="des-form-box mt-4">
            <div className="col-md-6 col-sm-12 d-flex">
              <Form.Label>
                Total number of termly funded hours claimed across all providers
                (Provider A + Provider B + Provider C must not exceed 190/380
                across the term):{" "}
              </Form.Label>
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Control
                style={{ borderColor: "black" }}
                type="number"
                name="termlyFundedHours"
                value={formData.termlyFundedHours}
                onChange={handleInputChange}
              />
              {errors.termlyFundedHours && (
                <div className="error-message">{errors.termlyFundedHours}</div>
              )}
            </div>
          </div>

          <Form.Group>
            <div className="row">
              <h4>Early Years Pupil Premium (EYPP) </h4>
              <p>
                EYPP is an additional sum of money paid to childcare providers
                for children of families in receipt of certain benefits (please
                see parent information sheet for criteria). This funding will be
                used to enhance the quality of their early years’ experience by
                improving the teaching & learning and facilities and resources,
                with the aim of impacting positively on your child’s progress
                and development.
              </p>
              <div className="des-form-box">
                <div className="col-md-8 col-sm-12 d-flex">
                  <p>Do you wish to apply for EYPP for your child? </p>
                </div>
                <div className="col-md-4 col-sm-12 d-flex">
                  <Form.Check
                    style={{ borderColor: "black" }}
                    type="radio"
                    name="applyForEYPP"
                    label="Yes"
                    checked={formData.applyForEYPP === true}
                    onChange={() => handleRadioChange(true)}
                  />
                  <Form.Check
                    style={{ borderColor: "black", marginLeft: "10px" }}
                    type="radio"
                    name="applyForEYPP"
                    label="No"
                    checked={formData.applyForEYPP === false}
                    onChange={() => handleRadioChange(false)}
                  />
                </div>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="row">
              <h4>Disability Access Fund (DAF) </h4>
              <p>
                If your child is in receipt of Disability Living Allowance (DLA)
                and is receiving the funded entitlement, they are eligible for
                the Disability Access Fund (DAF). DAF is paid to one nominated
                early years provider on an annual basis. The purpose of DAF is
                to support providers to make reasonable adjustments and build
                the capacity of their setting to support children with
                additional needs.
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
                    type="radio"
                    name="daf"
                    label="Yes"
                    checked={formData.daf === true}
                    onChange={() => handleRadioChangedaf(true)}
                  />
                  <Form.Check
                    style={{ borderColor: "black", marginLeft: "10px" }}
                    type="radio"
                    name="daf"
                    label="No"
                    checked={formData.daf === false}
                    onChange={() => handleRadioChangedaf(false)}
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
                    name="agreeOne"
                    checked={formData.agreeOne}
                    onChange={handleInputChange}
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
                    name="agreeTwo"
                    checked={formData.agreeTwo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-10 col-sm-12">
                  <p>
                    I understand that my child is entitled to a maximum
                    entitlement of 190/380 hours per term, which can be taken at
                    a maximum of two sites in any one day. I will be charged for
                    any additional hours taken over and above the entitlement.
                  </p>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Form.Check
                    style={{ borderColor: "black" }}
                    type="checkbox"
                    name="agreeThree"
                    checked={formData.agreeThree}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-10 col-sm-12">
                  <p>
                    I understand that the council will use the details provided
                    on this form to check with the DWP and/or HMRC regarding my
                    eligibility for the funded entitlement.
                  </p>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Form.Check
                    style={{ borderColor: "black" }}
                    type="checkbox"
                    name="agreeFour"
                    checked={formData.agreeFour}
                    onChange={handleInputChange}
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
                    name="agreeFive"
                    checked={formData.agreeFive}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="des-form-box">
                <div className="col-md-10 col-sm-12">
                  <p>
                    I understand that if my child has claimed funded entitlement
                    at another provider, there is the expectation that I have
                    notified them of this. Failure to do so may affect the
                    funded entitlement my child will receive at this current
                    provider.
                  </p>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Form.Check
                    style={{ borderColor: "black" }}
                    type="checkbox"
                    name="agreeSix"
                    checked={formData.agreeSix}
                    onChange={handleInputChange}
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "parentSignature")}
                    custom="true"
                  />
                </div>
              </div>
              {errors.parentSignature && (
                <div className="error-message">{errors.parentSignature}</div>
              )}
              <div className="des-form-box">
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Label>Date </Form.Label>
                </div>
                <div className="col-md-6 col-sm-12 d-flex">
                  <Form.Control
                    style={{ borderColor: "black" }}
                    type="date"
                    name="parentSDate"
                    value={formData.parentSDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {errors.parentSDate && (
                <div className="error-message">{errors.parentSDate}</div>
              )}
              <div className="des-form-box">
                <div className="col-md-12 col-sm-12 d-flex">
                  <p>
                    If a child’s pattern of take up does not change from term to
                    term, the same Parent Declaration can be used and the parent
                    and provider are only required to resign below indicating
                    the appropriate funding term.{" "}
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
            {formData.appropriateFundingTerm?.map((field, index) => (
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
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Parent/Carer Signature:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImgageTerm(e, "fParentSignature", index)
                      }
                      custom="true"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Label>Provider signature:</Form.Label>
                  </div>
                  <div className="col-md-6 col-sm-12 d-flex">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImgageTerm(e, "fproviderSignature", index)
                      }
                      custom="true"
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
                      name="fundingDate"
                      value={field.fundingDate}
                      onChange={(e) => handleChange(index, e)}
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
      <div className="d-flex justify-content-end">
        <Button
          style={{
            width: "150px",
            background: "rgb(0, 167, 111)",
            marginRight: "18px",
          }}
          onClick={(e) => postData(e)}
        >
          {loading ? "submitted..." : "Submit"}
        </Button>
      </div>
    </>
  );
};

export default DeclrationForm;
