import React, { useEffect, useState } from "react";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer.jsx";
import "./PaymentPage.css";
import RepairShopBanner from "./RepairShopBanner";
import PaymentHeader from "./PaymentHeader";
import { Link, useParams } from "react-router-dom";
import { db, auth } from "../../firebase.js";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import "./PaymentDetails.css";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const { searchID } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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

  const handlePayment = async (paymentMethod) => {
    if (!currentUser) {
      alert("Please login to continue with payment");
      navigate('/login');
      return;
    }

    console.log("Current User in Payment:", currentUser); // Debug log
    console.log("Current User UID:", currentUser.uid);    // Debug log

    try {
      const orderData = {
        orderShop: firstShop.title,
        orderList: selectedServices.map((service) => ({
          id: service.id,
          serviceTitle: service.serviceTitle,
          servicePrice: service.servicePrice,
        })),
        orderPrice: subtotal + 10000,
        orderPaymentMethod: paymentMethod,
        orderDate: new Date(),
        userUID: currentUser.uid
      };

      console.log("Order Data being sent:", orderData); // Debug log

      const docRef = await addDoc(collection(db, "Orders"), orderData);
      console.log("Order placed successfully with ID: ", docRef.id);
      navigate('/confirmation');
    } catch (error) {
      console.error("Error placing order: ", error);
    }
};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const searchData = async () => {
      try {
        const dbQuery = query(
          collection(db, "RepairShops"),
          where("title", ">=", searchID),
          where("title", "<=", searchID + "\uf8ff")
        );
        const dbFound = await getDocs(dbQuery);
        let shops = [];

        for (const doc of dbFound.docs) {
          const shop = doc.data();
          const shopServicesRef = await getDocs(
            query(collection(doc.ref, "Services"), where("choice", "==", true))
          );
          let shopServices = [];

          for (const shopDoc of shopServicesRef.docs) {
            const service = shopDoc.data();
            shopServices.push({
              id: shopDoc.id,
              serviceTitle: service.title,
              servicePrice: service.price,
              priceText: service.subtitle,
              choice: service.choice,
            });
          }

          shops.push({
            id: doc.id,
            img: shop.img,
            rating: shop.rating,
            service1: shop.service1,
            service2: shop.service2,
            service3: shop.service3,
            star: shop.star,
            subtitle: shop.subtitle,
            title: shop.title,
            services: shopServices,
          });
        }

        setSearchResult(shops);
      } catch (e) {
        console.log("No data fetched, Error found :", e);
      }
    };

    searchData();
  }, [searchID]);

  const firstShop = searchResult.length > 0 ? searchResult[0] : null;

  const selectedServices = firstShop ? firstShop.services : [];
  const subtotal = selectedServices.reduce(
    (acc, service) => acc + service.servicePrice,
    0
  );

  return (
    <>
      <div>
        <Navbar />
      </div>
      {firstShop && (
        <RepairShopBanner title={firstShop.title} rating={firstShop.rating} />
      )}
      <PaymentHeader />
      <div className="PaymentDetails-container">
        <div className="PaymentDetails-wrapper">
          <div className="PaymentDetails-margin">
            <div className="PaymentDetails-wrapper-middle">
              {selectedServices.map((service) => (
                <div className="ServicePayment" key={service.id}>
                  <p>{service.serviceTitle}</p>
                  <p>Rp {service.servicePrice}</p>
                </div>
              ))}
              <div className="MobileServiceCharge">
                <p>MOBILE SERVICE CHARGE</p>
                <p>Rp 10000</p>
              </div>
              <ColoredLine color="black" />
              <div className="Subtotal">
                <p>SUBTOTAL</p>
                <p>Rp {subtotal + 10000}</p>
              </div>
            </div>
            <div className="PaymentMethod">
              <h1>PAYMENT METHOD</h1>
            </div>
            <div className="PaymentDetails-wrapper-bottom">
              <button 
                className="paymentMethod-btn"
                onClick={() => handlePayment("Pay at Merchant")}
              >
                <div className="paymentMethod-btn-text">Pay at Merchant</div>
                <img src="/Merchant.png" alt="" className="paymentMethod-img" />
              </button>
              <button 
                className="paymentMethod-btn"
                onClick={() => handlePayment("QRIS")}
              >
                <div className="paymentMethod-btn-text">QRIS</div>
                <img src="/qr.png" alt="" className="paymentMethod-img" />
              </button>
              <button 
                className="paymentMethod-btn"
                onClick={() => handlePayment("Debit/Credit")}
              >
                <div className="paymentMethod-btn-text">Debit/Credit</div>
                <div className="debit-container">
                  <img src="/visa.png" alt="" className="debit-img" />
                  <img src="/mastercard.png" alt="" className="debit-img" />
                  <img src="/amex.png" alt="" className="debit-img" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;