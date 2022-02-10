import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import GlobalChart from "./components/GlobalChart";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [rangeNumber, setRangeNumber] = useState(100);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rangeNumber}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => setData(res.data));
  }, [rangeNumber]);

  return (
    <div>
      <h1>Crypto React</h1>
      <GlobalChart data={data} />
      <Header />
      <input
        type="range"
        min="50"
        max="250"
        defaultValue={rangeNumber}
        onChange={(e) => setRangeNumber(e.target.value)}
      />
      <span>{rangeNumber}</span>
      <Table data={data} />
    </div>
  );
};

export default App;
