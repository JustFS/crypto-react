import React, { useState, useEffect } from "react";
import TableLine from "./TableLine";

const Table = ({ data }) => {
  const [orderBy, setOrderBy] = useState("#");
  const tableHeader = [
    "#",
    "",
    "Prix",
    "Volume",
    "MarketCap",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  return (
    <div className="table-container">
      <ul className="table-header">
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
              type="radio"
              name="header-el"
              id={el}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {data
        .sort((a, b) => {
          switch (orderBy) {
            case "#":
              return b.market_cap - a.market_cap;
            case "Prix":
              return b.current_price - a.current_price;
            case "Volume":
              return b.total_volume - a.total_volume;
            case "MarketCap":
              return b.market_cap - a.market_cap;
            case "1h":
              return (
                b.price_change_percentage_1h_in_currency -
                a.price_change_percentage_1h_in_currency
              );
            case "1j":
              return (
                b.market_cap_change_percentage_24h -
                a.market_cap_change_percentage_24h
              );
            case "1s":
              return (
                b.price_change_percentage_7d_in_currency -
                a.price_change_percentage_7d_in_currency
              );
            case "1m":
              return (
                b.price_change_percentage_30d_in_currency -
                a.price_change_percentage_30d_in_currency
              );
            case "6m":
              return (
                b.price_change_percentage_200d_in_currency -
                a.price_change_percentage_200d_in_currency
              );
            case "1y":
              return (
                b.price_change_percentage_1y_in_currency -
                a.price_change_percentage_1y_in_currency
              );
            case "ATH":
              return b.ath_change_percentage - a.ath_change_percentage;
            case "#reverse":
              return a.market_cap - b.market_cap;
            case "Prixreverse":
              return a.current_price - b.current_price;
            case "Volumereverse":
              return a.total_volume - b.total_volume;
            case "MarketCapreverse":
              return a.market_cap - b.market_cap;
            case "1hreverse":
              return (
                a.price_change_percentage_1h_in_currency -
                b.price_change_percentage_1h_in_currency
              );
            case "1jreverse":
              return (
                a.market_cap_change_percentage_24h -
                b.market_cap_change_percentage_24h
              );
            case "1sreverse":
              return (
                a.price_change_percentage_7d_in_currency -
                b.price_change_percentage_7d_in_currency
              );
            case "1mreverse":
              return (
                a.price_change_percentage_30d_in_currency -
                b.price_change_percentage_30d_in_currency
              );
            case "6mreverse":
              return (
                a.price_change_percentage_200d_in_currency -
                b.price_change_percentage_200d_in_currency
              );
            case "1yreverse":
              return (
                a.price_change_percentage_1y_in_currency -
                b.price_change_percentage_1y_in_currency
              );
            case "ATHreverse":
              return a.ath_change_percentage - b.ath_change_percentage;
            default:
              null;
          }
        })
        .map((coin) => (
          <TableLine coin={coin} key={coin.id} />
        ))}
    </div>
  );
};

export default Table;
