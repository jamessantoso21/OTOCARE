import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import { Link } from "react-router-dom";
import "../Services/ElectricalBanner.css";

function BannerHalf(props) {
  return (
    <>
      <div className="-container">
        <div className="elecb-wrapper">
          <div className="elecb-description-container">
            <h1>{props.title}</h1>

            <p>
                {props.text}
            </p>

          </div>
          <div className="elecb-img-container">
            <img src={props.img} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerHalf;
