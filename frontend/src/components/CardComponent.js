import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CardComponent(props) {
  return (
    <div className="card card-c">
      <div className="card-header">
        <h6>{props.card.title}</h6>
      </div>
      <div className="card-body">
        <div className="card-text d-flex align-items-center justify-content-center">{props.card.info}</div>
      </div>
    </div>
  );
}

export default CardComponent;
