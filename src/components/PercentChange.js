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

  const barAggregator = (multi) => {
    if (percent * multi > 100 || percent * multi < -100) {
      return 62 + "%";
    } else if (percent >= 0) {
      return percent * multi * 0.62 + "%";
    } else if (percent <= 0) {
      return percent * -multi * 0.62 + "%";
    }
  };

  const backgroundMaker = () => {
    switch (time) {
      case "1h":
        return barAggregator(55);
      case "1d":
        return barAggregator(10);
      case "1w":
        return barAggregator(5);
      case "1m":
        return barAggregator(2.5);
      case "6m":
        return barAggregator(1.3);
      case "1y":
        return barAggregator(1);
      default:
        null;
    }
  };

  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(1) + "%" : "-"}
      <span
        className="bar"
        style={{
          width: backgroundMaker(),
          background: percent >= 0 ? colors.green1 : colors.red1,
        }}
      ></span>
    </p>
  );
};

export default PercentChange;
