import React, { useState } from "react";
import "./RepairShops.css";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer";
import CardContainer from "../../UniversalComponents/Card/CardContainer";
import SearchFilter from "../../UniversalComponents/SearchFilter/SearchFilter";

function RepairShops() {
  const [result, setResult] = useState([]);

  return (
    <>
      <Navbar />
      <div className="title-container">
        <div className="title-wrapper">
          <div className="title-left">
            <h1>REPAIR SHOPS</h1>
          </div>
          <div className="title-right">
            <SearchFilter setResult={setResult} />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards-wrapper">
          {result.map((repairShop) => (
            <button className="repairShop-card-wrapper" key={repairShop.id}>
              
                <CardContainer docId={repairShop.id} />
              
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RepairShops;
