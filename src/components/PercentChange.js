import React from "react";
import colors from "../styles/_settings.scss";

const PercentChange = ({ percent }) => {
  return (
    <p
      className="percent-change-container"
      style={{
        color: percent >= 0 ? colors.green1 : colors.red1,
      }}
    >
      {percent ? percent.toFixed(2) + "%" : "-"}
    </p>
  );
};

export default PercentChange;
