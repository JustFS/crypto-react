import React, { useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import GlobalChart from "../components/GlobalChart";
import ToTop from "../components/ToTop";
import axios from "axios";
import { setBanListDisplay } from "../actions/banList.action";
import { useDispatch } from "react-redux";
import { setSignalList } from "../actions/signalList.action";
import { setCoinsData } from "../actions/coinsData.action";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { setTopThousand } from "../actions/tops.action";
import { setTimeFrame } from "../actions/timeFrame.action";
import Trending from "../components/Trending";

const Home = () => {
  const dispatch = useDispatch();
  const coinsData = useSelector((state) => state.coinsDataReducer);

  const scrollFunction = () => {
    if (window.scrollY > 145 && document.querySelector(".table-header")) {
      document.querySelector(".table-header").classList.add("active");
    } else {
      document.querySelector(".table-header").classList.remove("active");
    }
  };

  useEffect(() => {
    let data = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => {
        data = res.data;

        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
          )
          .then((res) => {
            data = [...data, ...res.data];

            if (window.localStorage.signalData) {
              let signalList = JSON.parse(window.localStorage.signalData);

              data.forEach((coin) => {
                coin.signal = [0, 0];
                for (let i = 0; i < signalList.length; i++) {
                  if (signalList[i][0] === coin.id) {
                    coin.signal[0] = coin.current_price / signalList[i][1];
                    coin.signal[1] = coin.current_price / signalList[i][2];
                  }
                }
              });
              dispatch(setCoinsData(data));
            } else {
              dispatch(setCoinsData(data));
            }

            axios
              .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
              )
              .then((res) => {
                data = [...data, ...res.data];

                axios
                  .get(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
                  )
                  .then((res) => {
                    data = [...data, ...res.data];

                    if (window.localStorage.signalData) {
                      let signalList = JSON.parse(
                        window.localStorage.signalData
                      );

                      data.forEach((coin) => {
                        coin.signal = [0, 0];
                        for (let i = 0; i < signalList.length; i++) {
                          if (signalList[i][0] === coin.id) {
                            coin.signal[0] =
                              coin.current_price / signalList[i][1];
                            coin.signal[1] =
                              coin.current_price / signalList[i][2];
                          }
                        }
                      });
                      dispatch(setCoinsData(data));
                    } else {
                      dispatch(setCoinsData(data));
                    }
                  });
              });
          })
          .then(() => {
            window.addEventListener("scroll", scrollFunction);
          });
      });

    if (window.localStorage.banList) {
      dispatch(setBanListDisplay(window.localStorage.banList));
    }
    if (window.localStorage.signalData) {
      dispatch(setSignalList(JSON.parse(window.localStorage.signalData)));
    }
    if (window.localStorage.topThousand) {
      dispatch(setTopThousand(JSON.parse(window.localStorage.topThousand)));
    }
    if (window.localStorage.timeFrame) {
      dispatch(setTimeFrame(JSON.parse(window.localStorage.timeFrame)));
    } else {
      dispatch(setTimeFrame(91));
    }

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <div className="app-container">
      {coinsData && (
        <>
          <header>
            <Header />
            <Trending />
            <GlobalChart coinsData={coinsData} />
          </header>
          <Table />
          <ToTop />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
