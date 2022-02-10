import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const CoinChart = ({ coinId }) => {
  const [coinData, setCoinData] = useState();
  const [time, setTime] = useState(30);
  let min = 1000000;
  let max = 0;

  useEffect(() => {
    let dataArray = [];
    let interval = time > 32 ? "&interval=daily" : "";
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${time}${interval}`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < 1 ? price : price.toFixed(2),
          });

          if (price < min) min = price;
          if (price > max) max = price;
        }
      })
      .then(() => setCoinData(dataArray));
  }, [coinId, time]);

  return (
    <div className="coin-chart">
      <p>{coinId}</p>
      <div className="btn-container">
        <button onClick={() => setTime(1)}>1 jour</button>
        <button onClick={() => setTime(3)}>3 jours</button>
        <button onClick={() => setTime(7)}>1 semaine</button>
        <button onClick={() => setTime(30)}>1 mois</button>
        <button onClick={() => setTime(91)}>3 mois</button>
        <button onClick={() => setTime(181)}>6 mois</button>
        <button onClick={() => setTime(365)}>1 an</button>
      </div>
      <AreaChart
        width={730}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            (min) => (min * 0.99).toFixed(2),
            (max) => (max * 1.01).toFixed(2),
          ]}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
