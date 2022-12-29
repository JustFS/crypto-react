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

  const backgroundMaker = (num) => {
    switch (time) {
      case "1h":
        if (num * 40 > 95 || num * 40 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 40 + "%";
        } else if (num <= 0) {
          return percent * -40 + "%";
        }
        break;
      case "1d":
        if (num * 20 > 95 || num * 20 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 20 + "%";
        } else if (num <= 0) {
          return percent * -20 + "%";
        }
        break;
      case "1w":
        if (num * 7 > 95 || num * 7 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 7 + "%";
        } else if (num <= 0) {
          return percent * -7 + "%";
        }
        break;
      case "1m":
        if (num * 4 > 95 || num * 4 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 4 + "%";
        } else if (num <= 0) {
          return percent * -4 + "%";
        }
        break;
      case "6m":
        if (num * 1.3 > 95 || num * 1.3 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 1.3 + "%";
        } else if (num <= 0) {
          return percent * -1.3 + "%";
        }
        break;
      case "1y":
        if (num * 1 > 95 || num * 1 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 1 + "%";
        } else if (num <= 0) {
          return percent * -1 + "%";
        }
        break;
      case "ath":
        if (num * 1.3 > 95 || num * 1.3 < -95) {
          return 95 + "%";
        } else if (num >= 0) {
          return percent * 1.3 + "%";
        } else if (num <= 0) {
          return percent * -1.3 + "%";
        }
        break;
      default:
        null;
    }
  };

  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(1) + "%" : "-"}
      <div
        className="bar"
        style={{
          width: backgroundMaker(percent),
          background: percent >= 0 ? colors.green1 : colors.red1,
        }}
      ></div>
    </p>
  );
};

export default PercentChange;
