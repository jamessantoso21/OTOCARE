import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card(props) {


  const cardPath = `/shopServices/${props.title}`;

  return (
    <Link className="card" to={cardPath}>
      <div className="card-top">
        <img src={props.img} className="card-img" />
      </div>
      <div className="card-bottom">
        <h1 className="card-title">{props.title}</h1>
        <h2 className="card-subtitle"> {props.subtitle}</h2>
        <p className="card-services1">{props.services1}</p>
        <p className="card-services2">{props.services2}</p>
        <p className="card-services3">{props.services3}</p>
      </div>
      <div className="card-rating">
        <img src={props.star} className="rating-img" />
        <p className="rating-number">{props.rating}</p>
      </div>
    </Link>
  );
}

export default Card;
