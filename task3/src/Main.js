import React from "react";
import "./Card.css";
import { card_data } from "./components/CardData";

import Card from "./Card";

const Cards = () => {
  return (
    <div className="main_card">
      {card_data.map((card, id) => {
        return (
            <div>
            <Card
              title={card.title}
              barValue={card.barValue}
              value={card.value}
              data={card.data}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;