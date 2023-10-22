import React, { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";

const PercentChange = ({ percent, time, type }) => {
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
    if (type === "ath") {
      // console.log(percent, typeof percent);
      if (percent > -3) {
        return "green";
      } else if (percent < -75) {
        return "rgb(255, 75, 75)";
      } else if (percent < -50) {
        return "rgb(249, 159, 159)";
      } else if (percent < -25) {
        return "rgb(248, 215, 215)";
      } else return "rgb(166, 200, 166)";
    } else {
      if (percent) {
        if (percent < -50) {
          return "rgb(255, 75, 75)";
        } else if (percent < -25) {
          return "rgb(249, 159, 159)";
        } else if (percent < 0) {
          return "rgb(248, 215, 215)";
        } else if (percent > 50) {
          return "green";
        } else if (percent > 25) {
          return "rgb(92, 163, 92)";
        } else if (percent >= 0) {
          return "rgb(166, 200, 166)";
        }
      }
    }
  };

  return (
    <p className="percent-change-container" style={{ color }}>
      {type === "ath" ? (
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
