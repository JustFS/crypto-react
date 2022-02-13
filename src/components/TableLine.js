import React, { useState } from "react";
import CoinChart from "./CoinChart";
import PercentChange from "./PercentChange";

const TableLine = ({ coin }) => {
  const [showChart, setShowChart] = useState(false);

  const mktCapFormater = (num) => {
    let newNum = String(num).split("").slice(0, -6);

    if (newNum.length > 3) {
      newNum[newNum.length - 4] += ",";
      return newNum.join("");
    } else {
      return "0," + newNum.join("");
    }
  };

  const priceFormater = (num) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(num);
    } else {
      return num;
    }
  };

  return (
    <div className="table-line-container">
      <div className="chart-container" id={coin.id}>
        {showChart && <CoinChart coinId={coin.id} />}
      </div>
      <a
        className="table-line"
        target="_blank"
        href={
          "https://www.coingecko.com/fr/pi%C3%A8ces/" +
          coin.name.toLowerCase().replace(" ", "-").replace(" ", "-")
        }
      >
        <div
          className="name-pic-container"
          onMouseEnter={(e) => {
            setShowChart(true);
            if (e.clientY > 280) {
              document.getElementById(coin.id).style.bottom = "-30px";
              document.getElementById(coin.id).style.top = "none";
            } else {
              document.getElementById(coin.id).style.bottom = "-290px";
              document.getElementById(coin.id).style.top = "none";
            }
          }}
          onMouseLeave={() => setShowChart(false)}
        >
          <p>{coin.market_cap_rank}</p>
          <div className="img">
            <img src={coin.image} height="20" alt="logo" />
          </div>
          <h4>
            {coin.name} <span>- {coin.symbol.toUpperCase()}</span>
          </h4>
        </div>
        <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
        <p className="mktcap">{mktCapFormater(coin.market_cap)} Md$</p>
        <p className="volume">{coin.total_volume.toLocaleString()} $</p>
        <PercentChange percent={coin.price_change_percentage_1h_in_currency} />
        <PercentChange percent={coin.market_cap_change_percentage_24h} />
        <PercentChange percent={coin.price_change_percentage_7d_in_currency} />
        <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
        <PercentChange
          percent={coin.price_change_percentage_200d_in_currency}
        />
        <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
        {coin.ath_change_percentage > -3 ? (
          "ATH !"
        ) : (
          <PercentChange percent={coin.ath_change_percentage} />
        )}
      </a>
    </div>
  );
};

export default TableLine;
