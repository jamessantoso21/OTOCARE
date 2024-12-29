import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import { Link } from "react-router-dom";
import "../Services/WheelBanner.css";

function WheelBanner() {
  return (
    <>
      <div className="wheelb-container">
        <div className="wheelb-wrapper">
          <div className="wheelb-description-container">
            <h1>WHEEL SERVICE</h1>
            <p>
            Ensure your safety on the road with our precision wheel services, including alignments, balancing, and tire inspections
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WheelBanner;
