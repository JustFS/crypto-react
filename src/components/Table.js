import React, { useState, useEffect } from "react";
import axios from "axios";
import TableLine from "./TableLine";

const Table = () => {
  const [list, setList] = useState([]);
  const [orderBy, setOrderBy] = useState("#");
  const tableHeader = [
    "#",
    " ",
    "",
    "Prix",
    "Volume",
    "MarketCap",
    "1h",
    "1j",
    "1s",
    "2s",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
      )
      .then((res) => setList(res.data));
  }, []);

  return (
    <div className="table-container">
      <ul className="table-header">
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              checked={el === orderBy ? true : false}
              onChange={() => setOrderBy(el)}
              type="radio"
              name="header-el"
              id={el}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {list
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
            case "2s":
              return (
                b.price_change_percentage_14d_in_currency -
                a.price_change_percentage_14d_in_currency
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
