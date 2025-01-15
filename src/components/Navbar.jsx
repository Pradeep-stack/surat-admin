import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "../assets/css/Navbar.css";


const Navbar = () => {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>

      <nav className="navbar">
        <div className="logo">
          {/* <img src={logo} alt="logo" className="logo-img" /> */}
          <Link to="/">Funding Fettle</Link>
        </div>
        <ul className="nav-links">

          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="/#feture">Feature</a>
          </li>
          <li>
            <a href="/#partner">Partner</a>
          </li>
          <li>
            <a href="/#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="/#price">Pricing</a>
          </li>
          <li>
            <a href="/#faq">FAQ's</a>
          </li>
          <li>
            <a href="/#contact">Contact</a>
          </li>
        </ul>

        <div><Link className="landing-login-btn" to="/login">Login</Link></div>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          ☰
        </button>
      </nav>

      <div className={`menu-mobile-shadow ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
        <div className={`mobile-navbar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="logo-mobile">
            <Link to="/">Funding Fettle</Link>
          </div>
          <ul className="mobile-nav-links">
            <li>
                <a href="/#home" onClick={closeMobileMenu}>Home</a>
            </li>
            <li>
              <a href="/#feture" onClick={closeMobileMenu}>Feature</a>
            </li>
            <li> 
              <a href="/#partner" onClick={closeMobileMenu}>Partner</a>
            </li>
            <li>
              <a href="/#testimonials" onClick={closeMobileMenu}>Testimonials</a>
            </li>
            <li>
              <a href="/#price" onClick={closeMobileMenu}>Pricing</a>
            </li>
            <li>
              <a href="/#faq" onClick={closeMobileMenu}>FAQ's</a>
            </li>
            <li>
              <Link to="/#contact" onClick={closeMobileMenu}>Contact</Link>
            </li>
          </ul>
          <div>
            <Link className="mobil-landing-login-btn" to="/login">Login</Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
