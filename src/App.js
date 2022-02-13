import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import GlobalChart from "./components/GlobalChart";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="app-container">
      <header>
        <Header />
        <GlobalChart data={data} />
      </header>
      <Table data={data} />
      <div id="top">
        <img
          src="./arrow-icon.svg"
          alt="arrow"
          onClick={() => window.scrollTo(0, 0)}
        />
      </div>
    </div>
  );
};

export default App;
