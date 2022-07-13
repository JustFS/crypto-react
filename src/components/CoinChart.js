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
import colors from "../styles/_settings.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTimeFrame } from "../actions/timeFrame.action";

const CoinChart = ({ coinId, coinName }) => {
  const [coinData, setCoinData] = useState();
  const timeFrame = useSelector((state) => state.timeFrameReducer);
  const dispatch = useDispatch();
  const radioData = [
    [1, "1 day"],
    [3, "3 days"],
    [7, "7 days"],
    [30, "1 mo"],
    [91, "3 mo"],
    [181, "6 mo"],
    [365, "1 year"],
    [3200, "Max"],
  ];

  useEffect(() => {
    let dataArray = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeFrame}${
          timeFrame > 32 ? "&interval=daily" : ""
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, timeFrame]);

  return (
    <div className="coin-chart">
      <p>{coinName} chart</p>
      <div className="btn-container">
        {radioData.map((radio) => {
          return (
            <div
              htmlFor={"btn" + radio[0]}
              onClick={() => dispatch(setTimeFrame(radio[0]))}
              key={radio[0]}
              className={radio[0] === timeFrame ? "active-btn" : ""}
            >
              {radio[1]}
            </div>
          );
        })}
      </div>
      <AreaChart
        width={680}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke={colors.color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
