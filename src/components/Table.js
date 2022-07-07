import React, { useState } from "react";
import TableFilters from "./TableFilters";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { isEmpty } from "./Utils";
import { useSelector } from "react-redux";

const Table = () => {
  const [orderBy, setOrderBy] = useState("");
  const [rangeNumber, setRangeNumber] = useState(250);
  const [startNumber, setStartNumber] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const showStable = useSelector((state) => state.stableReducer);
  const showList = useSelector((state) => state.listReducer);
  const banList = useSelector((state) => state.banListReducer);
  const coinsData = useSelector((state) => state.coinsDataReducer);

  const tableHeader = [
    "AT",
    "Prix",
    "MarketCap",
    "Volume",
    "Vol-Mkt",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  const excludeCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "mim" ||
      coin === "tusd" ||
      coin === "usdp" ||
      coin === "usdn" ||
      coin === "fei" ||
      coin === "tribe" ||
      coin === "gusd" ||
      coin === "frax" ||
      coin === "lusd" ||
      coin === "husd" ||
      coin === "ousd" ||
      coin === "xsgd" ||
      coin === "usdx" ||
      coin === "eurs" ||
      coin === "cusdc" ||
      coin === "cdai" ||
      coin === "usdd" ||
      coin === "ibeur" ||
      coin === "eurt" ||
      coin === "flexusd" ||
      coin === "alusd" ||
      coin === "susd"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="table-container">
      <TableFilters />
      <ul className="table-header">
        <div className="range-container">
          <span>
            <span>Top </span>
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <div className="inputs-container">
            <input
              type="range"
              min="0"
              max="250"
              value={startNumber}
              onChange={(e) => {
                if (startNumber > rangeNumber) {
                  setStartNumber(e.target.value).then(() =>
                    setRangeNumber(() => Number(startNumber) + 1)
                  );
                }
                setStartNumber(e.target.value);
              }}
            />
            <input
              type="range"
              min="1"
              max="250"
              value={rangeNumber}
              onChange={(e) => {
                if (rangeNumber < startNumber) {
                  setRangeNumber(e.target.value);
                  setStartNumber(rangeNumber - 1);
                }
                setRangeNumber(e.target.value);
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            spellCheck={false}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <ToTop />
        </div>
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
      {!isEmpty(coinsData) &&
        coinsData
          .slice(startNumber, rangeNumber)
          .filter((coin) => {
            return (
              coin.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(inputSearch.toLowerCase())
            );
          })
          .filter((coin) => {
            if (showList === "fav") {
              if (window.localStorage.coinList) {
                let list = window.localStorage.coinList.split(",");
                if (list.includes(coin.id)) {
                  return coin;
                }
              }
            } else if (showList === "none") {
              if (window.localStorage.banList) {
                let list = banList.split(",");
                if (!list.includes(coin.id)) {
                  return coin;
                }
              } else {
                return coin;
              }
            } else if (showList === "shit") {
              if (window.localStorage.banList) {
                let list = banList.split(",");
                if (list.includes(coin.id)) {
                  return coin;
                }
              } else {
                return null;
              }
            }
          })
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (excludeCoin(coin.symbol)) {
                return coin;
              }
            }
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "AT":
                return b.signal[1] - a.signal[1];
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
              case "1a":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "ATH":
                return b.ath_change_percentage - a.ath_change_percentage;
              case "#reverse":
                return a.market_cap - b.market_cap;
              case "ATreverse":
                return b.signal[0] - a.signal[0];
                return;
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
              case "1areverse":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case "ATHreverse":
                return a.ath_change_percentage - b.ath_change_percentage;
              case "Vol-Mkt":
                return (
                  a.total_volume / a.market_cap - b.total_volume / b.market_cap
                );
              case "Vol-Mktreverse":
                return (
                  b.total_volume / b.market_cap - a.total_volume / a.market_cap
                );
              default:
                null;
            }
          })
          .map((coin, index) => <TableLine coin={coin} key={coin.id} />)}
    </div>
  );
};

export default Table;
