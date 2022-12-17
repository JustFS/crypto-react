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
            <img src="./assets/stable.svg" alt="stable coin" />
          </label>
        </div>
        <div
          className={showList === "none" ? "none active" : "none"}
          onClick={() => setList("none")}
        >
          <img src="./assets/checkup-list.svg" alt="list fav" />
        </div>
        <div
          className={showList === "all" ? "all active" : "all"}
          onClick={() => setList("all")}
        >
          <img src="./assets/all-list.svg" alt="all list" />
        </div>
        <div
          className={showList === "fav" ? "fav-list active" : "fav-list"}
          onClick={() => setList("fav")}
        >
          <img src="./assets/star-full.svg" alt="icon-star" />
        </div>
        <div
          className={showList === "shit" ? "shit-list active" : "shit-list"}
          onClick={() => setList("shit")}
        >
          <img src="./assets/trash.svg" alt="delete icon" />
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
          <label htmlFor="volmkt">
            <img src="./assets/magic.svg" alt="magic icon" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
