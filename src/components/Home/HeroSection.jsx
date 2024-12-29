import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import "../Home/HeroSection.css";

function HeroSection() {
  return (
    <>
      <div className="hero-container">
        <div className="hero-wrapper">
          <div className="hero-wrapper-top">
            <h1>QUALITY REPAIRS AT LIGHTNING SPEED</h1>
            <p>
              Our certified technicians are focused on swift turnaround without
              compromising work quality, getting you back on the road quickly
              and reliably.{" "}
            </p>
          </div>
          <div className="hero-wrapper-bottom">
            <div className="hero-btns">
              <Button
                linkTo="/RepairShops"
                className="btns" 
                buttonStyle="btn--primary"
                buttonSize="btn--large"
              >
                MAKE APPOINTMENT
              </Button>
            </div>
            <img src="./gambarhome/hotline.png" />
          </div>
        </div>
      </div>

      <div className="hero-footer">
        <div className="hero-footer-wrapper">
          <div className="bestPrices">
            <div className="bestPrices-left">
              <img src="./gambarhome/price-icon.png" />
            </div>
            <div className="bestPrices-right">
              <h1>BEST PRICES</h1>
              <p>
                All mechanical repairs and services are available at affordable
                rates{" "}
              </p>
            </div>
          </div>
          <div className="guarantee">
            <div className="guarantee-left">
              <img src="./gambarhome/guarantee-icon.png" />
            </div>
            <div className="guarantee-right">
              <h1>100% GUARANTEED</h1>
              <p>
                All of our repairs and services come with a guarantee period
              </p>
            </div>
          </div>
          <div className="certified">
            <div className="certified-left">
              <img src="./gambarhome/certified-icon.png" />
            </div>
            <div className="certified-right">
              <h1>CERTIFIED MECHANICS</h1>
              <p>
                All of our mechanics are qualified and are regularly trained.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
