import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import GlobalChart from "./components/GlobalChart";
import ToTop from "./components/ToTop";

const App = () => {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 145) {
        document.querySelector(".table-header").classList.add("active");
      } else {
        document.querySelector(".table-header").classList.remove("active");
      }
    });
  }, []);

  return (
    <div className="app-container">
      <header>
        <Header />
        <GlobalChart />
      </header>
      <Table />
      <ToTop />
    </div>
  );
};

export default App;
