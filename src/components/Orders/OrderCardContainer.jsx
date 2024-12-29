import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import OrderCard from "../Orders/OrderCard";

function OrderCardContainer({ docId }) {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const docRef = doc(db, "Orders", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setOrderData({
            orderShop: data.orderShop,
            orderPrice: data.orderPrice,
            orderPaymentMethod: data.orderPaymentMethod,
            orderDate: data.orderDate.toDate().toLocaleString(),
            userUID: data.userUID  // Add this line to include userUID
          });
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error fetching document: " + error.message);
      }
      setLoading(false);
    };

    fetchOrderData();
  }, [docId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderData) {
    return <div>No data</div>;
  }

  return (
    <OrderCard
      orderId={docId}
      orderShop={orderData.orderShop}
      orderPrice={orderData.orderPrice}
      orderPaymentMethod={orderData.orderPaymentMethod}
      orderDate={orderData.orderDate}
      userUID={orderData.userUID}  // Add this line to pass userUID to OrderCard
    />
  );
}

export default OrderCardContainer;