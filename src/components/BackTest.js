import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackTestCard from "./BackTestCard";
import PnlChart from "./PnlChart";

const BackTest = () => {
  const [menu, setMenu] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");
  const [amountInvested, setAmountInvested] = useState();
  const [coinName, setCoinName] = useState("");
  const [coinChoice, setCoinChoice] = useState("");
  const [coinsData, setCoinsData] = useState([]);
  const globalData = useSelector((state) => state.coinsDataReducer);
  const [availableTotal, setAvailableTotal] = useState(10000);
  const [pnl, setPnl] = useState(10000);
  const [oldPnl, setOldPnl] = useState();
  const [todayDate, setTodayDate] = useState("2020-03-20");
  const [btcData, setBtcData] = useState([]);
  const [btcBool, setBtcBool] = useState(true);
  const [btcEq, setBtcEq] = useState();
  const [chartData, setChartData] = useState([]);
  // const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    if (coinSearch.length > 2) {
      axios
        .get("https://api.coingecko.com/api/v3/search?query=" + coinSearch)
        .then((res) => {
          setMenu(res.data.coins);
        });
    }

    // PNL Calc
    if (coinsData.length > 0) {
      setOldPnl(pnl);
      let pnlNum = 0;

      coinsData.forEach((coin) => {
        coin.prices.filter((c) => {
          const [y, m, d] = todayDate.split("-");
          let newDate = [d, m, y].join("/");
          if (c.date === newDate) {
            pnlNum += Number(c.price) * coin.tokenAmount;
          }
        });
      });
      setPnl(pnlNum + availableTotal);
      handleChartData();
    }

    btcCalc();
  }, [coinSearch, coinsData, todayDate]);

  const selectCoin = (coinId, coinName) => {
    setCoinSearch("");
    setMenu("");
    setCoinChoice(coinId);
    setCoinName(coinName);
  };

  const validateCoin = () => {
    let dataArray = [];
    let img = [];
    let symbol = "";
    let buyPrice = 0;

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinChoice}/market_chart?vs_currency=usd&days=1200`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price,
          });
        }

        dataArray.filter((data) => {
          const [y, m, d] = todayDate.split("-");
          let newDate = [d, m, y].join("/");

          if (data.date === newDate) {
            buyPrice = data.price;
          }
        });

        for (let i = 0; i < globalData.length; i++) {
          if (globalData[i].id === coinChoice) {
            img = globalData[i].image;
            symbol = globalData[i].symbol;
            return;
          }
        }
      })
      .then(() => {
        const [y, m, d] = todayDate.split("-");

        let data = {
          id: coinChoice,
          coinName,
          prices: dataArray,
          buyDate: [d, m, y].join("/"),
          buyPrice,
          amountInvested: amountInvested,
          img,
          symbol,
          tokenAmount: Number(
            calcTokenNumber([d, m, y].join("/"), dataArray, amountInvested)
          ),
        };

        setAvailableTotal(availableTotal - amountInvested);
        setCoinsData(() => [...coinsData, data]);
        setAmountInvested("");
        setCoinSearch("");
        setCoinChoice("");
      });
  };

  const calcTokenNumber = (date, pri, invest) => {
    if (pri) {
      for (let i = 0; i < pri.length; i++) {
        if (date === pri[i].date) {
          return invest / pri[i].price;
        }
      }
    }
  };

  const btcCalc = () => {
    if (btcBool) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1600`
        )
        .then((res) => {
          let dataArray = [];

          for (let i = 0; i < res.data.prices.length; i++) {
            dataArray.push({
              date: new Date(res.data.prices[i][0]).toLocaleDateString(),
              price: res.data.prices[i][1],
            });
          }
          setBtcData(dataArray);
        });
      setBtcBool(false);
    }
    btcData.filter((data) => {
      const [y, m, d] = todayDate.split("-");
      let newDate = [d, m, y].join("/");

      if (data.date === newDate) {
        setBtcEq(pnl / data.price);
      }
    });
  };

  const thousandSeparator = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleChartData = () => {
    let prevData = {
      date: todayDate,
      pnl,
    };

    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].date === prevData.date) {
        delete chartData[i];
      }
    }

    let newData = [...chartData, prevData]
      .filter((el) => el != null)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setChartData(newData);
    console.log(newData);
  };

  return (
    <div className="backtest-container">
      <PnlChart data={chartData} />
      <div className="header">
        <div className="start">
          <h2>Backtest</h2>
          <input
            onChange={(e) => setAvailableTotal(Number(e.target.value))}
            type="text"
            placeholder="start"
          />
        </div>
        <div>
          Date
          <input
            type="date"
            onChange={(e) => {
              setTodayDate(e.target.value);
              handleChartData();
            }}
            value={todayDate}
          />
        </div>
        <p>
          Avail.{" "}
          {availableTotal && thousandSeparator(availableTotal.toFixed(0))} $
        </p>
        {btcEq && <p>{btcEq.toFixed(1)} BTC</p>}
        <p>
          PNL <span>{thousandSeparator(pnl.toFixed(0))} $</span>
        </p>
        {coinsData.length > 0 && (
          <p style={{ color: (pnl / oldPnl - 1) * 100 >= 0 ? "green" : "red" }}>
            {((pnl / oldPnl - 1) * 100).toFixed(0)}%
          </p>
        )}
      </div>

      <div className="backtest">
        <div className="form">
          {coinChoice.length < 1 ? (
            <>
              <input
                type="text"
                placeholder="Add coin"
                onChange={(e) => setCoinSearch(e.target.value)}
                value={coinSearch}
              />
              {coinSearch.length > 2 && (
                <ul>
                  {menu &&
                    menu
                      .sort((a, b) => {
                        if (a.market_cap_rank === !null) {
                          return a.market_cap_rank - b.market_cap_rank;
                        }
                      })
                      .slice(0, 10)
                      .map((coin) => {
                        return (
                          <li
                            key={coin.id}
                            onClick={() => selectCoin(coin.id, coin.name)}
                          >
                            {coin.name}{" "}
                            <span>
                              {coin.symbol} ({coin.market_cap_rank})
                            </span>
                          </li>
                        );
                      })}
                </ul>
              )}
            </>
          ) : (
            <p>{coinChoice}</p>
          )}
          <input
            type="text"
            onChange={(e) => setAmountInvested(Number(e.target.value))}
            value={amountInvested}
            placeholder="amount"
          />
          <button
            className="validate-form"
            onClick={() => {
              if (amountInvested) validateCoin();
            }}
          >
            Add
          </button>
        </div>

        <div className="coin-list">
          {coinsData
            ?.sort((a, b) => b.amountInvested - a.amountInvested)
            .map((coin) => (
              <BackTestCard
                coin={coin}
                key={coin.id}
                setAvailableTotal={setAvailableTotal}
                availableTotal={availableTotal}
                coinsData={coinsData}
                setCoinsData={setCoinsData}
                todayDate={todayDate}
                pnl={pnl}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BackTest;
