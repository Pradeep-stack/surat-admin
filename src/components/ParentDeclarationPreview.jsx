import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import sign from "../assets/images/signature.png";
import { getApplicationById } from "../api/application";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IMG_URL } from "../config";
import Loader from "./Loader";
const ParentDeclarationPreview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.state.item;
  const [applicationData, setAppliactionData] = useState();
  const [loader, setLoader] = useState(false);
  const handlePrint = () => {
    window.print();
  };
  const fetchApplicationById = async () => {
    setLoader(true);
    const response = await getApplicationById(id);
    setLoader(false);
    setAppliactionData(response.data);
  };
  useEffect(() => {
    fetchApplicationById();
  }, [dispatch]);

  const handleViewFile = () => {
    if (applicationData) {
      const fileUrl = `${IMG_URL}${applicationData.birthCertificate}`;
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownloadFile = async () => {
    if (applicationData) {
      try {
        const fileUrl = `${IMG_URL}${applicationData.birthCertificate}`;
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "birth-certificate.png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  return (
    <>
      <div className="main-conent-box mb-3">
        <h2 className="page-title">Parents Declaration Preview</h2>
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
          <p>Application Form Preview</p>
        </Breadcrumbs>
      </div>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="parent-preview" id="printableArea">
          <div className="parent-frm-prew-tit">
            <div className="parent-prew-tit">PARENT DECLARATION FORM</div>
          </div>

          <p className="parent-prew-p">
            To read about how we use your data, please read our{" "}
            <strong>Early Education Funding privacy notice</strong> , in
            conjunction with other relevant council privacy notices such as{" "}
            <strong>Our privacy notice – City of York Council</strong>. Please
            read the <strong>accompanying parent information sheet</strong>
            which may help you in completing this form.
          </p>

          {/* ----------- Entitlement type--------- */}

          <h3 className="parent-prew-h3">Entitlement type (please select)</h3>
          <div>
            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">
                  <strong>2-year-old</strong> (15 hrs- 190hrs per term)
                </p>
                <p>
                  {applicationData?.entitlementType === "twoYearOld"
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec" style={{ alignItems: "start" }}>
                  <p className="parent-prew-head">
                    6-digit code approved by CYC:
                  </p>
                  <p className="parent-prew-head">
                    {applicationData?.entitlementType === "twoYearOld" && (
                      <strong>{applicationData?.sixDigitCodeCYC}</strong>
                    )}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">
                  <strong>2-year-old (working parent entitlement)</strong>
                </p>
                <p className="parent-prew-head">(15 hrs- 190hrs per term)</p>
                <p>
                  {applicationData?.entitlementType === "twoYearOldWorkParent"
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec" style={{ alignItems: "start" }}>
                  <p className="parent-prew-head">
                    11-digit code approved by Childcare Choices:
                  </p>
                  <p className="parent-prew-head">
                    {applicationData?.entitlementType ===
                      "twoYearOldWorkParent" && (
                      <strong>{applicationData?.elevenDigitCodeCYC}</strong>
                    )}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">
                  <strong>3- & 4-year-old universal hours</strong>
                </p>
                <p className="parent-prew-head">(15 hrs- 190hrs per term)</p>
                <p>
                  {applicationData?.entitlementType === "threeAndFourUH"
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec" style={{ alignItems: "start" }}>
                  <p className="parent-prew-head">
                    No code required as national offer
                  </p>
                  {applicationData?.entitlementType === "threeAndFourUH" && (
                    <p>{applicationData?.threeAndFourUH}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">
                  <strong>3- & 4-year-old extended hours</strong>
                </p>
                <p className="parent-prew-head">(30 hrs- 380hrs per term)</p>
                <p>
                  {applicationData?.entitlementType === "threeAndFourEH"
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec" style={{ alignItems: "start" }}>
                  <p className="parent-prew-head">
                    11-digit code issued by Childcare Choices:
                  </p>
                  <p className="parent-prew-head">
                    {applicationData?.entitlementType === "threeAndFourEH" && (
                      <strong>{applicationData?.elevenDigitCodeCC}</strong>
                    )}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* ----------- Child details --------- */}

            <h3 className="parent-prew-h3">Child details</h3>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Forename:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.forename}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Surname:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.surname}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Date of birth:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.dob}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Address:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.address}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Ethnicity:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.ethnicity}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Gender:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.gender}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">
                  Evidence seen to confirm DOB:
                </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>
                      {" "}
                      {applicationData?.confirmDOB ? "Yes" : "No"}
                    </strong>
                  </p>
                  {!applicationData?.confirmDOB && (
                    <div>
                      <img
                        src={IMG_URL + applicationData?.birthCertificate}
                        alt=" DOB Certidicate"
                        srcset=""
                        // className="signature-prv"
                        onClick={handleViewFile}
                        style={{ cursor: "pointer", width: "120px" }}
                      />
                      <Icon
                        icon="ic:outline-download"
                        width="30"
                        height="30"
                        style={{
                          color: "#ba890f",
                          marginLeft: "20px",
                          cursor: "pointer",
                          marginTop: "140px",
                        }}
                        onClick={handleDownloadFile}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Provider signature:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <img
                      className="signature-prv"
                      src={IMG_URL + applicationData?.providerSignature}
                      alt=" Signature"
                      srcset=""
                    />
                    {/* {IMG_URL+applicationData?.providerSignature} */}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Date recorded:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.dateRecorded}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ----------- Parent/Carer details (main applicant details) --------- */}

            <h3 className="parent-prew-h3">
              Parent/Carer details (main applicant details)
            </h3>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Forename:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.parentsForename}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Surname:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.parentsSurname}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">National Insurance Number:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.nationalInsuranceNumber}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Date of birth:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.parentsDateofbirth}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ----------- Funding claim details --------- */}

            <h3 className="parent-prew-h3">Funding claim details</h3>

            <p className="parent-prew-p">
              Please complete for ALL funded entitlement taken, including at
              provision outside City of York. Funding may not follow the child
              if they move provider mid-term as the LA fund a minimum of half a
              term.
            </p>
            {applicationData?.providerA?.map((item) => (
              <div>
                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Provider A name:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.providerAName}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Start date at provider:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.startDateA}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Number of hours claimed per week:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.hoursPerWeekA} Hour</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Full term</p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermA === "fullTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Half term </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermA === "halfTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Term time (38 weeks) </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermA === "termTime" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Across the full year </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermA === "fullYear" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Total number of funded hours claimed per term at this
                      provider:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        {" "}
                        <strong>{item?.fundedHoursA}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {applicationData?.providerB?.map((item) => (
              <div>
                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Provider B name:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.providerBName}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Start date at provider:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.startDateB}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Number of hours claimed per week:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.hoursPerWeekB} Hour</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Full term</p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermB === "fullTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Half term </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermB === "halfTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Term time (38 weeks) </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermB === "termTime" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Across the full year </p>
                      <p className="parent-prew-head">
                        <strong>
                          {item?.fundingTermB === "fullYear" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Total number of funded hours claimed per term at this
                      provider:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.fundedHoursB}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {applicationData?.providerC?.map((item) => (
              <div>
                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Provider C name:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.providerCName}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Start date at provider:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.startDateC}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Number of hours claimed per week:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{item?.hoursPerWeekC} Hour</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Full term</p>
                      <p className="parent-prew-head">
                        <strong>
                          {item?.fundingTermC === "fullTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Half term </p>
                      <p className="parent-prew-head">
                        <strong>
                          {" "}
                          {item?.fundingTermC === "halfTerm" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Term time (38 weeks) </p>
                      <p className="parent-prew-head">
                        <strong>
                          {item?.fundingTermC === "termTime" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div
                      className="d-flex justify-content-between"
                      style={{ paddingRight: "50px" }}
                    >
                      <p className="parent-prew-head">Across the full year </p>
                      <p className="parent-prew-head">
                        <strong>
                          {item?.fundingTermC === "fullYear" ? "Yes" : "No"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">
                      Total number of funded hours claimed per term at this
                      provider:
                    </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        {" "}
                        <strong>{item?.fundedHoursC}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="col-12 col-md-10">
                <p className="parent-prew-head">
                  Total number of termly funded hours claimed across all
                  providers (Provider A + Provider B + Provider C must not
                  exceed 190/380 across the term):
                </p>
              </div>
              <div className="col-12 col-md-2">
                <div className="parent-det-sec" style={{ alignItems: "start" }}>
                  <p className="parent-prew-head">
                    {" "}
                    <strong>{applicationData?.termlyFundedHours}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ----------- Early Years Pupil Premium (EYPP) --------- */}

            <h3 className="parent-prew-h3">Early Years Pupil Premium (EYPP)</h3>

            <p className="parent-prew-p">
              EYPP is an additional sum of money paid to childcare providers for
              children of families in receipt of certain benefits (please see
              parent information sheet for criteria). This funding will be used
              to enhance the quality of their early years’ experience by
              improving the teaching & learning and facilities and resources,
              with the aim of impacting positively on your child’s progress and
              development.
            </p>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  Do you wish to apply for EYPP for your child?
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>
                      {applicationData?.applyForEYPP ? "Yes" : "No"}
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ----------- Disability Access Fund (DAF) --------- */}

            <h3 className="parent-prew-h3">Disability Access Fund (DAF)</h3>

            <p className="parent-prew-p">
              If your child is in receipt of Disability Living Allowance (DLA)
              and is receiving the funded entitlement, they are eligible for the
              Disability Access Fund (DAF). DAF is paid to one nominated early
              years provider on an annual basis. The purpose of DAF is to
              support providers to make reasonable adjustments and build the
              capacity of their setting to support children with additional
              needs.
            </p>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  Is your child eligible for and in receipt of Disability Living
                  Allowance (DLA)?
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.daf ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <p className="parent-prew-p">
              If yes, provider to discuss with parent/carer as to which setting
              will be the nominated provider to receive DAF (if child attends
              more than one provider). Once decided, provider emails{" "}
              <strong>earlyyearsfunding@york.gov.uk</strong> for a DAF
              application form.
            </p>

            {/* ----------- Disability Access Fund (DAF) --------- */}

            <h3 className="parent-prew-h3">
              Please tick to agree to the following statements:
            </h3>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I certify that the information given on this form is accurate
                  and true.{" "}
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong> {applicationData?.agreeOne ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I confirm that I have read and understood the privacy notice.
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.agreeTwo ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I understand that my child is entitled to a maximum
                  entitlement of 190/380 hours per term, which can be taken at a
                  maximum of two sites in any one day. I will be charged for any
                  additional hours taken over and above the entitlement.
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>
                      {" "}
                      {applicationData?.agreeThree ? "Yes" : "No"}
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I understand that the council will use the details provided on
                  this form to check with the DWP and/or HMRC regarding my
                  eligibility for the funded entitlement
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.agreeFour ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I have received and understood the information from this
                  provider regarding any potential additional charges and/or
                  services.
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.agreeFive ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-10">
                <p className="parent-prew-head">
                  I understand that if my child has claimed funded entitlement
                  at another provider, there is the expectation that I have
                  notified them of this. Failure to do so may affect the funded
                  entitlement my child will receive at this current provider.
                </p>
              </div>
              <div className="col-2 col-md-2">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.agreeSix ? "Yes" : "No"}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Parent signature:</p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  {/* <img className="parent-signature" src={sign} alt="" /> */}
                  {/* <p>{applicationData?.parentSignature}</p> */}
                  <img
                    src={IMG_URL + applicationData?.parentSignature}
                    alt=" Signature"
                    srcset=""
                    className="signature-prv"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <p className="parent-prew-head">Date: </p>
              </div>
              <div className="col col-md-6">
                <div className="parent-det-sec">
                  <p className="parent-prew-head">
                    <strong>{applicationData?.parentSDate}</strong>
                  </p>
                </div>
              </div>
            </div>

            <p className="parent-prew-head">
              If a child’s pattern of take up does not change from term to term,
              the same Parent Declaration can be used and the parent and
              provider are only required to resign below indicating the
              appropriate funding term.
            </p>
            {applicationData?.appropriateFundingTerm?.map((term) => (
              <div>
                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Funding Term: </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{term?.fundingTerm}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Parent/Carer Signature:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      {/* <img className="parent-signature" src={sign} alt="" /> */}
                      {/* <p>{term?.fParentSignature}</p> */}
                      <img
                        src={IMG_URL + term?.fParentSignature}
                        className="signature-prv"
                        alt=" Signature"
                        srcset=""
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Provider signature: </p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      {/* <img className="parent-signature" src={sign} alt="" /> */}
                      {/* <p>{term?.fproviderSignature}</p> */}
                      <img
                        src={IMG_URL + term?.fproviderSignature}
                        className="signature-prv"
                        alt=" Signature"
                        srcset=""
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <p className="parent-prew-head">Date:</p>
                  </div>
                  <div className="col col-md-6">
                    <div className="parent-det-sec">
                      <p className="parent-prew-head">
                        <strong>{term?.fundingDate}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="print-btn-box">
        <button className="print-btn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </>
  );
};

export default ParentDeclarationPreview;
