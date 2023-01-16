import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BacktestPage from "./pages/BacktestPage";
import Help from "./pages/Help";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/backtest" element={<BacktestPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
