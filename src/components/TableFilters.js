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
            {showStable ? "With stable" : "Without stable"}
          </label>
        </div>
        <div
          className={showList === "all" ? "all active" : "all"}
          onClick={() => setList("all")}
        >
          <p>All</p>
        </div>
        <div
          className={showList === "none" ? "none active" : "none"}
          onClick={() => setList("none")}
        >
          <p>List</p>
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
          <p>Trash</p>
          <img src="./assets/delete-icon.svg" alt="delete icon" />
        </div>
        <div className="stable-checkbox-container" id="mktv-btn">
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
          <label htmlFor="volmkt">mv/ath/atl</label>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
