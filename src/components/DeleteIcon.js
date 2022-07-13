import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBanListDisplay } from "../actions/banList.action";

const DeleteIcon = ({ coinId }) => {
  const [deleteBtn, setDeleteBtn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.banList) {
      let list = window.localStorage.banList.split(",");
      if (list.includes(coinId)) {
        setDeleteBtn(false);
      }
    }
  }, []);

  const idChecker = () => {
    let banList = null;
    if (window.localStorage.banList) {
      banList = window.localStorage.banList.split(",");
    }

    if (banList) {
      if (banList.includes(coinId)) {
        window.localStorage.banList = banList.filter((coin) => coin !== coinId);
        setDeleteBtn(true);
      } else {
        window.localStorage.banList = [...banList, coinId];
        setDeleteBtn(false);
      }
    } else {
      window.localStorage.banList = coinId;
      setDeleteBtn(true);
    }
  };

  return (
    <div className="delete-container">
      {deleteBtn ? (
        <img
          src="./assets/delete-icon.svg"
          alt="delete"
          onClick={() => {
            if (
              window.confirm(
                "Delete " + coinId.toUpperCase() + " from the list ?"
              )
            ) {
              idChecker();
              dispatch(setBanListDisplay(window.localStorage.banList));
            }
          }}
        />
      ) : (
        <img
          src="./assets/add-icon.svg"
          alt="add"
          onClick={() => {
            if (
              window.confirm(
                "Restore " + coinId.toUpperCase() + " into the list ?"
              )
            ) {
              idChecker();
              dispatch(setBanListDisplay(window.localStorage.banList));
            }
          }}
        />
      )}
    </div>
  );
};

export default DeleteIcon;
