import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Trending = () => {
  const [trendData, setTrendData] = useState();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        setTrendData(res.data.coins);
      });
  }, []);

  return (
    <div className="trending-container">
      <h3>Trending</h3>
      <div className="trend-list">
        <ul>
          {trendData &&
            trendData.slice(0, 4).map((coin) => (
              <li key={coin.item.id}>
                <p className="rank">{coin.item.score + 1 + "."}</p>
                <img src={coin.item.thumb} alt={coin.item.name + " logo"} />
                <p className="name">
                  {coin.item.name.replaceAll(" ", "-").length < 11
                    ? coin.item.name
                    : coin.item.name.split(" ")[0].length < 12
                    ? coin.item.name.split(" ")[0]
                    : coin.item.name.split("").slice(0, 12)}
                </p>
                <span>({coin.item.symbol})</span>
              </li>
            ))}
        </ul>
        <ul>
          {trendData &&
            trendData.slice(4, 8).map((coin) => (
              <li key={coin.item.id}>
                <p className="rank">{coin.item.score + 1 + "."}</p>
                <img src={coin.item.thumb} alt={coin.item.name + " logo"} />
                <p className="name">
                  {coin.item.name.replaceAll(" ", "-").length < 11
                    ? coin.item.name
                    : coin.item.name.split(" ")[0].length < 12
                    ? coin.item.name.split(" ")[0]
                    : coin.item.name.split("").slice(0, 12)}
                </p>
                <span>({coin.item.symbol})</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Trending;
