import React, { useState } from "react";
import TableFilters from "./TableFilters";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { isEmpty } from "./Utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTopThousand } from "../actions/tops.action";

const Table = () => {
  const [orderBy, setOrderBy] = useState("");
  const [rangeNumber, setRangeNumber] = useState(250);
  const [startNumber, setStartNumber] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const showStable = useSelector((state) => state.stableReducer);
  const showList = useSelector((state) => state.listReducer);
  const banList = useSelector((state) => state.banListReducer);
  const coinsData = useSelector((state) => state.coinsDataReducer);
  const topThousand = useSelector((state) => state.topThousandReducer);
  const dispatch = useDispatch();

  const tableHeader = [
    "TA",
    "Price",
    "MarketCap",
    "Volume",
    "Mkt-Vol",
    "1h",
    "1d",
    "1w",
    "1m",
    "6m",
    "1y",
    "ATH",
    "ATHd",
    "ATLd",
  ];

  const excludeCoin = (coin) => {
    let stables = [
      "usdt",
      "usdc",
      "busd",
      "dai",
      "ust",
      "mim",
      "tusd",
      "usdp",
      "usdn",
      "fei",
      "tribe",
      "gusd",
      "frax",
      "lusd",
      "husd",
      "ousd",
      "xsgd",
      "usdx",
      "eurs",
      "cusdc",
      "cdai",
      "usdd",
      "ibeur",
      "eurt",
      "flexusd",
      "alusd",
      "susd",
      "usdk",
      "cusd",
      "ageur",
      "musd",
      "yusd",
      "uxd",
      "usds",
      "rsv",
      "eeur",
      "ceur",
      "ustc",
      "gyen",
      "mimatic",
      "tor",
    ];
    if (stables.includes(coin)) {
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
            <span
              onClick={() => {
                if (topThousand === false) {
                  setRangeNumber(1000);
                  setStartNumber(0);
                } else {
                  setRangeNumber(500);
                  setStartNumber(0);
                }
                dispatch(setTopThousand(!topThousand));
              }}
            >
              Top
            </span>{" "}
            {topThousand ? (
              <input
                type="number"
                value={rangeNumber}
                onChange={(e) => setRangeNumber(e.target.value)}
                max="1000"
                maxLength={4}
              />
            ) : (
              <input
                type="number"
                value={rangeNumber}
                onChange={(e) => setRangeNumber(e.target.value)}
                max="500"
                maxLength={3}
              />
            )}
          </span>
          <div className="inputs-container">
            <div className="number-indic">
              <p className="start">{startNumber}</p>
              <p className="end">{rangeNumber}</p>
            </div>
            <input
              type="range"
              min="0"
              max={topThousand ? 1000 : 500}
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
              max={topThousand ? 1000 : 500}
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
          <div className="input-search">
            <input
              type="text"
              placeholder="Search..."
              spellCheck={false}
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
            />
            {inputSearch && (
              <img
                src="./assets/delete-search.svg"
                alt="delete search"
                onClick={() => setInputSearch("")}
              />
            )}
          </div>
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
            if (showList === "all") {
              return coin;
            }
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
              case "TA":
                return b.signal[1] - a.signal[1];
              case "Price":
                return b.current_price - a.current_price;
              case "Volume":
                return b.total_volume - a.total_volume;
              case "MarketCap":
                return b.market_cap - a.market_cap;
              case "1h":
                return (
                  b.price_change_percentage_h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1d":
                return (
                  b.market_cap_change_percentage_24h -
                  a.market_cap_change_percentage_24h
                );
              case "1w":
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
              case "ATHd":
                return (
                  new Date() -
                  new Date(b.ath_date) -
                  (new Date() - new Date(a.ath_date))
                );
              case "ATLd":
                return (
                  new Date() -
                  new Date(b.atl_date) -
                  (new Date() - new Date(a.atl_date))
                );
              case "#reverse":
                return a.market_cap - b.market_cap;
              case "ATreverse":
                return b.signal[0] - a.signal[0];
              case "Pricereverse":
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
              case "1dreverse":
                return (
                  a.market_cap_change_percentage_24h -
                  b.market_cap_change_percentage_24h
                );
              case "1wreverse":
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
              case "ATHdreverse":
                return (
                  new Date() -
                  new Date(a.ath_date) -
                  (new Date() - new Date(b.ath_date))
                );
              case "ATLdreverse":
                return (
                  new Date() -
                  new Date(a.atl_date) -
                  (new Date() - new Date(b.atl_date))
                );
              case "Mkt-Vol":
                return (
                  a.total_volume / a.market_cap - b.total_volume / b.market_cap
                );
              case "Mkt-Volreverse":
                return (
                  b.total_volume / b.market_cap - a.total_volume / a.market_cap
                );

              default:
                null;
            }
          })
          .map((coin, index, row) => {
            return (
              <TableLine
                coin={coin}
                key={coin.id}
                index={index}
                sumNumber={row.length}
              />
            );
          })}
    </div>
  );
};

export default Table;
