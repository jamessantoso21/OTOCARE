import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "./Card";

function CardContainer({ docId }) {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const docRef = doc(db, "RepairShops", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCardData(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error fetching document: " + error.message);
      }
      setLoading(false);
    };

    fetchCardData();
  }, [docId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card
      img={cardData.img}
      title={cardData.title}
      subtitle={cardData.subtitle}
      services1={cardData.services1}
      services2={cardData.services2}
      services3={cardData.services3}
      star={cardData.star}
      rating={cardData.rating}
    />
  );
}

export default CardContainer;
