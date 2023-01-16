import React from "react";
import { useSelector } from "react-redux";
import BackTest from "../components/BackTest";
import Footer from "../components/Footer";
import GlobalChart from "../components/GlobalChart";
import Header from "../components/Header";
import ToTop from "../components/ToTop";
import Trending from "../components/Trending";

const BacktestPage = () => {
  const coinsData = useSelector((state) => state.coinsDataReducer);

  return (
    <div className="app-container">
      {coinsData && (
        <>
          <header>
            <Header />
            <Trending />
            <GlobalChart coinsData={coinsData} />
          </header>
          <BackTest />
          <ToTop />
        </>
      )}
      <Footer />
    </div>
  );
};

export default BacktestPage;
