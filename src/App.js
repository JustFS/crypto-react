import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Help from "./pages/Help";
import Home from "./pages/Home";

const App = () => {
  console.log(window.localStorage);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
