import React, { useState, useEffect } from "react";
import "./WorkshopFormPage.css";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function WorkshopFormPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    orderShop: "",
    orderList: [{ serviceTitle: "", servicePrice: 0 }],
    orderPaymentMethod: "Pay at Merchant"
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Check if user is a workshop
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          const userData = userDoc.data();
          
          if (userData?.Role !== "Workshop") {
            alert("Access denied. Only workshop accounts can access this page.");
            navigate("/");
            return;
          }
          
          setCurrentUser(user);
          // Pre-fill workshop name if available
          if (userData?.UserName) {
            setFormData(prev => ({
              ...prev,
              orderShop: userData.UserName
            }));
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          navigate("/");
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.orderList];
    newServices[index] = {
      ...newServices[index],
      [field]: field === "servicePrice" ? Number(value) : value,
    };
    setFormData({ ...formData, orderList: newServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      orderList: [...formData.orderList, { serviceTitle: "", servicePrice: 0 }],
    });
  };

  const removeService = (index) => {
    if (formData.orderList.length > 1) {
      const newServices = formData.orderList.filter((_, i) => i !== index);
      setFormData({ ...formData, orderList: newServices });
    }
  };

  const calculateTotal = () => {
    return formData.orderList.reduce(
      (sum, service) => sum + Number(service.servicePrice),
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const orderData = {
        orderShop: formData.orderShop,
        orderList: formData.orderList.map((service) => ({
          serviceTitle: service.serviceTitle,
          servicePrice: Number(service.servicePrice)
        })),
        orderPrice: calculateTotal(),
        orderPaymentMethod: formData.orderPaymentMethod,
        orderDate: new Date(),
        userUID: currentUser.uid  // Using current workshop's UID
      };

      console.log("Submitting order:", orderData); // Debug log
      await addDoc(collection(db, "Orders"), orderData);
      alert("Order created successfully!");
      navigate("/workshopOrder");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order: " + error.message);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="background"></div>
        <div className="background-image"></div>
        <div className="workshop-form-wrapper">
          <div className="workshop-form-box">
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="workshopName">Workshop Name</label>
              <input
                type="text"
                id="workshopName"
                value={formData.orderShop}
                onChange={(e) =>
                  setFormData({ ...formData, orderShop: e.target.value })
                }
                required
                placeholder="Enter workshop name"
              />

              <div className="services-section">
                <label>Services</label>
                {formData.orderList.map((service, index) => (
                  <div key={index} className="service-input-group">
                    <input
                      type="text"
                      value={service.serviceTitle}
                      onChange={(e) =>
                        handleServiceChange(index, "serviceTitle", e.target.value)
                      }
                      placeholder="Service name"
                      required
                    />
                    <input
                      type="number"
                      value={service.servicePrice}
                      onChange={(e) =>
                        handleServiceChange(index, "servicePrice", e.target.value)
                      }
                      placeholder="Price"
                      required
                    />
                    {formData.orderList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addService} className="add-btn">
                  Add Service
                </button>
              </div>

              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                value={formData.orderPaymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, orderPaymentMethod: e.target.value })
                }
              >
                <option value="Pay at Merchant">Pay at Merchant</option>
                <option value="QRIS">QRIS</option>
                <option value="Debit/Credit">Debit/Credit</option>
              </select>

              <div className="total-section">
                <p>Total: Rp {calculateTotal()}</p>
              </div>

              <button type="submit" className="submit-btn">
                Create Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkshopFormPage;