// formValidation.js

export const validateForm = (formData) => {
  const newErrors = {};

  if (
    formData.entitlementType === "twoYearOld" &&
    formData.sixDigitCodeCYC.length !== 6
  ) {
    newErrors.sixDigitCodeCYC =
      "6-digit code is required for 2-year-old entitlement.";
  }

  if (
    formData.entitlementType === "twoYearOldWorkParent" &&
    formData.elevenDigitCodeCYC.length !== 11
  ) {
    newErrors.elevenDigitCodeCYC =
      "11-digit code is required for 2-year-old working parent entitlement.";
  }
  if (
    formData.entitlementType === "threeAndFourEH" &&
    formData.elevenDigitCodeCC.length !== 11
  ) {
    newErrors.elevenDigitCodeCC =
      "11-digit code is required for 2-year-old working parent entitlement.";
  }

  if (formData.gender === "") {
    newErrors.gender = "Please select gender";
  }
  if (formData.forename === "") {
    newErrors.forename = "This is required";
  }
  if (formData.surname === "") {
    newErrors.surname = "This is required";
  }
  if (formData.dob === "") {
    newErrors.dob = "This is required";
  }
  if (formData.address === "") {
    newErrors.address = "This is required";
  }
  if (formData.ethnicity === "") {
    newErrors.ethnicity = "This is required";
  }

  if (formData.providerSignature === "") {
    newErrors.providerSignature = "This is required";
  }
  if (formData.dateRecorded === "") {
    newErrors.dateRecorded = "This is required";
  }
  if (formData.parentsForename === "") {
    newErrors.parentsForename = "This is required";
  }
  if (formData.parentsSurname === "") {
    newErrors.parentsSurname = "This is required";
  }
  if (formData.nationalInsuranceNumber === null) {
    newErrors.nationalInsuranceNumber = "This is required";
  }
  if (formData.parentsDateofbirth === "") {
    newErrors.parentsDateofbirth = "This is required";
  }
  if (formData.termlyFundedHours === "") {
    newErrors.termlyFundedHours = "This is required";
  }
  if (formData.parentSignature === "") {
    newErrors.parentSignature = "This is required";
  }
  if (formData.parentSDate === "") {
    newErrors.parentSDate = "This is required";
  }
  if (formData.providerA[0]?.fundingTermA === "") {
    newErrors.fundingTermA = "Choose any of them.";
  }
  if (formData.providerB[0]?.fundingTermB === "") {
    newErrors.fundingTermB = "Choose any of them.";
  }
  if (formData.providerC[0]?.fundingTermC === "") {
    newErrors.fundingTermC = "Choose any of them.";
  }

  // Add more validation checks as needed

  return newErrors;
};
