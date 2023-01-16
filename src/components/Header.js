import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";
import colors from "../styles/_settings.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [headerData, setHeaderData] = useState([]);
  const [btcPercent, setBtcPercent] = useState(null);
  const [ethPercent, setEthPercent] = useState(null);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/global").then((res) => {
      setHeaderData(res.data.data);
      setBtcPercent(res.data.data.market_cap_percentage.btc.toFixed(1));
      setEthPercent(res.data.data.market_cap_percentage.eth.toFixed(1));
    });
  }, []);

  return (
    <>
      <div className="title">
        <div>
          <h1>
            <img src="./assets/logo.png" alt="" />
            <NavLink to="/"> Watch Tower</NavLink>
          </h1>
        </div>
        <div className="infos">
          <ul>
            <li>
              Coins :{" "}
              {headerData.active_cryptocurrencies &&
                headerData.active_cryptocurrencies.toLocaleString()}
            </li>
            <li>Markets : {headerData.markets}</li>
          </ul>
          <div className="img-help">
            <NavLink to="/backtest">
              <img src="./assets/backtest.svg" alt="question icon" />
            </NavLink>
            <NavLink to="/help">
              <img src="./assets/question.svg" alt="question icon" />
            </NavLink>
          </div>
        </div>
      </div>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Market Cap :{" "}
          <strong
            style={{
              color:
                headerData.market_cap_change_percentage_24h_usd >= 0
                  ? colors.green1
                  : colors.red1,
            }}
          >
            <PercentChange
              percent={headerData.market_cap_change_percentage_24h_usd}
            />
          </strong>
        </li>
        <li>BTC dominance : {btcPercent}%</li>
        <li>ETH dominance : {ethPercent}%</li>
      </ul>
    </>
  );
};

export default Header;
