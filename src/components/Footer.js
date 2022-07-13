import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>
        Need <NavLink to="/help">help</NavLink> ?
      </p>
      <p>
        Made by{" "}
        <a href="https://twitter.com/zaneiluj" target="_blank">
          zaneiluj
        </a>{" "}
        🚀
      </p>
      <p>Thanks to CoinGecko free API 🦎</p>
      <div className="ee"></div>
    </footer>
  );
};

export default Footer;
