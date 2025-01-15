import "../../../assets/css/Application.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ApplicationNavbar from "./ApplicationNavbar.jsx";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";
import ApplicationRegister from "./ApplicationRegister.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addApplicationFormAsync } from "../../../features/application/applicationThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ApplicationFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dependantGrantsInfo: {
      dReferenceNumber: null,
      dGrantName: "",
      dGrantDOB: "",
      dContectAdd: "",
      dPostalCode: "",
    },
    studentFinancial: {
      sfTotalIncome: null,
      sfIncomeSource: "",
      sfEmployedBe: false,
      sfEmployerBe: false,
      sfPayment: null,
      sfPensionFund: false,
      sfPensionFundTotal: null,
      sfDependentChild: [
        {
          fullName: "",
          relationToYou: "",
          childDOB: "",
          childLiveWith: "",
          totalIncome: null,
        },
      ],
    },
    parentsGrant: {
      Under25: false,
      yourEstimatedIncome: null,
      patnerEstimatedIncome: null,
      yourCredit: null,
      patnerCredit: null,
      applyGrant: false,
      hmHmrc: false,
      parentChildInfo: [
        {
          forneName: "",
          surname: "",
          dob: "",
          careStartDate: "",
        },
      ],
      rUAFAdultGrant: false,
      adultDependantName: "",
      adultDependant: "Other",
      otherAdultDependent: false,
      allIncome: "",
      allPensionIncome: null,
      allGrossIncome: null,
      stateBenefits: null,
      allTaxableIncom: null,
      avcs: null,
      taxRelief: null,
    },
    declaration: {
      fullNameInC: "",
      signature: "",
      todayDate: "",
      additionalNotes: "",
    },
    centerId: "",
    userId: user._id,
    name: "",
    email: "",
    contact: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addApplicationFormAsync(formData));
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error adding application:", error);
      toast.error("Error adding application");
    }
  };

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
          <Step1
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return (
          <Step2
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 4:
        return (
          <Step3
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 5:
        return (
          <Step4
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

  console.log("formData", formData);
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
          <p>Application Form</p>
        </Breadcrumbs>
        <div>
          <ApplicationNavbar
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div>
          <Form>{renderStep()}</Form>
        </div>
      </div>
    </>
  );
};

export default ApplicationFrom;
