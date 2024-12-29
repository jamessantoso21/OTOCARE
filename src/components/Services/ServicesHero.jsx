import React from "react";
import { Button } from "../../UniversalComponents/Button/Button";
import '../Services/ServicesHero.css'

function ServicesHero() {
  return (
    <>
      <div className="services-hero-container">
        <div className="services-hero-wrapper">
          <div className="services-hero-wrapper-top">
            <h1>CRAFTING OTOMOTIVE EXCELLENCE, ONE REPAIR AT A TIME</h1>
            <p>
            Transforming challenges into confidence, we ensure our listed workshops craft automotive excellence with precision repairs, ensuring every detail is restored to perfection.
            </p>
          </div>
        </div>
      </div>

      <div className="services-hero-footer">
        <div className="services-hero-footer-wrapper">
          <div className="expertCraft">
            <div className="expertCraft-left">
              <img src="/gambarservices/Craftmanship.png" />
            </div>
            <div className="expertCraft-right">
              <h1>EXPERT CRAFTMANSHIP</h1>
              <p>
              Our workshops deliver meticulous repairs, ensuring quality in every service.{" "}
              </p>
            </div>
          </div>
          <div className="personalized">
            <div className="personalized-left">
              <img src="/gambarservices/Personalized.png" />
            </div>
            <div className="personalized-right">
              <h1>PERSONALIZED SOLUTION</h1>
              <p>
              Tailored to your needs, beyond standard maintenance.
              </p>
            </div>
          </div>
          <div className="trusted">
            <div className="trusted-left">
              <img src="/gambarservices/Trusted.png" />
            </div>
            <div className="trusted-right">
              <h1>TRUSTED EXCELLENCE</h1>
              <p>
              Reliable service and transparent communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesHero;
