import React, { useState, useEffect } from "react";
import "./workshop-home.css";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import EmbeddedMap from "../../UniversalComponents/EmbeddedMap/EmbeddedMap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function WorkshopHome() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
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
            fetchOrderStats(userData.UserName); // Fetch stats when username is available
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

  const fetchOrderStats = async (username) => {
    try {
      // Calculate the start date of last month
      const now = new Date();
      const today = new Date(now);
      const lastMonth = new Date(now.getFullYear(), now.getMonth()-1);

      console.log("Fetching stats for orders between:", today, "and", lastMonth);

      const ordersCollectionRef = collection(db, "Orders");
      const ordersQuery = query(
        ordersCollectionRef,
        where("orderShop", "==", username), // Match orderShop with username
        where("orderDate", ">=", lastMonth),
        where("orderDate", "<", today),
        orderBy("orderDate", "desc")
      );

      const ordersSnapshot = await getDocs(ordersQuery);

      let totalOrderCount = 0;
      let totalRevenueAmount = 0;

      ordersSnapshot.forEach((doc) => {
        totalOrderCount++;
        totalRevenueAmount += doc.data().orderPrice || 0; // Accumulate orderPrice
      });

      setTotalOrders(totalOrderCount);
      setTotalRevenue(totalRevenueAmount);
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <div className="titleContainer">
          <h1 className="workshopHome-header">
            Hi, {username ? `${username}'s workshop` : "Workshop"}!
          </h1>
          <h1 className="workshopHome-header">Welcome back to your dashboard</h1>
        </div>

        <div className="mapContainer">
          <h1 className="workshopHome-header">Emergency Order</h1>
          <EmbeddedMap />
        
          <Link to="/workshopConfirmation" className="getOrder-btn">Get Order</Link>
        </div>

        <div className="dashboardContainer">
          <div className="dashboard-top">
            <h1 className="workshopHome-header">Total Orders This Month</h1>
            <p className="workshopHome-text">{totalOrders}</p>
          </div>
          <div className="dashboard-bot">
            <h1 className="workshopHome-header">Total Revenue This Month</h1>
            <p className="workshopHome-text">Rp {totalRevenue.toLocaleString()}</p>
          
            <Link to="/workshopOrder" className="viewOrder-btn">View Orders</Link>
          </div>
        </div>

        <div className="manualOrder">
          <h1 className="workshopHome-header">Add Manual Order</h1>
        
          <Link to="/workshopForm" className="manualOrder-btn">Add Order</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkshopHome;
