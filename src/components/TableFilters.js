import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setListDisplay } from "../actions/list.action";
import { setStableState } from "../actions/stable.action";

const TableFilters = () => {
  let stableStart = window.localStorage.stableChoice
    ? window.localStorage.stableChoice
    : true;
  const [showStable, setShowStable] = useState(
    stableStart === "true" ? true : false
  );
  const [showList, setList] = useState("none");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStableState(showStable));
    dispatch(setListDisplay(showList));
  }, [showStable, showList]);

  return (
    <div className="table-filters">
      <div className="table-filters-container">
        <div className="stable-checkbox-container">
          <input
            onChange={() => setShowStable(!showStable)}
            type="checkbox"
            id="stableCoin"
            defaultChecked={showStable}
          />
          <label htmlFor="stableCoin">
            {showStable ? "Avec stable" : "Sans stable"}
          </label>
        </div>
        <div className="stable-checkbox-container">
          <input
            onChange={() => {
              document
                .querySelector(".table-container")
                .classList.toggle("mktvol");
            }}
            type="checkbox"
            id="volmkt"
            defaultChecked={false}
          />
          <label htmlFor="volmkt">vol/mkt</label>
        </div>
        <div
          className={showList === "none" ? "no-list-btn active" : "no-list-btn"}
          onClick={() => setList("none")}
        >
          <p>Liste</p>
        </div>
        <div
          className={showList === "fav" ? "fav-list active" : "fav-list"}
          onClick={() => setList("fav")}
        >
          <p>Fav</p>
          <img src="./assets/star-full.svg" alt="icon-star" />
        </div>
        <div
          className={showList === "shit" ? "shit-list active" : "shit-list"}
          onClick={() => setList("shit")}
        >
          <p>Shitcoins</p>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
