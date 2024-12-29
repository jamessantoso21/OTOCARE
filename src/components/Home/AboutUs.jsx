import React from "react";
import "../Home/AboutUs.css";

function AboutUs() {
  return (
    <>
      <div className="aboutUs-container">
        <div className="aboutUs-wrapper">
          <div className="aboutUs-left-container">
            <img src="./gambarhome/AboutUs-img1.png" className="aboutUs-img-left" />
            <p className="aboutUs-text-1">
              Whether you're at home, work, or stranded on the roadside, we've
              got you covered. With a commitment to transparency, integrity, and
              customer satisfaction, we're here to provide convenient and
              reliable auto repairs that exceed your expectations. Experience
              the convenience of on-demand auto care with OTOCARE today.
            </p>
          </div>
          <div className="aboutUs-right-container">
            <div className="aboutUs-logo">
              <img src="squiggle.png" className="squiggle" />
              <div className="aboutUs-header"> WHO WE ARE</div>
            </div>

            <h2>CERTIFIED CAR SERVICE REPAIRS AND MAINTANANCE </h2>
            <p className="aboutUs-text-2">
              Welcome to OTOCARE, your trusted solution for mobile auto repairs.
              We're dedicated to making your life easier by bringing top-quality
              automotive services directly to your doorstep. Our team of
              certified technicians is equipped with cutting-edge tools to
              ensure efficient repairs wherever you are.
            </p>
            <img src="./gambarhome/AboutUs-img2.png" className="aboutUs-img-right" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;

