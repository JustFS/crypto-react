import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";
import colors from "../styles/_settings.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [headerData, setHeaderData] = useState([]);
  const [btcPercent, setBtcPercent] = useState(null);
  const [ethPercent, setEthPercent] = useState(null);
  const [fearGreed, setFearGreed] = useState();

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/global").then((res) => {
      setHeaderData(res.data.data);
      setBtcPercent(res.data.data.market_cap_percentage.btc.toFixed(1));
      setEthPercent(res.data.data.market_cap_percentage.eth.toFixed(1));
    });

    axios
      .get("https://api.alternative.me/fng/?limit=1")
      .then((res) => setFearGreed(res.data.data[0].value));
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
            <li class="fearGreed">
              Fear & Greed :{" "}
              <strong
                style={{
                  color:
                    fearGreed > 49 ? "rgb(2, 172, 81)" : "rgb(255, 111, 86)",
                }}
              >
                {fearGreed}
              </strong>
            </li>
            <li>BTC dominance : {btcPercent}%</li>
            <li>ETH dominance : {ethPercent}%</li>
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
    </>
  );
};

export default Header;
