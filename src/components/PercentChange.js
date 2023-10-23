import React, { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";

const PercentChange = ({ percent, time }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    if (percent) {
      if (percent >= 0) {
        setColor(colors.green1);
      } else {
        setColor(colors.red1);
      }
    } else {
      setColor(colors.white1);
    }
  }, []);

  const backgroundMaker = () => {
    if (percent)
      switch (time) {
        case "1h":
          if (percent < -5) {
            return "rgb(255, 75, 75)";
          } else if (percent < -2) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 5) {
            return "green";
          } else if (percent > 2) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "1d":
          if (percent < -10) {
            return "rgb(255, 75, 75)";
          } else if (percent < -5) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 15) {
            return "green";
          } else if (percent > 8) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "1w":
          if (percent < -20) {
            return "rgb(255, 75, 75)";
          } else if (percent < -10) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 30) {
            return "green";
          } else if (percent > 15) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "1m":
          if (percent < -30) {
            return "rgb(255, 75, 75)";
          } else if (percent < -15) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 50) {
            return "green";
          } else if (percent > 25) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "6m":
          if (percent < -50) {
            return "rgb(255, 75, 75)";
          } else if (percent < -25) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 75) {
            return "green";
          } else if (percent > 35) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "1y":
          if (percent < -50) {
            return "rgb(255, 75, 75)";
          } else if (percent < -25) {
            return "rgb(249, 159, 159)";
          } else if (percent < 0) {
            return "rgb(248, 215, 215)";
          } else if (percent > 100) {
            return "green";
          } else if (percent > 50) {
            return "rgb(64, 173, 64)";
          } else if (percent >= 0) {
            return "rgb(166, 200, 166)";
          }
        case "ath":
          if (percent > -3) {
            return "green";
          } else if (percent < -75) {
            return "rgb(255, 75, 75)";
          } else if (percent < -50) {
            return "rgb(249, 159, 159)";
          } else if (percent < -25) {
            return "rgb(248, 215, 215)";
          } else return "rgb(166, 200, 166)";
        default:
          return "";
      }
  };

  return (
    <p className="percent-change-container" style={{ color }}>
      {time === "ath" ? (
        percent > -3 ? (
          <div style={{ color: colors.green1 }}>ATH</div>
        ) : (
          percent.toFixed(1) + "%"
        )
      ) : percent ? (
        percent.toFixed(1) + "%"
      ) : (
        "-"
      )}

      <span
        className="bar"
        style={{
          background: backgroundMaker(),
        }}
      ></span>
    </p>
  );
};

export default PercentChange;
