import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import { Link } from "react-router-dom";
import "../Services/OilBanner.css";

function OilBanner() {
  return (
    <>
      <div className="oilb-container">
        <div className="oilb-wrapper">
          <div className="oilb-description-container">
            <h1>OIL & FLUIDS</h1>
            <p>
            Maintain peak performance with our oil and fluid services, expertly tailored for your vehicle's needs.
            </p>
          </div>
          <div className="oilb-img-container">
            <img src="/gambarservices/OilFluid.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OilBanner;
