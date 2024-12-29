import React from "react";
import "../Home/Testimonial.css";

function Testimonial() {
  return (
    <>
      <div className="testi-container">
        <div className="testi-wrapper">
          <div className="testi-top-wrapper">
            <div className="testi-logo">
              <img src="/squiggle.png" className="squiggle" />
              <div className="testi-header">TESTIMONIALS</div>
            </div>
            <h2>WHAT OUR CLIENTS SAYS</h2>
          </div>
          <div className="testi-bot-wrapper">
            <div className="testi-1-wrapper">
              <img src="./gambarhome/testi-1.png" className="testi-1" />
            </div>
            <div className="testi-2-wrapper">
              <img src="./gambarhome/testi-2.png" className="testi-2" />
            </div>
            <div className="testi-3-wrapper">
              <img src="./gambarhome/testi-3.png" className="testi-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
