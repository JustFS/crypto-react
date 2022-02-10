import React, { useEffect, useState } from "react";
import { Treemap, Tooltip } from "recharts";

const GlobalChart = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const [inputValue, setInputValue] = useState(25);

  useEffect(() => {
    let chartData = [];

    if (data.length > 0) {
      for (let i = 0; i < inputValue; i++) {
        chartData.push({
          name:
            data[i].symbol.toUpperCase() +
            " " +
            data[i].price_change_percentage_24h.toFixed(2) +
            "%",
          size: data[i].market_cap,
          fill: data[i].price_change_percentage_24h >= 0 ? "green" : "red",
        });
      }
    }
    setDataArray(chartData);
  }, [inputValue, data]);

  const TreemapTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="global-chart">
      <input
        type="range"
        min="10"
        max="50"
        defaultValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span>{inputValue}</span>
      <Treemap
        width={800}
        height={200}
        data={dataArray}
        dataKey="size"
        stroke="rgb(41, 41, 41)"
        fill="black"
        aspectRatio="1.5"
      >
        <Tooltip content={<TreemapTooltip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;
