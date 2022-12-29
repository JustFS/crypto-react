import React, { useState } from "react";
import CoinChart from "./CoinChart";
import DeleteIcon from "./DeleteIcon";
import PercentChange from "./PercentChange";
import Signal from "./Signal";
import StarIcon from "./StarIcon";

const TableLine = ({ coin, sumNumber, index }) => {
  const [showChart, setShowChart] = useState(false);

  const mktCapFormater = (num) => {
    let newNum = String(num).split("").slice(0, -6);

    return Number(newNum.join(""));
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

  const priceFormater = (num) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 9,
      }).format(num);
    } else if (Math.round(num).toString().length > 3) {
      return Math.round(num);
    } else {
      return num;
    }
  };

  const mktvolCalc = (mkt, vol) => {
    let num = (mkt / vol).toFixed(1);
    if (String(num).length > 7) {
      return (mkt / vol).toFixed(0);
    } else {
      return (mkt / vol).toFixed(1);
    }
  };

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.id} />
        <p>{coin.market_cap_rank}</p>
        <div className="img">
          <img src={coin.image} height="20" alt="logo" />
        </div>
        <div className="infos">
          <div
            className="chart-img"
            onMouseEnter={(e) => {
              setShowChart(true);
            }}
            onMouseLeave={() => setShowChart(false)}
          >
            <img src="./assets/chart-icon.svg" alt="chart-icon" />
            <div className="chart-container" id={coin.name}>
              {showChart && <CoinChart coinId={coin.id} coinName={coin.name} />}
            </div>
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          <a
            target="_blank"
            href={
              "https://www.coingecko.com/en/coins/" +
              coin.name.toLowerCase().replace(" ", "-").replace(" ", "-")
            }
          >
            <img src="./assets/info-icon.svg" alt="info-icon" />
          </a>
        </div>
      </div>
      <Signal coin={coin} />
      <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
      <p className="mktcap">
        {mktCapFormater(coin.market_cap).toLocaleString()} M$
      </p>
      <p className="volume">{volFormater(coin.total_volume)}</p>
      <p className="volumeMktcap">
        {mktvolCalc(coin.market_cap, coin.total_volume)}
      </p>
      <p className="diluted">
        {coin.market_cap / coin.fully_diluted_valuation === Infinity
          ? "Inf"
          : ((coin.market_cap / coin.fully_diluted_valuation) * 100).toFixed(
              0
            ) + "%"}
      </p>
      <PercentChange
        percent={coin.price_change_percentage_1h_in_currency}
        time="1h"
      />
      <PercentChange
        percent={coin.market_cap_change_percentage_24h}
        time="1d"
      />
      <PercentChange
        percent={coin.price_change_percentage_7d_in_currency}
        time="1w"
      />
      <PercentChange
        percent={coin.price_change_percentage_30d_in_currency}
        time="1m"
      />
      <PercentChange
        percent={coin.price_change_percentage_200d_in_currency}
        time="6m"
      />
      <PercentChange
        percent={coin.price_change_percentage_1y_in_currency}
        time="1y"
      />
      {coin.ath_change_percentage > -3 ? (
        <p>ATH</p>
      ) : (
        <PercentChange percent={coin.ath_change_percentage} />
      )}
      <p className="ath">
        {Math.round(
          (new Date() - new Date(coin.ath_date)) / (1000 * 3600 * 24)
        )}
      </p>
      <p className="atl">
        {Math.round(
          (new Date() - new Date(coin.atl_date)) / (1000 * 3600 * 24)
        )}
      </p>
      <DeleteIcon coinId={coin.id} />
      {index === 0 && <p className="sum-number">{sumNumber}</p>}
    </div>
  );
};

export default TableLine;
