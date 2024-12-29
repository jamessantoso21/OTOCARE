import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import { Link } from "react-router-dom";
import "../Services/ElectricalBanner.css";

function ElectricalBanner() {
  return (
    <>
      <div className="elecb-container">
        <div className="elecb-wrapper">
          <div className="elecb-description-container">
            <h1>Electricals</h1>
            <p>
            Elevate Every Drive with Our Premier Electrical Services! Your car's electrical system is its lifeline, orchestrating every essential function from ignition to safety features.
            </p>
          </div>
          <div className="elecb-img-container">
            <img src="/gambarservices/Electrical.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ElectricalBanner;
