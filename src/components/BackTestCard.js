import React, { useState } from "react";
import { useEffect } from "react";

const BackTestCard = ({
  coin,
  availableTotal,
  setAvailableTotal,
  coinsData,
  setCoinsData,
  todayDate,
  pnl,
}) => {
  const [percentSell, setPercentSell] = useState();
  const [positionValue, setPositionValue] = useState();
  const [tokenValue, setTokenValue] = useState();

  useEffect(() => {
    const [y, m, d] = todayDate.split("-");
    let newDate = [d, m, y].join("/");

    coin.prices.filter((c) => {
      if (c.date === newDate) {
        setPositionValue((c.price * coin.tokenAmount).toFixed(0));
        setTokenValue(c.price);
      }
    });
  }, [todayDate, coinsData]);

  const tokenPrice = (pri) => {
    const [y, m, d] = todayDate.split("-");
    let newDate = [d, m, y].join("/");

    for (let i = 0; i < pri.length; i++) {
      if (newDate === pri[i].date) {
        return pri[i].price.toFixed(5);
      }
    }
  };

  const handleSell = () => {
    let [y, m, d] = todayDate.split("-");
    let sellD = [d, m, y].join("/");

    if (percentSell === 100) {
      let newArray = coinsData.filter((c) => {
        return c.id !== coin.id;
      });
      setCoinsData(newArray);
      setAvailableTotal(availableTotal + (percentSell / 100) * positionValue);
    } else {
      let newArray = coinsData.filter((c) => {
        if (c.id === coin.id) {
          let tokAm = c.tokenAmount * (1 - percentSell / 100);
          let amIn = c.amountInvested * (1 - percentSell / 100);

          c.tokenAmount = Number(tokAm);
          c.amountInvested = Number(amIn);
          console.log(c);
          return c;
        } else {
          return c;
        }
      });
      setCoinsData(newArray);
      setAvailableTotal(availableTotal + (positionValue * percentSell) / 100);
    }

    setPercentSell("");
  };

  const handleDelete = () => {
    setAvailableTotal(availableTotal + coin.amountInvested);

    let newArray = coinsData.filter((c) => {
      return c.id !== coin.id;
    });
    setCoinsData(newArray);
  };

  const thousandSeparator = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="card">
      <img src={coin.img} alt="icon crypto" />
      <h3>
        {coin.coinName} ({coin.symbol.toUpperCase()})
      </h3>
      <p className="pos-value">
        Position value{" "}
        <div>
          <span>{positionValue && thousandSeparator(positionValue)}</span> (
          {((positionValue / pnl) * 100).toFixed(0)}%)
        </div>
      </p>
      <p className="pnl">
        PNL
        <span
          style={{
            color: tokenValue / coin.buyPrice - 1 >= 0 ? "green" : "red",
          }}
        >
          {((tokenValue / coin.buyPrice - 1) * 100).toFixed(0)}%
        </span>
      </p>
      <p>
        Invest <span>{coin.amountInvested.toFixed(0)} $</span>
      </p>
      <p>
        Date : <span>{coin.buyDate}</span>
      </p>
      <p>
        Tokens <span>{coin.tokenAmount.toFixed(3)}</span>
      </p>
      <p>
        Token price <span>{tokenPrice(coin.prices)}</span>
      </p>
      <button className="all" onClick={() => setPercentSell(100)}>
        All
      </button>
      <input
        type="text"
        placeholder="%"
        onChange={(e) => setPercentSell(Number(e.target.value))}
        value={percentSell}
      />
      <button onClick={() => handleSell()}>Sell</button>
      <button className="delete" onClick={() => handleDelete()}>
        x
      </button>
    </div>
  );
};

export default BackTestCard;
