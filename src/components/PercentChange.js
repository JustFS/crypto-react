import React from "react";

const PercentChange = ({ price }) => {
  return (
    <p
      className="percent-change-container"
      style={{
        color: price >= 0 ? "green" : "red",
      }}
    >
      {price ? price.toFixed(2) + "%" : "-"}
    </p>
  );
};

export default PercentChange;
