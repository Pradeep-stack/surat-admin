import "../assets/css/Application.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Form from "react-bootstrap/Form";

const ApplicationFrom = () => {
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
          <p>Add Application</p>
        </Breadcrumbs>

        <div className="application-form-box">
          <Form>
            <Form.Group>
              <div className="row">
                <h5>Application form for Dependants’ Grants</h5>
                <p>
                  To find out how we’ll use the information you provide go to
                  <span>www.gov.uk/studentfinance</span> to read our Privacy
                  Notice before completing this form.
                </p>
                <div className="app-form-box">
                  <div className="col-md-4 col-sm-12">
                    <Form.Label>Customer Reference Number</Form.Label>
                  </div>
                  <div className="col-md-8 col-sm-12">
                    <Form.Control type="text" />
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
                    <Form.Control type="text" />
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
                    <Form.Control type="date" />
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
                    <Form.Control type="text" />
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
                    <Form.Control type="text" />
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
                Also use this form if you have already applied for Childcare
                Grant and want to add additional children.
              </p>
              <p>
                If you no longer need Childcare Grant for one or more of your
                children call us on 0300 100 0607. If you are applying for Adult
                Dependants’ Grant for an adult who is or will be claiming
                student finance, you are not eligible to apply for an Adult
                Dependants’ Grant for them. If at any point during your studies
                the adult dependent on you claims student finance and you are in
                receipt of Adult Dependants’ Grant, you should notify us
                immediately. For more information on Dependants’ Grants go to
                www.gov.uk/studentfinance
              </p>
              <h4>How do I complete this form?</h4>
              <ul>
                <li>
                  {" "}
                  Answer every question in sections 1 & 2, then sign and date
                  the declaration.{" "}
                </li>
                <li>
                  If any questions do not apply to you, please write ‘N/A’ or
                  ‘None’ as your answer.
                </li>
                <li>
                  You need to send evidence with your application whenever you
                  see this icon.
                </li>
                <li>
                  If any questions are left blank we will not be able to process
                  this application.
                </li>
                <li>
                  Any photocopied financial documents you send to us with this
                  form will be securely destroyed once we have checked them.
                </li>
              </ul>
              <h4>Where do I send my form?</h4>
              <p>
                Once you have completed this form, signed and dated the
                declaration, please return it to{" "}
              </p>
              <h6>Student Finance England </h6>
              <h6>PO Box 210 </h6>
              <h6>Darlington </h6>
              <h6>DL1 9HJ </h6>
            </div>

            <div className="app-form-secound">
              <h5>Student financial questions</h5>
              <Form.Group>
                <div className="row">
                  <div className="app-form-box">
                    <div className="col-md-4 col-sm-12">
                      <Form.Label>Unearned income</Form.Label>
                    </div>
                    {/* <div className="col-md-8 col-sm-12">
                      <Form.Control type="text" />
                    </div> */}
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-6 col-sm-12">
                      <p>
                        a) - Estimate the total taxable unearned income, before
                        deductions, that you expect to receive in academic year
                        2023/24. What is the source of this income?
                      </p>
                    </div>

                    <div className="col-md-6 col-sm-12">
                      <Form.Control type="text" />
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="app-form-conent">
              <h6>What is taxable unearned income?</h6>
              <p>
                Taxable unearned income is any income you receive from the
                following sources:
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
                      <li>
                        Any other payment received for attending the course
                      </li>
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
                      <li>
                        Maintenance Loan or grant payments you may receive
                      </li>
                      <li>
                        Payments you receive from parents under a covenant
                      </li>
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
                    {/* <div className="col-md-8 col-sm-12">
                      <Form.Control type="text" />
                    </div> */}
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>b) - Will you be employed during the academic year?</p>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        b) - Will your employer be releasing you to attend your
                        course for the academic year 2023/24? <br />
                        No Yes if no go to e If ‘Yes’, how much will your
                        employer pay you for time spent attending your course
                        during this period?
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-12">
                    <p></p>
                  </div>
                  <div className="col-md-4 col-sm-12 ">
                    <Form.Control type="text" />
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="app-form-conent">
              <h6>What should I include in my answer?</h6>
              <p>
                Only enter an amount for question b if you are being released
                from employment by your employer to attend your course. Only
                include salary or wages that you will receive from that employer
                for days you are attending your course.
              </p>
              <p>
                Any earnings from salary or wages entered here may affect your
                student finance entitlement. Do not provide any amount here if
                you are a student who is working while studying but have not
                been specifically released by your employer to attend your
                course.
              </p>
            </div>
            <div className="app-form-secound">
              <Form.Group>
                <div className="row">
                  <h5>Student financial questions</h5>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        d) -During the academic year 2023/24, will you or your
                        employer pay any money into a pension fund on your
                        behalf? <br /> If ‘Yes’, how much during this period?
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-12">
                    <p></p>
                  </div>
                  <div className="col-md-4 col-sm-12 ">
                    <Form.Control type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="app-form-box">
                    <div className="col-md-4 col-sm-12">
                      <Form.Label>Dependent children</Form.Label>
                    </div>
                    {/* <div className="col-md-8 col-sm-12">
                      <Form.Control type="text" />
                    </div> */}
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        e) - When stating the child’s income, include their
                        income from all sources after income tax and National
                        Insurance contributions in tax year 2021-22.
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Child 1 full name"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Relationship to you"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Do include any income the child gets from:</p>
                    </div>
                    {/* <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Relationship to you"
                      />
                    </div> */}
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <ul>
                        <li>working</li>
                        <li>interest earned on savings</li>
                        <li> investments</li>
                        <li>any maintenance payments</li>
                      </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <p>Date of birth (DDMMYYYY)</p>
                      <Form.Control
                        type="date"
                        placeholder="Date of birth (DDMMYYYY)"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Don’t include income from:</p>
                      <ul>
                        <li>Child Benefit</li>
                        <li>
                          {" "}
                          Child Tax Credit or the childcare element of Universal
                          Credit
                        </li>
                        <li> Government Child Trust</li>
                      </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Government Child Trust"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Income from all sources after income tax and social security"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>You must provide</p>
                      <ul>
                        <li>copies of birth certificates; and </li>
                        <li>
                          evidence of Child Tax Credits and/or Child Benefits
                          for each child named.
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Child 2 full name"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p></p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Relationship to you"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Date of birth (DDMMYYYY)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="date"
                        placeholder="Date of birth (DDMMYYYY)"
                      />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        Income from all sources after income tax and social
                        security
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Who do they live with?"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Income from all sources"
                      />
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="app-form-secound">
              <Form.Group>
                <div className="row">
                  <h5>
                    Parents’ Learning Allowance, Childcare Grant and Adult
                    Dependants’ Grant
                  </h5>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        a) - Are you under 25, living with a partner and
                        applying for Childcare Grant or Parents’ Learning
                        Allowance?
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        b) - Give the total estimated income after Income Tax
                        and National Insurance deductions in academic year
                        2023/24 for:
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="text" placeholder="You" />
                      <Form.Control type="text" placeholder="Your partner" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        How much of this will be Child Tax Credit or the child
                        element of Universal Credit for academic year 2023/24?
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="text" placeholder="You" />
                      <Form.Control type="text" placeholder="Your partner" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>c1) - Do you want to apply for Childcare Grant?</p>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        c2)- During the academic year, do you or your partner
                        expect to receive:
                      </p>
                      <ul>
                        <li>
                          the childcare element of Working Tax Credit or
                          Universal Credit; or
                        </li>
                        <li>
                          Tax-Free Childcare from HM Revenue and Customs (HMRC);
                          or
                        </li>
                        <li>
                          Childcare Allowance from the National Health Service
                          (NHS) as part of a student finance package?
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex ">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>
                        c) - Give details of the children you need Childcare
                        Grant for during this academic year <br /> Only name
                        children that you haven’t applied for previously <br />{" "}
                        Childcare start date must not be earlier than your
                        academic year start date
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control
                        type="text"
                        placeholder="Child 1 Forename(s)"
                      />
                      <Form.Control type="text" placeholder="Surname" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Date of birth (DDMMYYYY)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="date" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Childcare start date (DDMMYYYY)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="date" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Child 2 Forename(s)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="text" placeholder="Forename" />
                      <Form.Control type="text" placeholder="Surname" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Date of birth (DDMMYYYY)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="date" />
                    </div>
                  </div>
                  <div className="app-form-box">
                    <div className="col-md-8 col-sm-12">
                      <p>Childcare start date (DDMMYYYY)</p>
                    </div>
                    <div className="col-md-4 col-sm-12 ">
                      <Form.Control type="date" />
                    </div>
                  </div>
                </div>
              </Form.Group>
              <div className="app-form-secound">
                <Form.Group>
                  <div className="row">
                    <h5>
                      Parents’ Learning Allowance, Childcare Grant and Adult
                      Dependants’ Grant
                    </h5>
                    <div className="app-form-box">
                      <div className="col-md-8 col-sm-12">
                        <p>
                          d1) - Are you applying for Adult Dependants’ Grant
                        </p>
                      </div>
                      <div className="col-md-4 col-sm-12 d-flex ">
                        <div class="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="app-form-box">
                      <div className="col-md-8 col-sm-12">
                        <p>
                          d2) -Who is your adult dependant? <br />
                          If you are applying for Adult Dependants’ Grant for an
                          adult who is or will be claiming student finance, you
                          are not eligible to apply for an Adult Dependants’
                          Grant for them. <br />
                          If at any point during your studies the adult
                          dependent on you claims student finance and you are in
                          receipt of Adult Dependants’ Grant, you should notify
                          us immediately.
                        </p>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div class="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Your husband
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Your wife
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Your civil partner
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Your partner (if you are 25 or over)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            other adult dependant
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="app-form-box">
                      <div className="col-md-8 col-sm-12">
                        <p>
                          d3) - Will your other adult dependant’s income be more
                          than £3,796 for the academic year 2023/24?
                        </p>
                      </div>
                      <div className="col-md-4 col-sm-12 d-flex ">
                        <div class="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="app-form-conent">
              <h4>Applying for an Adult Dependants’ Grant</h4>
              <p>
                You will not be able to apply for Adult Dependants’ Grant if
                your other adult dependant’s income is more than £3,796 in the
                academic year 2023/24.
              </p>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  d4) -Give your adult dependant’s income for the 2021-22 tax
                  year.
                </p>
                <h6>Income</h6>
              </div>
              {/* <div className="col-md-4 col-sm-12 ">
                <Form.Control
                  type="text"
                  placeholder="Who do they live with?"
                />
              </div> */}
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  All salary/wages and self-employed income (include income from
                  property)
                </p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
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
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  All gross taxable income from interest, investments and
                  dividends
                </p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>Taxable state benefits</p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>All other taxable income</p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <h6>Deductions </h6>
              </div>
              {/* <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div> */}
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>
                  Private pension contributions and Additional Voluntary
                  Contributions (AVCs){" "}
                </p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-box">
              <div className="col-md-8 col-sm-12">
                <p>Allowable expences on which tax relief was claimed</p>
              </div>
              <div className="col-md-4 col-sm-12 ">
                <Form.Control type="text" />
              </div>
            </div>
            <div className="app-form-conent">
              <h4>Declaration</h4>
              <ul>
                <li>
                  {" "}
                  I confirm that to the best of my knowledge and belief, the
                  information I have provided is true and complete. If it is not
                  I understand I may not receive financial support, any support
                  I have received may be withdrawn and I could be prosecuted.
                </li>
                <li>
                  I agree to give the Student Loans Company Ltd (SLC) any
                  information they require to process my application and agree
                  to tell them immediately if my circumstances change in any way
                  that might affect my entitlement to financial support. I
                  understand that if I do not do this, I may not receive any
                  further payments, and may have to repay the financial support
                  I have already received.
                </li>
                <li>
                  I agree that in the event of receiving an overpayment of
                  financial support, I am obligated to repay this in full.
                </li>
              </ul>
              <h4>Childcare Grant</h4>
              <ul>
                <li>
                  I understand and agree that in order to receive Childcare
                  Grant, my personal details and my children’s details will be
                  shared to a contracted third party who will be handling the
                  administration of Childcare Grants on behalf of SLC.
                </li>
                <li>
                  {" "}
                  I understand that if I do not inform SLC of any change of
                  circumstances that affect the amount of Childcare Grant I am
                  entitled to, I will have to pay back any overpayment.
                </li>
                <li>
                  I confirm that neither I nor my husband, wife, civil partner
                  or cohabiting partner have chosen to receive support for
                  childcare from the childcare element of: (i) the Working Tax
                  Credit; (ii), the Universal Credit; (iii) Tax-Free Childcare;
                  and/or (iv) the NHS Childcare Allowance; and I agree to tell
                  SLC immediately if I or my husband, wife, civil partner or
                  cohabiting partner does receive this support. I understand
                  that SLC reserves the right to share my personal data with
                  HMRC to check whether I am in receipt of childcare support
                  from HMRC.
                </li>
              </ul>
              <div className="app-form-box">
                <div className="col-md-12 col-sm-12">
                  <Form.Control
                    type="text"
                    placeholder="Your full name (in BLOCK CAPITALS)"
                  />
                </div>
              </div>
              <div className="app-form-box">
                <div className="col-md-6 col-sm-12 p-1">
                  <Form.Control type="text" placeholder="Your signature" />
                </div>
                <div className="col-md-6 col-sm-12 ">
                  <Form.Control
                    type="date"
                    placeholder="Today’s date (DDMMYYYY)"
                  />
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
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ApplicationFrom;
