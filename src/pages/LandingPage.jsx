import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/LandingPage.css";
import hero from "../assets/images/banner-500.jpeg";
import hero2 from "../assets/images/bannermobile.jpeg";
import banner2 from "../assets/images/banner2.jpeg";
import banner3 from "../assets/images/banner22.jpeg";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getTestimonialsAsync } from "../features/testimonial/testinmonialThunks";
import { getCentersAsync } from "../features/center/centerThunk";
import { getVideoAsync } from "../features/video/videoThunk";
import Loader from "../components/Loader";
import { IMG_URL } from "../config/index";

const LandingPage = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state?.testimonial?.testimonials);
  const centers = useSelector((state) => state?.centers?.centers);
  const videos = useSelector((state) => state?.videos?.videos);
  const [loader, setLoader] = useState(false);
  const [expandedTestimonialIds, setExpandedTestimonialIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getTestimonialsAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getCentersAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      await dispatch(getVideoAsync());
      setLoader(false);
    };

    fetchData();
  }, [dispatch]);

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Function to generate download URL
  const getDownloadUrl = (url) => {
    return `${IMG_URL}/download?url=${encodeURIComponent(url)}`;
  };

  const toggleExpand = (id) => {
    setExpandedTestimonialIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="landing-page" id="home">
        <section>
          <div className="hero-section">
            <img src={hero} alt="App Illustration" />
            <div className="hero-text">
              <h1>Welcome to ChildCare Funding</h1>
              <p className="hero-subtext">
                Empowering parents to access child care funding easily.
              </p>
              <p className="hero-subtext">Simplify the process with our app.</p>
              <Link to="/register">
                <button className="hero-reg-btn">Sign Up for a Demo</button>
              </Link>
            </div>
            <div className="hero-cover"></div>
          </div>

          <div className="hero-section-mobil">
            <img src={hero2} alt="App Illustration" />
            <div className="hero-text">
              <h1>Welcome to ChildCare Funding</h1>
              <p className="hero-subtext">
                Empowering parents to access child care funding easily.
              </p>
              <p className="hero-subtext">Simplify the process with our app.</p>
              <Link to="/register">
                <button className="hero-reg-btn">Sign Up for a Demo</button>
              </Link>
            </div>
            <div className="hero-cover"></div>
          </div>
        </section>

        <section className="lnd-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="options-text">
                  <span className="options-text1">Who We Are</span>
                  <p className="options-text2">
                    At Funding Fettle, we're on a mission to revolutionize child
                    care funding for parents. Our innovative platform simplifies
                    the application process, making it a breeze for families to
                    access the support they need.
                  </p>
                  <p className="options-text2">
                    Join us in our quest to empower parents and transform the
                    child care landscape. With Funding Fettle, securing funding
                    for your child's care has never been easier!.
                  </p>
                  <p className="options-text2">
                    Experience the future of child care funding with Funding
                    Fettle - where convenience meets compassion.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="options">
                  <img src={banner2} alt="App Illustration" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lnd-section">
          <div className="container">
            <div className="todo-landing">
              <p>Ready to Transform Child Care Funding</p>
              <Link to="/register">
                <button className="land-todo-btn">Start Now</button>
              </Link>
            </div>
          </div>
        </section>

        <section id="feture">
          <div className="fes-background">
            <div className="container">
              <div className="section-text">
                <div className="options-text3">FEATURES</div>
                <p className="sction-sub-title">
                  Empowering Parents with Seamless Child Scholarship Funding
                  Solutions
                </p>
                <p className="sction-sub-sub-title">
                  Discover the features that make our platform the ideal choice
                  for parents seeking financial assistance for child Scholarship
                </p>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="feature-boxes">
                    <div className="d-flex">
                      <Icon
                        style={{ fontSize: "40px", marginBottom: "7px" }}
                        icon="mdi:application-edit-outline"
                      />
                      <p className="feature-boxes-text">
                        Easy Application Process
                      </p>
                    </div>

                    <p className="feature-boxes-sub-text">
                      Simplified steps to help parents apply for child
                      Scholarship funding effortlessly
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="feature-boxes">
                    <div className="d-flex">
                      <Icon
                        style={{ fontSize: "40px", marginBottom: "7px" }}
                        icon="fluent:building-32-regular"
                      />
                      <p className="feature-boxes-text">
                        Partnered Scholarship Centers
                      </p>
                    </div>
                    <p className="feature-boxes-sub-text">
                      Access to a network of trusted daycare centers ready to
                      assist with funding applications
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="feature-boxes">
                    <div className="d-flex">
                      <Icon
                        style={{ fontSize: "40px", marginBottom: "7px" }}
                        icon="flowbite:users-group-outline"
                      />
                      <p className="feature-boxes-text">
                        Local Council Support
                      </p>
                    </div>
                    <p className="feature-boxes-sub-text">
                      Guidance on submitting funding applications through local
                      Councils in the UK
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="feature-boxes">
                    <div className="d-flex">
                      <Icon
                        style={{ fontSize: "40px", marginBottom: "7px" }}
                        icon="ri:presentation-fill"
                      />
                      <p className="feature-boxes-text">Demo Account Sign Up</p>
                    </div>
                    <p className="feature-boxes-sub-text">
                      Create an account and sign up for a demo to experience our
                      services firsthand
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="lnd-section"
          style={{ background: "#d7f5e8" }}
          id="partner"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="options">
                  <img src={banner3} alt="App Illustration" />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="options-text">
                  <span className="options-text1">Become a Partner.</span>
                  <p className="options-text2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid excepturi optio esse iure rerum velit corrupti
                    minima libero voluptatem ipsum quia, quod quae asperiores
                    animi autem sunt sed? Quas, delectus? Optio dicta commodi
                    nam illo tempora veritatis! Qui eveniet, excepturi quod
                    consectetur reprehenderit assumenda dolores velit illo saepe
                    perspiciatis earum?
                  </p>
                </div>
              </div>
            </div>

            <div className="section-text2" style={{ padding: "40px 0px" }}>
              <span className="sction-title">JOIN OUR PARTNER CENTERS </span>
            </div>

            <div className="row">
              <Slider {...settings}>
                {centers?.map((center) => (
                  <div className="col-6 col-md-3" key={center.id}>
                    <div className="partner-box">
                      <Icon
                        style={{ fontSize: "60px", marginBottom: "7px" }}
                        icon="fluent:building-32-regular"
                      />
                      <p className="partner-box-text">{center?.fullName}</p>
                      <p>{center?.email}</p>
                      {center?.phone}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            {/* <div className="d-flex justify-content-center" style={{ padding: "25px 0px" }}>
                            <button className="land-todo-btn">View Available Centers</button>
                        </div> */}
          </div>
        </section>

        <section className="lnd-section">
          <div className="container">
            <div className="options-text3">How it Works</div>
            <p className="section-lnd-sub">
              Join us in revolutionizing the way parents access child care
              funding. With our intuitive workflow, parents can easily navigate
              the application process and secure the support they need for their
              little ones.
            </p>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="partner-box">
                  <Icon
                    style={{ fontSize: "60px", marginBottom: "7px" }}
                    icon="clarity:form-line"
                  />
                  <p className="partner-box-text1">Easy Apply</p>
                  <p>
                    Simplify the application process with our user-friendly
                    interface, making it easy for parents to apply.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="partner-box">
                  <Icon
                    style={{ fontSize: "60px", marginBottom: "7px" }}
                    icon="fluent:building-32-regular"
                  />
                  <p className="partner-box-text1">Partner Centers</p>
                  <p>
                    Discover our network of trusted day care centers ready to
                    support your child care needs.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="partner-box">
                  <Icon
                    style={{ fontSize: "60px", marginBottom: "7px" }}
                    icon="flowbite:users-group-outline"
                  />
                  <p className="partner-box-text1">Local Support</p>
                  <p>
                    Access a list of all local councils in the UK to assist you
                    in submitting your funding applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="lnd-section"
          style={{ background: "#d7f5e8" }}
          id="testimonials"
        >
          <div className="container">
            <div className="options-text3">TESTIMONIAL</div>
            {loader ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <div className="row">
                <Slider {...settings}>
                  {testimonials?.map((testimonial) => (
                    <div className="col-6 col-md-3" key={testimonial.id}>
                      <div className="partner-box">
                        <img src={testimonial.cover} alt="App Illustration" />

                        <p className="partner-box-text">{testimonial.tag}</p>

                        <p className="partner-box-date">
                          {new Date(
                            testimonial?.createdAt
                          ).toLocaleDateString()}
                        </p>

                        <div className="testimonial-icon">
                          <p className="testml-title">
                            {testimonial?.postTitle}
                          </p>
                          <p
                            className={`testimonial-description ${
                              expandedTestimonialIds.includes(testimonial.id)
                                ? "expanded"
                                : ""
                            }`}
                          >
                            {testimonial?.description}
                          </p>
                          <Icon
                            className="testi-icon"
                            style={{ fontSize: "60px" }}
                            icon="ooui:quotes-ltr"
                          />
                        </div>
                        <button
                          className="land-todo-btn2"
                          onClick={() => toggleExpand(testimonial.id)}
                        >
                          {expandedTestimonialIds.includes(testimonial.id)
                            ? "Show Less"
                            : "Show More"}
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            <div className="video-card-row">
              <div className="options-text3" style={{ marginTop: "40px" }}>
                VIDEO
              </div>
              <div className="row">
                <Slider {...settings}>
                  {videos?.map((video) => (
                    <div className="col-6 col-md-4 col-sm-6">
                      <div className="card" key={video.id}>
                        <iframe
                          // src={video?.url}
                          src={getEmbedUrl(video?.url)}
                          frameBorder="0"
                          allowFullScreen
                          title={video?.title}
                        ></iframe>
                        <div className="card-body">
                          <h6 className="card-title">{video?.title}</h6>
                          <p className="card-text">{video?.description}</p>
                        </div>
                        <div
                          className="video-bottom-btn"
                          style={{ justifyContent: "center" }}
                        >
                          <a className="wcth-now">Watch Now</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="lnd-section" id="price">
          <div className="container">
            <div className="options-text3">PRICING</div>
            {/* <p className="section-lnd-sub">Select the plan that best suits your needs</p> */}

            <div className="main-price-box">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="price-box">
                    <div className="price-top-sec">
                      <p className="price-top">Standard Fee </p>
                      <p className="price-sub-text">Access all features</p>
                      <p className="pric-text">£2.50</p>
                    </div>

                    <button className="price-btn">Get Started</button>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="price-box-right">
                    <p className="prc-box-rht-tle">
                      Application Processing Fee
                    </p>
                    <p>
                      A standard fee is applied to support parents with the
                      administrative costs involved in processing their
                      application. This fee helps ensure that the application
                      process is handled efficiently and effectively, providing
                      timely and accurate service.
                    </p>
                    <div className="prc-box-iculd">
                      <p>WHAT'S INCLUDED</p>
                      <div className="prc-box-iculd-space"></div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <ul>
                          <li>
                            {" "}
                            <span className="pice-green">✔</span> Quick
                            application process
                          </li>
                          <li>
                            <span className="pice-green">✔</span> Form
                            correction before submission
                          </li>
                          <li>
                            <span className="pice-green">✔</span> Automated
                            submission to council
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 col-md-6">
                        <ul>
                          <li>
                            {" "}
                            <span className="pice-green">✔</span>Opportunity to
                            review filled form
                          </li>
                          <li>
                            <span className="pice-green">✔</span> Printable form
                            copy
                          </li>
                          <li>
                            <span className="pice-green">✔</span> Priority
                            support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="fes-background">
            <div className="container">
              <div className="options-text3" style={{ marginBottom: "30px" }}>
                Stay Connected
              </div>
              <div className="contact-card">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="section-text3">
                      <div className="options-text4">Get In Touch With Us</div>
                      <span>
                        Reach out to us using the form below. Whether you have
                        questions, feedback, or need assistance, we're here to
                        help. Simply fill out the fields, and we'll get back to
                        you as soon as possible. Your message will be sent
                        directly to our dedicated team.
                      </span>
                      <div className="contact-detail-box">
                        <div className="cntct-det-sub">
                          <div className="cntct-det-icon">
                            <Icon
                              className="testi-icon"
                              style={{ fontSize: "35px" }}
                              icon="majesticons:home-line"
                            />
                          </div>

                          <div className="cntct-det-detl">
                            <h4>Our Location</h4>
                            <p>
                              London & Partners, AND455, Union Street, London
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="contact-detail-box">
                        <div className="cntct-det-sub">
                          <div className="cntct-det-icon">
                            <Icon
                              className="testi-icon"
                              style={{ fontSize: "35px" }}
                              icon="bi:phone"
                            />
                          </div>

                          <div className="cntct-det-detl">
                            <h4>Phone Number</h4>
                            <p>044 222 222 9988</p>
                          </div>
                        </div>
                      </div>

                      <div className="contact-detail-box">
                        <div className="cntct-det-sub">
                          <div className="cntct-det-icon">
                            <Icon
                              className="testi-icon"
                              style={{ fontSize: "35px" }}
                              icon="oui:email"
                            />
                          </div>

                          <div className="cntct-det-detl">
                            <h4>Email Address</h4>
                            <p>abcdef@funding.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="conact-box-landing">
                      <Form>
                        <Form.Group>
                          <Form.Control
                            autoFocus
                            required
                            type="text"
                            name="fullName"
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group id="email">
                          <InputGroup>
                            <Form.Control
                              autoFocus
                              required
                              type="email"
                              name="email"
                              placeholder="Your Email"
                            />
                          </InputGroup>
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="phone"
                            className="form-control"
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[0-9]*"
                            placeholder="Mobile Number"
                          />
                        </Form.Group>

                        <Form.Group id="email">
                          <InputGroup>
                            <Form.Control
                              as="textarea"
                              type="text"
                              name="msg"
                              rows={3}
                              placeholder="Type Your Message Here"
                            />
                          </InputGroup>
                        </Form.Group>

                        <Button type="submit" className="login-btn">
                          {loader ? "Process.." : "Submit"}
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          {/* <div className="container">
                        <div className="footer-top">
                            
                        </div>
                    </div> */}

          <div className="footer-middel">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="footer-middel-box">
                    <div className="footer-middel-logo">Funding Fettle</div>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Laborum reiciendis aut tenetur nisi aliquam quas eaque? Ut
                      eaque, cumque praesentium aliquam ipsum totam quibusdam
                      placeat!
                    </p>
                    <span className="fo-mdl-text">
                      <Icon
                        className="foo-stay2"
                        style={{ fontSize: "35px" }}
                        icon="ion:call-sharp"
                      />
                      123-456-7890
                    </span>

                    <span className="fo-mdl-text">
                      <Icon
                        className="foo-stay2"
                        style={{ fontSize: "35px" }}
                        icon="mage:email"
                      />
                      info@FundingFettle.com
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="mdl-menu-box">
                    <div className="mdl-menu-title">Main Menu</div>
                    <div className="btm-line"></div>
                    <ul>
                      <li>
                        <a href="/#home">Home</a>
                      </li>
                      <li>
                        <a href="/#home">About US</a>
                      </li>
                      <li>
                        <a href="/#faq">FAQ's</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#faq">Contact</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#price">Pricing</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="mdl-menu-box">
                    <div className="mdl-menu-title">Other Links</div>
                    <div className="btm-line"></div>
                    <ul>
                      <li>
                        <a href="/#testimonials">Testimonials</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#partner">Partner</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#Feture">Feature</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#faq">Privacy Policy</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#price">Terms & Conditions</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-md-2">
                  <div className="mdl-menu-box">
                    <div className="mdl-menu-title">Social</div>
                    <div className="btm-line"></div>

                    <ul>
                      <li>
                        <a href="#">
                          <span>
                            <Icon
                              className="foo-stay2"
                              style={{ fontSize: "30px" }}
                              icon="uil:facebook-f"
                            />
                          </span>{" "}
                          <span>Facebook</span>
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">
                          <span>
                            <Icon
                              className="foo-stay2"
                              style={{ fontSize: "30px" }}
                              icon="uim:twitter-alt"
                            />
                          </span>{" "}
                          <span>Twitter</span>
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">
                          <span>
                            <Icon
                              className="foo-stay2"
                              style={{ fontSize: "30px" }}
                              icon="streamline:instagram-solid"
                            />
                          </span>{" "}
                          <span>Instagram</span>
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">
                          <span>
                            <Icon
                              className="foo-stay2"
                              style={{ fontSize: "30px" }}
                              icon="mage:linkedin"
                            />
                          </span>{" "}
                          <span>Linkedin</span>
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">
                          <span>
                            <Icon
                              className="foo-stay2"
                              style={{ fontSize: "30px" }}
                              icon="fe:youtube"
                            />
                          </span>{" "}
                          <span>YouTube</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-buttom">
            © 2024 Funding Fettle. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
