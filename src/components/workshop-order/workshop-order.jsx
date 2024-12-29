import React, { useState, useEffect } from "react";
import "./workshop-order.css";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import OrderCardContainer from "../Orders/OrderCardContainer";

function WorkshopOrder() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Fetch user document based on UID
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.UserName);
            fetchOrders(userData.UserName);
          } else {
            console.error("No user document found for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (username) => {
    try {
      const ordersCollectionRef = collection(db, "Orders");
      const ordersQuery = query(
        ordersCollectionRef,
        where("orderShop", "==", username),
        orderBy("orderDate", "desc")
      );
      const ordersSnapshot = await getDocs(ordersQuery);

      const orderData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <div className="orders-wrapper">
          <div className="orders-title">
            <h1>YOUR ORDERS (NEWEST TO OLDEST)</h1>
           
          </div>

          <div className="cards-container">
            <div className="cards-wrapper">
              {orders.length === 0 ? (
                <div className="no-orders">No orders found</div>
              ) : (
                orders.map((order) => (
                  <OrderCardContainer key={order.id} docId={order.id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkshopOrder;