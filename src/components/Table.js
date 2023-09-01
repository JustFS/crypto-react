import React, { useState } from "react";
import TableFilters from "./TableFilters";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { isEmpty } from "./Utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isStableCoin } from "./Utils";
import { useEffect } from "react";
import colors from "../styles/_settings.scss";

const Table = () => {
  const [orderBy, setOrderBy] = useState("MarketCap");
  const [rangeNumber, setRangeNumber] = useState(500);
  const [startNumber, setStartNumber] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const [miniVol, setMiniVol] = useState(0);
  const [mktVol, setMktVol] = useState(0);
  const [maxATHd, setMaxATHd] = useState(0);
  const showStable = useSelector((state) => state.stableReducer);
  const showList = useSelector((state) => state.listReducer);
  const banList = useSelector((state) => state.banListReducer);
  const coinsData = useSelector((state) => state.coinsDataReducer);
  const dispatch = useDispatch();
  const [oneYear, setOneYear] = useState();
  const [sixMonths, setSixMonths] = useState();
  const [oneMonth, setOneMonth] = useState();
  const [oneWeek, setOneWeek] = useState();
  const [oneDay, setOneDay] = useState();
  const [oneHour, setOneHour] = useState();
  const [sumCoin, setSumCoin] = useState();

  useEffect(() => {
    if (coinsData.length > 0) {
      let filtData = coinsData
        .slice(startNumber, rangeNumber)
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
            if (isStableCoin(coin.symbol)) {
              return coin;
            }
          }
        })
        .filter((coin) => {
          if (miniVol > 0) {
            return coin.total_volume > Number(miniVol + "000000");
          } else {
            return coin;
          }
        })
        .filter((coin) => {
          if (mktVol > 0) {
            return coin.market_cap / coin.total_volume < mktVol;
          } else {
            return coin;
          }
        })
        .filter((coin) => {
          if (maxATHd > 0) {
            let days = Math.round(
              (new Date() - new Date(coin.ath_date)) / (1000 * 3600 * 24)
            );
            return days < maxATHd;
          } else {
            return coin;
          }
        });
      if (filtData.length > 0) {
        calcGlobalPerf(filtData);
      }
    }
  }, [
    rangeNumber,
    startNumber,
    miniVol,
    mktVol,
    maxATHd,
    showStable,
    showList,
    banList,
    coinsData,
  ]);

  const calcGlobalPerf = (filData) => {
    let oneYearVar = 0;
    let sixMonthsVar = 0;
    let oneMonthVar = 0;
    let oneWeekVar = 0;
    let oneDayVar = 0;
    let oneHourVar = 0;
    let eleminate1y = 0;
    let eleminate6m = 0;
    let eleminate1m = 0;
    let eleminate1w = 0;
    let eleminate1d = 0;
    let eleminate1h = 0;

    for (let i = 0; i < filData.length; i++) {
      if (filData[i].price_change_percentage_1y_in_currency !== null) {
        oneYearVar += filData[i].price_change_percentage_1y_in_currency;
      } else {
        eleminate1y++;
      }
      if (filData[i].price_change_percentage_200d_in_currency !== null) {
        sixMonthsVar += filData[i].price_change_percentage_200d_in_currency;
      } else {
        eleminate6m++;
      }
      if (filData[i].price_change_percentage_30d_in_currency !== null) {
        oneMonthVar += filData[i].price_change_percentage_30d_in_currency;
      } else {
        eleminate1m++;
      }
      if (filData[i].price_change_percentage_7d_in_currency !== null) {
        oneWeekVar += filData[i].price_change_percentage_7d_in_currency;
      } else {
        eleminate1w++;
      }
      if (filData[i].price_change_percentage_24h_in_currency !== null) {
        oneDayVar += filData[i].price_change_percentage_24h_in_currency;
      } else {
        eleminate1d++;
      }
      if (filData[i].price_change_percentage_1h_in_currency !== null) {
        oneHourVar += filData[i].price_change_percentage_1h_in_currency;
      } else {
        eleminate1h++;
      }
    }
    setOneYear(oneYearVar / (filData.length - eleminate1y));
    setSixMonths(sixMonthsVar / (filData.length - eleminate6m));
    setOneMonth(oneMonthVar / (filData.length - eleminate1m));
    setOneWeek(oneWeekVar / (filData.length - eleminate1w));
    setOneDay(oneDayVar / (filData.length - eleminate1d));
    setOneHour(oneHourVar / (filData.length - eleminate1h));
    setSumCoin(filData.length);
  };

  return (
    <div className="table-container">
      <TableFilters />
      <ul className="table-header">
        <div className="range-container">
          <span>
            <span>Top</span>{" "}
            <input
              type="number"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
              max="500"
              maxLength={3}
            />
          </span>
          <div className="inputs-container">
            <div className="number-indic">
              <p className="start">{startNumber}</p>
              <p className="end">{rangeNumber}</p>
            </div>
            <input
              type="range"
              min="0"
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
              max="500"
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
        <li>
          <input
            defaultChecked={"TA" === orderBy || "TA" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "TA") {
                setOrderBy("TA" + "reverse");
              } else {
                setOrderBy("TA");
              }
            }}
            type="radio"
            name="header-el"
            id="TA"
          />
          <label htmlFor="TA">TA</label>
        </li>
        <li>
          <input
            defaultChecked={
              "Price" === orderBy || "Price" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "Price") {
                setOrderBy("Price" + "reverse");
              } else {
                setOrderBy("Price");
              }
            }}
            type="radio"
            name="header-el"
            id="Price"
          />
          <label htmlFor="Price">Price</label>
        </li>
        <li>
          <input
            defaultChecked={
              "MarketCap" === orderBy || "MarketCap" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "MarketCap") {
                setOrderBy("MarketCap" + "reverse");
              } else {
                setOrderBy("MarketCap");
              }
            }}
            type="radio"
            name="header-el"
            id="MarketCap"
          />
          <label htmlFor="MarketCap">MarketCap</label>
        </li>
        <li className="box-filter">
          <input
            defaultChecked={
              "Volume" === orderBy || "Volume" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "Volume") {
                setOrderBy("Volume" + "reverse");
              } else {
                setOrderBy("Volume");
              }
            }}
            type="radio"
            name="header-el"
            id="Volume"
          />
          <label htmlFor="Volume">Volume {miniVol > 0 ? "*" : ""}</label>
          <div className="volume-filter">
            <h5>Vol mini</h5>
            <div className="bottom-part">
              <input
                type="number"
                onChange={(e) => setMiniVol(e.target.value)}
                value={miniVol}
              />
              <span>M</span>
              <img
                src="./assets/delete-icon-bis.svg"
                alt="delete"
                onClick={() => setMiniVol(0)}
              />
            </div>
          </div>
        </li>
        <li className="box-filter">
          <input
            defaultChecked={
              "Mkt-Vol" === orderBy || "Mkt-Vol" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "Mkt-Vol") {
                setOrderBy("Mkt-Vol" + "reverse");
              } else {
                setOrderBy("Mkt-Vol");
              }
            }}
            type="radio"
            name="header-el"
            id="Mkt-Vol"
          />
          <label htmlFor="Mkt-Vol">Mkt/Vol {mktVol > 0 ? "*" : ""}</label>
          <div className="volume-filter">
            <h5>Mkt / Vol max</h5>
            <div className="bottom-part">
              <input
                type="number"
                onChange={(e) => setMktVol(e.target.value)}
                value={mktVol}
              />
              <span>D</span>
              <img
                src="./assets/delete-icon-bis.svg"
                alt="delete"
                onClick={() => setMktVol(0)}
              />
            </div>
          </div>
        </li>
        <li>
          <input
            defaultChecked={
              "Diluted" === orderBy || "Diluted" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "Diluted") {
                setOrderBy("Diluted" + "reverse");
              } else {
                setOrderBy("Diluted");
              }
            }}
            type="radio"
            name="header-el"
            id="Diluted"
          />
          <label htmlFor="Diluted">Diluted</label>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"1h" === orderBy || "1h" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "1h") {
                setOrderBy("1h" + "reverse");
              } else {
                setOrderBy("1h");
              }
            }}
            type="radio"
            name="header-el"
            id="1h"
          />
          <label htmlFor="1h">1h</label>
          <span style={{ color: oneHour >= 0 ? colors.green1 : colors.red1 }}>
            {oneHour && oneHour.toFixed(1)}%
          </span>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"1d" === orderBy || "1d" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "1d") {
                setOrderBy("1d" + "reverse");
              } else {
                setOrderBy("1d");
              }
            }}
            type="radio"
            name="header-el"
            id="1d"
          />
          <label htmlFor="1d">1d</label>
          <span style={{ color: oneDay >= 0 ? colors.green1 : colors.red1 }}>
            {oneDay && oneDay.toFixed(1)}%
          </span>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"1w" === orderBy || "1w" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "1w") {
                setOrderBy("1w" + "reverse");
              } else {
                setOrderBy("1w");
              }
            }}
            type="radio"
            name="header-el"
            id="1w"
          />
          <label htmlFor="1w">1w</label>
          <span style={{ color: oneWeek >= 0 ? colors.green1 : colors.red1 }}>
            {oneWeek && oneWeek.toFixed(0)}%
          </span>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"1m" === orderBy || "1m" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "1m") {
                setOrderBy("1m" + "reverse");
              } else {
                setOrderBy("1m");
              }
            }}
            type="radio"
            name="header-el"
            id="1m"
          />
          <label htmlFor="1m">1m</label>
          <span style={{ color: oneMonth >= 0 ? colors.green1 : colors.red1 }}>
            {oneMonth && oneMonth.toFixed(0)}%
          </span>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"6m" === orderBy || "6m" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "6m") {
                setOrderBy("6m" + "reverse");
              } else {
                setOrderBy("6m");
              }
            }}
            type="radio"
            name="header-el"
            id="6m"
          />
          <label htmlFor="6m">6m</label>
          <span style={{ color: sixMonths >= 0 ? colors.green1 : colors.red1 }}>
            {sixMonths && sixMonths.toFixed(0)}%
          </span>
        </li>
        <li className="timeframe">
          <input
            defaultChecked={"1y" === orderBy || "1y" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "1y") {
                setOrderBy("1y" + "reverse");
              } else {
                setOrderBy("1y");
              }
            }}
            type="radio"
            name="header-el"
            id="1y"
          />
          <label htmlFor="1y">1y</label>
          <span style={{ color: oneYear >= 0 ? colors.green1 : colors.red1 }}>
            {oneYear && oneYear.toFixed(0)}%
          </span>
        </li>
        <li>
          <input
            defaultChecked={"ATH" === orderBy || "ATH" === orderBy + "reverse"}
            onClick={() => {
              if (orderBy === "ATH") {
                setOrderBy("ATH" + "reverse");
              } else {
                setOrderBy("ATH");
              }
            }}
            type="radio"
            name="header-el"
            id="ATH"
          />
          <label htmlFor="ATH">ATH</label>
        </li>
        <li className="box-filter">
          <input
            defaultChecked={
              "ATHd" === orderBy || "ATHd" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "ATHd") {
                setOrderBy("ATHd" + "reverse");
              } else {
                setOrderBy("ATHd");
              }
            }}
            type="radio"
            name="header-el"
            id="ATHd"
          />
          <label htmlFor="ATHd">ATHd {maxATHd > 0 ? "*" : ""}</label>
          <div className="volume-filter">
            <h5>Max ATH date</h5>
            <div className="bottom-part">
              <input
                type="number"
                onChange={(e) => setMaxATHd(e.target.value)}
                value={maxATHd}
              />
              <span>D</span>
              <img
                src="./assets/delete-icon-bis.svg"
                alt="delete"
                onClick={() => setMaxATHd(0)}
              />
            </div>
          </div>
        </li>
        <li>
          <input
            defaultChecked={
              "ATLd" === orderBy || "ATLd" === orderBy + "reverse"
            }
            onClick={() => {
              if (orderBy === "ATLd") {
                setOrderBy("ATLd" + "reverse");
              } else {
                setOrderBy("ATLd");
              }
            }}
            type="radio"
            name="header-el"
            id="ATLd"
          />
          <label htmlFor="ATLd">ATLd</label>
        </li>
        <li>
          <p className="sum-number">{sumCoin}</p>
        </li>
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
              if (isStableCoin(coin.symbol)) {
                return coin;
              }
            }
          })
          .filter((coin) => {
            if (miniVol > 0) {
              return coin.total_volume > Number(miniVol + "000000");
            } else {
              return coin;
            }
          })
          .filter((coin) => {
            if (mktVol > 0) {
              return coin.market_cap / coin.total_volume < mktVol;
            } else {
              return coin;
            }
          })
          .filter((coin) => {
            if (maxATHd > 0) {
              let days = Math.round(
                (new Date() - new Date(coin.ath_date)) / (1000 * 3600 * 24)
              );
              return days < maxATHd;
            } else {
              return coin;
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
              case "Diluted":
                return (
                  b.market_cap / b.fully_diluted_valuation -
                  a.market_cap / a.fully_diluted_valuation
                );
              case "1h":
                return (
                  b.price_change_percentage_1h_in_currency -
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
              case "Dilutedreverse":
                return (
                  a.market_cap / a.fully_diluted_valuation -
                  b.market_cap / b.fully_diluted_valuation
                );
              default:
                null;
            }
          })
          .map((coin, index) => {
            return <TableLine coin={coin} key={coin.id} index={index} />;
          })}
    </div>
  );
};

export default Table;
