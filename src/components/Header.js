import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";

const Header = () => {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setHeaderData(res.data.data));
  }, []);

  return (
    <div className="header-container">
      <ul>
        <li>Crypto : {headerData.active_cryptocurrencies}</li>
        <li>Marchés : {headerData.markets}</li>
        <li>
          Market Cap évolution :{" "}
          <PercentChange
            price={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>
          BTC dominance :{" "}
          {headerData.length > 0 &&
            headerData.market_cap_percentage.btc.toFixed(2)}
          %
        </li>
        <li>
          ETH dominance :{" "}
          {headerData.length > 0 &&
            headerData.market_cap_percentage.eth.toFixed(2)}
          %
        </li>
      </ul>
    </div>
  );
};

export default Header;
