import React from "react";
import { NavLink } from "react-router-dom";

const Help = () => {
  return (
    <div className="help-container">
      <h1>
        Help Center <img src="./assets/question.svg" alt="question icon" />
      </h1>
      <NavLink to="/" className="link">
        Go back
      </NavLink>

      <div className="features">
        <div className="intro">
          <h3>Features</h3>
          <p>
            <span>Welcome to Web 3.0 </span>: on this website you'll never
            register, never give anything about you. All the data is stored on
            your browser local storage. Which means you'll have to be carefull
            when cleaning your browser, don't delete your local storage
            otherwise you'll lose your lists.
          </p>
        </div>
        <div className="mkt-atl">
          <h3>Mktv & ATL/ATH button</h3>
          <p>
            The Mktv shows how many days you need to trade as much value as the
            marketcap, this indicator shows that a coin may have a big volume
            compare to its Marketcap. The ATL & ATH columns display how many
            days have passed since the last ATL/ATH.
          </p>
        </div>
        <div className="filter-bar">
          <h3>Filter bar</h3>
          <div className="img-container">
            <img src="./assets/filter-bar.png" alt="filter bar" />
          </div>
        </div>

        <div className="other">
          <h3>Other features</h3>
          <ul>
            <li>
              On hover on the <img src="./assets/chart-icon.svg" alt="chart" />{" "}
              button you'll see the coin chart with the timeframe you'd like
            </li>
            <li>
              On click on the{" "}
              <img src="./assets/info-icon.svg" alt="infos icon" /> button
              you'll see CoinGecko token page
            </li>
            <li>
              On click on the treemap chart (top right) you'll have a space to
              take some notes (those notes are of course saved)
            </li>
          </ul>
        </div>
        <div className="ta">
          <h3>TA</h3>
          <p>
            If you click on the black circle in the TA column you'll see 2
            inputs asking you for a support and a resistance. By entering thoses
            levels the circle's color will change and adjusting if you are
            either close to the support or resistance. This is an indicator to
            start to follow closely a token price action.
          </p>
          <div className="explain">
            <div className="form-part">
              <img src="./assets/ta.png" alt="ta img" />
            </div>

            <div className="colors-part">
              <p className="subtitle">Understand colors</p>
              <ul>
                <li>
                  <span></span>no value has been entered
                </li>
                <li>
                  <span></span>coin broke resistance
                </li>
                <li>
                  <span></span>coin is at 5% to break resistance
                </li>
                <li>
                  <span></span>coin is at 15% to break resistance
                </li>
                <li>
                  <span></span>coin is neutral
                </li>
                <li>
                  <span></span>coin is at 15% to break support
                </li>
                <li>
                  <span></span>coin is at 5% to break support
                </li>
                <li>
                  <span></span>coin broke support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="ama">
        <span>AMA : </span> feel free to ask me what you want on Twitter :
        <a href="https://twitter.com/zaneiluj" target="_blank">
          {" "}
          zaneiluj
        </a>
      </p>
      <NavLink to="/" className="link" id="sec">
        Go to home page
      </NavLink>
    </div>
  );
};

export default Help;
