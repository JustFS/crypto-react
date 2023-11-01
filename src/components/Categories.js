import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";

const Categories = () => {
  const [cateData, setCateData] = useState([]);
  const filteredCat = [
    "ohm-fork",
    "ftx-holdings",
    "stablecoins",
    "alleged-sec-securities",
    "exchange-based-tokens",
    "governance",
    "yield-farming",
    "wrapped-tokens",
    "automated-market-maker-amm",
    "lending-borrowing",
    "liquid-staking-governance-tokens",
    "asset-backed-tokens",
    "seigniorage",
    "bridge-governance-tokens",
    "decentralized-perpetuals",
    "masternodes",
    "tokenized-gold",
    "olympus-pro",
    "yield-aggregator",
    "mev-protection",
    "yearn-yfi-partnerships-mergers",
    "decentralized-options",
    "rebase-tokens",
    "metagovernance",
    "guild-scholarship",
    "discord-bots",
    "defi-index",
    "idr-stablecoin",
    "jpy-stablecoin",
    "reddit-points",
    "farming-as-a-service-faas",
    "aptos-ecosystem",
    "canto-ecosystem",
    "yearn-vault-tokens",
    "aave-tokens",
    "daomaker-ecosystem",
    "xdai-ecosystem",
  ];

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/categories")
      .then((res) => setCateData(res.data));
  }, []);

  return (
    <div className="categories">
      <h3>
        <a target="_blank" href="https://www.coingecko.com/fr/categories">
          Trending by categories
        </a>
      </h3>
      <ul>
        {cateData
          .sort((a, b) => b.market_cap_change_24h - a.market_cap_change_24h)
          .filter((cate) => {
            if (!filteredCat.includes(cate.id)) {
              return cate;
            }
          })
          .slice(0, 8)
          .map((cate) => (
            <a
              key={cate.id}
              href={"https://www.coingecko.com/fr/categories/" + cate.id}
              target="_blank"
            >
              <div className="img">
                <img src={cate.top_3_coins[0]} />
                <img src={cate.top_3_coins[1]} />
                <img src={cate.top_3_coins[2]} />
              </div>
              <div className="text">
                {cate.name}{" "}
                <PercentChange percent={cate.market_cap_change_24h} />
              </div>
            </a>
          ))}
      </ul>
      <ul>
        {cateData
          .sort((a, b) => a.market_cap_change_24h - b.market_cap_change_24h)
          .filter((cate) => {
            if (!filteredCat.includes(cate.id)) {
              return cate;
            }
          })
          .slice(0, 4)
          .sort((a, b) => b.market_cap_change_24h - a.market_cap_change_24h)
          .map((cate) => (
            <a
              key={cate.id}
              href={"https://www.coingecko.com/fr/categories/" + cate.id}
              target="_blank"
            >
              <div className="img">
                <img src={cate.top_3_coins[0]} />
                <img src={cate.top_3_coins[1]} />
                <img src={cate.top_3_coins[2]} />
              </div>
              <div className="text">
                {cate.name} :{" "}
                <PercentChange percent={cate.market_cap_change_24h} />
              </div>
            </a>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
