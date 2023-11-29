import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "./CardComponent";

function InfoCardsComponent(props) {

  const cards = props.cards.map((card, index) => (
    <CardComponent
      key={index}
      card={card}
    />
  ));


  return (
      <div data-testid="cy-left-infoCards" className="container">
            {cards}
        
      </div>
  );
}

export default InfoCardsComponent;
