import React from "react";
import "./ServiceBox.css";

function ServiceBox({
  handleClick,
  serviceName,
  imageUrl,
  priceStandard,
  isSelected,
}) {
  return (
    <div
      className={`serv-card ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className="serv-card-top">
        <img src={imageUrl} className="serv-card-img"  />
      </div>
      <div className="serv-card-bottom">
        <h1 className="serv-card-title">{serviceName}</h1>
        <h2>PRICE</h2>
        <p className="serv-card-services1">{priceStandard}</p>
      </div>
    </div>
  );
}

export default ServiceBox;
