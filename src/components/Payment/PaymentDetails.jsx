import React from "react";
import "./PaymentDetails.css";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: "100%",
    }}
  />
);

function PaymentDetails() {
  return (
    <div className="PaymentDetails-container">
      <div className="PaymentDetails-wrapper">
        <div className="PaymentDetails-margin">
          <div className="PaymentDetails-wrapper-middle">
            <div className="ServicePayment">
              <p>STANDARD OIL CHANGE</p>
              <p>Rp 500.000</p>
            </div>
            <div className="MobileServiceCharge">
              <p>MOBILE SERVICE CHARGE</p>
              <p>RP 10.000</p>
            </div>
            <ColoredLine color="black" />
            <div className="Subtotal">
              <p>SUBTOTAL</p>
              <p>RP 510.000</p>
            </div>
          </div>
          <div className="PaymentMethod">
            <h1>PAYMENT METHOD</h1>
          </div>
          <div className="PaymentDetails-wrapper-bottom">
            <button className="paymentMethod-btn">
              <div className="paymentMethod-btn-text">Pay at Merchant</div>
              <img src="./Merchant.png" alt="" className="paymentMethod-img" />
            </button>
            <button className="paymentMethod-btn">
              <div className="paymentMethod-btn-text">QRIS</div>
              <img src="./qr.png" alt="" className="paymentMethod-img" />
            </button>
            <button className="paymentMethod-btn">
              <div className="paymentMethod-btn-text">Debit/Credit</div>
              <div className="debit-container">
                <img src="./visa.png" alt="" className="debit-img" />
                <img src="./mastercard.png" alt="" className="debit-img" />
                <img src="./amex.png" alt="" className="debit-img" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
