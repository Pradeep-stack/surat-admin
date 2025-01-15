import "../../../assets/css/Application.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ApplicationRegister from "./ApplicationRegister.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addApplicationFormAsync } from "../../../features/application/applicationThunk.js";
import DeclrationForm from "./DeclrationForm.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addApplicationForm } from "../../../api/application";
const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    twoYearOld: "",
    sixDigitCodeCYC: "",
    twoYearOldWorkParent: "",
    elevenDigitCodeCYC: "",
    threeAndFourUH: "",
    threeAndFourEH: "",
    elevenDigitCodeCC: "",
    forename: "",
    surname: "",
    dob: "",
    address: "",
    ethnicity: "",
    gender: "",
    confirmDOB: false,
    birthCertificate: "",
    agreeOne: false,
    agreeTwo: false,
    agreeThree: false,
    agreeFour: false,
    agreeFive: false,
    agreeSix: false,
    providerSignature: "",
    dateRecorded: "",
    parentsForename: "",
    parentsSurname: "",
    nationalInsuranceNumber: null,
    parentsDateofbirth: "",
    entitlementType: "",
    providerA: [
      {
        providerAName: "",
        startDateA: "",
        hoursPerWeekA: "",
        fundingTermA: "",
        fundedHoursA: "",
      },
    ],
    providerB: [
      {
        providerBName: "",
        startDateB: "",
        hoursPerWeekB: "",
        fundingTermB: "",
        fundedHoursB: "",
      },
    ],
    providerC: [
      {
        providerCName: "",
        startDateC: "",
        hoursPerWeekC: "",
        fundingTermC: "",
        fundedHoursC: "",
      },
    ],
    termlyFundedHours: "",
    applyForEYPP: false,
    daf: false,
    livingAllowanceDLA: false,
    accurateAndTrue: false,
    privacyNotice: false,
    aboveTheEntitlement: false,
    fundedEntitlement: false,
    chargesOrServices: false,
    currentProvider: false,
    parentSignature: "",
    centerId: [],
    userId: user._id,
    email: "",
    contact: null,
    name: "",
    parentSDate: "",
    appropriateFundingTerm: [
      {
        fundingTerm: "",
        fParentSignature: "",
        fproviderSignature: "",
        fundingDate: "",
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("  const data = { parentDeclarationInfo: formData };");
    const data = { parentDeclarationInfo: formData };
    try {
      const response = await addApplicationForm(data);
      if (response) {
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        console.log("validation error");
      }
    } catch (error) {
      console.error("Error adding application:", error);
      toast.error("Error adding application");
    }
  };

  // console.log("formData", formData);
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ApplicationRegister
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 2:
        return (
          <DeclrationForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <ApplicationRegister
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
    }
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
        <div>
          <Form>{renderStep()}</Form>
        </div>
      </div>
    </>
  );
};

export default index;
