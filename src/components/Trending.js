import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Trending = () => {
  const [trendData, setTrendData] = useState([]);

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
        {trendData &&
          trendData.map((coin) => (
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
                <p>{coin.item.symbol}</p>
              </li>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Trending;
