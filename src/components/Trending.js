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
        console.log(res.data);
        setTrendData(res.data.coins);
      });
  }, []);

  return (
    <div className="trending-container">
      <h3>Trending</h3>
      <div className="trend-list">
        {trendData &&
          trendData.slice(0, 4).map((coin) => (
            <a
              target="_blank"
              href={
                "https://www.coingecko.com/en/coins/" +
                coin.item.id.toLowerCase()
              }
            >
              <li key={coin.item.id}>
                <p className="rank">{coin.item.score + 1 + "."}</p>
                <img src={coin.item.thumb} alt={coin.item.name + " logo"} />
                <p className="name">
                  {coin.item.score !== 0
                    ? coin.item.name.replaceAll(" ", "-").length < 10
                      ? coin.item.name
                      : coin.item.name.split(" ")[0].length < 10
                      ? coin.item.name.split(" ")[0]
                      : coin.item.name.split("").slice(0, 10)
                    : coin.item.name}
                </p>
                <span>({coin.item.symbol})</span>
              </li>
            </a>
          ))}
        {trendData &&
          trendData.slice(4, 7).map((coin) => (
            <a
              target="_blank"
              href={
                "https://www.coingecko.com/en/coins/" +
                coin.item.id.toLowerCase()
              }
            >
              <li key={coin.item.id}>
                <p className="rank">{coin.item.score + 1 + "."}</p>
                <img src={coin.item.thumb} alt={coin.item.name + " logo"} />
                <p className="name">
                  {coin.item.name.replaceAll(" ", "-").length < 10
                    ? coin.item.name
                    : coin.item.name.split(" ")[0].length < 10
                    ? coin.item.name.split(" ")[0]
                    : coin.item.name.split("").slice(0, 10)}
                </p>
                <span>({coin.item.symbol})</span>
              </li>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Trending;
