import React, { useEffect, useState } from "react";
import Navbar from "../../UniversalComponents/Navbar/Navbar";
import Footer from "../../UniversalComponents/Footer/Footer.jsx";
import "./ShopServices.css";
import ServiceBox from "./ServiceBox";
import RepairShopBanner from "../Payment/RepairShopBanner.jsx";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.js";
import { Button } from '../../UniversalComponents/Button/Button';
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

function ShopServices() {
  const { searchID } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const handleServiceClick = async (shopId, serviceId, currentChoice) => {
    try {
      const serviceDocRef = doc(
        db,
        "RepairShops",
        shopId,
        "Services",
        serviceId
      );
      await updateDoc(serviceDocRef, { choice: !currentChoice });
      console.log(
        `Service ${serviceId} in shop ${shopId} updated successfully.`
      );
      setSearchResult((prevResults) =>
        prevResults.map((shop) => {
          if (shop.id === shopId) {
            return {
              ...shop,
              services: shop.services.map((service) => {
                if (service.id === serviceId) {
                  return { ...service, choice: !currentChoice };
                }
                return service;
              }),
            };
          }
          return shop;
        })
      );
    } catch (e) {
      console.log("Error updating service choice:", e);
    }
  };

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
            collection(doc.ref, "Services")
          );
          let shopServices = [];

          for (const shopDoc of shopServicesRef.docs) {
            const service = shopDoc.data();
            shopServices.push({
              id: shopDoc.id,
              serviceTitle: service.title,
              servicePrice: service.price,
              priceText: service.subtitle,
              serviceImg:service.img,
              choice: false,
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
  const paymentPath = firstShop ? `/payment/${firstShop.title}` : "/payment";

  return (
    <div>
      <Navbar />
      {firstShop && (
        <RepairShopBanner title={firstShop.title} rating={firstShop.rating} />
      )}
      <h2 className="services-heading">SERVICES</h2>
      <div className="shop-services-container">
        {searchResult.map((shop, shopIndex) =>
          shop.services.map((service, serviceIndex) => (
            <ServiceBox
              key={`${shopIndex}-${serviceIndex}`}
              handleClick={() =>
                handleServiceClick(shop.id, service.id, service.choice)
              }
              serviceName={service.serviceTitle}
              imageUrl={service.serviceImg}
              priceStandard={service.servicePrice}
              isSelected={service.choice}
            />
          ))
        )}
      </div>
      
      <div className="finishOrder-container">
        <Link to={paymentPath} className="finishOrder-btn" >
          ORDER
        </Link>
      <Link target={"_blank"} to={"https://wa.me/6282168682109?text=Hi%20I'd%20like%20help%20about%20OTOCARE"} className="finishOrder-btn" >
          CONTACT
        </Link>
      </div>
      <div className='Contact-btns'>
                    
      </div>

      <Footer />
    </div>
  );
}

export default ShopServices;