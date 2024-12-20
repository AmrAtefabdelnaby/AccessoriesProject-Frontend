import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../../style/_footer.scss";

const Footer = () => {
  return (
    <footer className="footer py">
      <div className="footer-container py px">
        <div className="footer-section">
          <h1 className="logo">Logo</h1>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are a leading e-commerce platform offering a wide range of
            high-quality products. Customer satisfaction is our top priority.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutUs">About</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <div className="social-item">
              <FaFacebook className="icon" />
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            </div>
            <div className="social-item">
              <FaTwitter className="icon" />
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            </div>
            <div className="social-item">
              <FaInstagram className="icon" />
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
            <div className="social-item">
              <FaLinkedin className="icon" />
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
