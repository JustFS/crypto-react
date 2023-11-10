import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const CoinInfos = ({ coinId, coinImage, coinName, volume, top }) => {
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + coinId)
      .then((res) => {
        setCoinData(res.data);
      });
  }, []);

  const dateFormater = (date) => {
    let [y, m, d] = date.split("-");
    return [d, m, y].join("/");
  };

  const barMaker = (num, index) => {
    let newNum = num / index;
    if (newNum > 100) {
      return "100%";
    }
    return newNum + "%";
  };

  const volFormater = (num) => {
    if (num > 20000) {
      if (String(num).length > 6) {
        let newNum = String(num).split("").slice(0, -6);

        if (newNum.length > 3) {
          newNum[newNum.length - 4] += " ";
          return newNum.join("") + " M$";
        } else {
          return newNum.join("") + " M$";
        }
      } else if (String(num).length > 5) {
        let newNum = String(num).split("").slice(0, -5);

        if (newNum.length > 3) {
          newNum[newNum.length - 4] += ",";
          return newNum.join("") + " M$";
        } else {
          return "0," + newNum.join("") + " M$";
        }
      } else if (String(num).length > 4) {
        let newNum = String(num).split("").slice(0, -4);

        if (newNum.length > 3) {
          newNum[newNum.length - 4] += ",";
          return newNum.join("");
        } else {
          return "0,0" + newNum.join("") + " M$";
        }
      }
    } else {
      return Math.round(num).toLocaleString() + " $";
    }
  };

  return (
    <div className="coin-infos" style={{ top }}>
      <div className="coin-infos-header">
        <img src={coinImage} alt={coinName + " logo"} />
        <h2>{coinName}</h2>
      </div>
      <div className="content">
        <div className="content-infos">
          {coinData.genesis_date && (
            <p>
              <span>Genesis Date :</span> {dateFormater(coinData.genesis_date)}
            </p>
          )}
          <p>
            <span>Website :</span>{" "}
            <a href={coinData.links?.homepage[0]} target="_blank">
              {coinData.links?.homepage[0]}
            </a>
          </p>
        </div>
        <div className="coin-infos-content">
          <div className="community">
            <h5>Community</h5>
            <ul>
              <li>
                <img
                  src="./assets/twitter-icon.svg"
                  alt="twitter icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    Sub :{" "}
                    <p>
                      {coinData.community_data?.twitter_followers.toLocaleString(
                        "ge"
                      )}
                    </p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.15s ease-out",
                      width: barMaker(
                        coinData.community_data?.twitter_followers,
                        10000
                      ),
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <img
                  src="./assets/reddit-icon.svg"
                  alt="reddit icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    {" "}
                    Sub :{" "}
                    <p>
                      {coinData.community_data?.reddit_subscribers.toLocaleString(
                        "ge"
                      )}
                    </p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.2s ease-out",
                      width: barMaker(
                        coinData.community_data?.reddit_subscribers,
                        5000
                      ),
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <img
                  src="./assets/reddit-icon.svg"
                  alt="reddit icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    {" "}
                    Comments last 48h :{" "}
                    <p>
                      {coinData.community_data?.reddit_average_comments_48h
                        .toString()
                        .replace(".", "")}
                    </p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.25s ease-out",
                      width: barMaker(
                        coinData.community_data?.reddit_average_comments_48h
                          .toString()
                          .replace(".", ""),
                        100
                      ),
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <img
                  src="./assets/reddit-icon.svg"
                  alt="reddit icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    {" "}
                    Active last 48h :{" "}
                    <p>
                      {coinData.community_data?.reddit_subscribers.toLocaleString(
                        "ge"
                      )}
                    </p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.3s ease-out",
                      width: barMaker(
                        coinData.community_data?.reddit_subscribers,
                        1000
                      ),
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <img
                  src="./assets/github-icon.svg"
                  alt="github icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    {" "}
                    Github Stars :{" "}
                    <p>{coinData.developer_data?.stars.toLocaleString("ge")}</p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.35s ease-out",
                      width: barMaker(coinData.developer_data?.stars, 100),
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <img
                  src="./assets/github-icon.svg"
                  alt="github icon"
                  className="icon"
                />
                <div className="right-part">
                  <span>
                    Commit
                    {coinData.developer_data?.commit_count_4_weeks > 1
                      ? "s "
                      : " "}{" "}
                    last 4 weeks :{" "}
                    <p>{coinData.developer_data?.commit_count_4_weeks}</p>
                  </span>
                  <span
                    className="barMaker"
                    style={{
                      transition: "0.4s ease-out",
                      width: barMaker(
                        coinData.developer_data?.commit_count_4_weeks,
                        0.04
                      ),
                    }}
                  ></span>
                </div>
              </li>
            </ul>
          </div>
          <div className="exchange-list">
            <h5>Total Volume : {volFormater(volume)}</h5>
            <div className="exchanges">
              <ul>
                {coinData.tickers &&
                  coinData.tickers
                    .filter((ex) => {
                      if (
                        !ex.target.includes("0X") &&
                        !ex.target.includes("ibc") &&
                        !ex.market.name.includes("Unisw") &&
                        !ex.market.name.includes("Ether") &&
                        !ex.market.name.includes("Orca") &&
                        !ex.market.name.includes("Raydium")
                      ) {
                        return ex;
                      }
                    })
                    .sort(
                      (a, b) =>
                        b.converted_volume.usd / volume -
                        a.converted_volume.usd / volume
                    )
                    .slice(0, 10)
                    .map((exch, index) => (
                      <li key={index}>
                        <p>{exch.market.name} : </p>
                        <p>
                          {((exch.converted_volume.usd / volume) * 100).toFixed(
                            0
                          ) + "%"}
                        </p>
                        <p className="target">{exch.target}</p>
                        <span
                          className="exch-bar"
                          style={{
                            width:
                              (exch.converted_volume.usd / volume) * 400 > 100
                                ? "100%"
                                : (exch.converted_volume.usd / volume) * 400 +
                                  "%",
                          }}
                        ></span>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfos;
