import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";

const Header = () => {
  const [headerData, setHeaderData] = useState([]);
  const [btcPercent, setBtcPercent] = useState(null);
  const [ethPercent, setEthPercent] = useState(null);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/global").then((res) => {
      setHeaderData(res.data.data);
      setBtcPercent(res.data.data.market_cap_percentage.btc.toFixed(2));
      setEthPercent(res.data.data.market_cap_percentage.eth.toFixed(2));
    });
  }, []);

  return (
    <>
      <ul className="title">
        <li>
          <h1>
            <img src="./logo.png" alt="" /> Crypto React
          </h1>
        </li>
        <li>
          Crypto-monnaies :{" "}
          {headerData.active_cryptocurrencies &&
            headerData.active_cryptocurrencies.toLocaleString()}
        </li>
        <li>Marchés : {headerData.markets}</li>
      </ul>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Market Cap :{" "}
          <strong>
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
