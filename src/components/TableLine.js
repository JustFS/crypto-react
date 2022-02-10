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
    <div className="table-line">
      <p>{coin.market_cap_rank}</p>
      <div
        className="name-pic-container"
        onMouseEnter={(e) => {
          setShowChart(true);
          if (e.clientY > 280) {
            document.getElementById(coin.id).style.bottom = "32px";
            document.getElementById(coin.id).style.top = "none";
          } else {
            document.getElementById(coin.id).style.bottom = "-290px";
            document.getElementById(coin.id).style.top = "none";
          }
        }}
        onMouseLeave={() => setShowChart(false)}
      >
        <div className="img">
          <img src={coin.image} height="20" alt="logo" />
        </div>
        <h4>
          {coin.name} - <span>{coin.symbol.toUpperCase()}</span>
        </h4>
        <div className="chart-container" id={coin.id}>
          {showChart && <CoinChart coinId={coin.id} />}
        </div>
      </div>
      <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
      <p>{coin.total_volume.toLocaleString()} $</p>
      <p>{mktCapFormater(coin.market_cap)} Md$</p>
      <PercentChange price={coin.price_change_percentage_1h_in_currency} />
      <PercentChange price={coin.market_cap_change_percentage_24h} />
      <PercentChange price={coin.price_change_percentage_7d_in_currency} />
      <PercentChange price={coin.price_change_percentage_30d_in_currency} />
      <PercentChange price={coin.price_change_percentage_200d_in_currency} />
      <PercentChange price={coin.price_change_percentage_1y_in_currency} />
      {coin.ath_change_percentage > -3 ? (
        "ATH !"
      ) : (
        <PercentChange price={coin.ath_change_percentage} />
      )}
    </div>
  );
};

export default TableLine;
