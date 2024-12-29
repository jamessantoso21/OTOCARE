import React from "react";
import "../Orders/OrderCard.css";

function OrderCard({ orderId, orderShop, orderPrice, orderPaymentMethod,orderDate }) {
  return (
    <>
      <div className="orderCard-container">
        <div className="orderCard-wrapper">
          <div className="orderCard-top">
            <h1 className="orderCard-title">
              ORDER ID : {orderId}
            </h1>
          </div>
          <div className="orderCard-bottom">
            <div className="orderCard-bottom-left">
              <h1 className="orderCard-shop">{orderShop}</h1>
              <p className="orderCard-status"> STATUS : PAYMENT CONFIRMED ({orderPaymentMethod})</p>
              <p className="orderCard-date">Date : {orderDate}</p>
            </div>
            <div className="orderCard-bottom-mid">
              <p>RP. {orderPrice}</p>
            </div>
            <div className="orderCard-bottom-right">
              <button className="orderCard-btn">MESSAGE MECHANIC</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
