import React from "react";
import "../../style/_aboutUs.scss";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="header">
        <h1>About Us</h1>
        <p>Your trusted partner in exceptional products and services.</p>
      </div>
      <div className="content">
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            At our core, we are dedicated to delivering high-quality products
            that enhance the lives of our customers. We believe in innovation,
            sustainability, and putting people first.
          </p>
        </div>
        <div className="section">
            <h2>Our Vision</h2>
          <p>
            To be a globally recognized brand known for its commitment to
            excellence, creativity, and customer satisfaction.
          </p>
        </div>
        <div className="team">
          <h2>Meet Our Team</h2>
          <div className="team-list">
            <div className="team-member">
              <img
                src="../../../public/images for my app/team-member/_ARM1665.jpg"
                alt="Team Member 1"
                className="team-member__image"
              />
              <h3 className="team-member__name">Amr Atef</h3>
              <p className="team-member__role">CEO & Founder</p>
            </div>
            <div className="team-member">
              <img
                src="../../../public/images for my app/team-member/_ARM1665.jpg"
                alt="Team Member 2"
                className="team-member__image"
              />
              <h3 className="team-member__name">Amr Atef</h3>
              <p className="team-member__role">Head of Operations</p>
            </div>
            <div className="team-member">
              <img
                src="../../../public/images for my app/team-member/_ARM1665.jpg"
                alt="Team Member 3"
                className="team-member__image"
              />
              <h3 className="team-member__name">Amr Atef</h3>
              <p className="team-member__role">Lead Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
