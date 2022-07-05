import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSignalList } from "../actions/signalList.action";
import colors from "../styles/_settings.scss";

const Signal = ({ coin }) => {
  const [param, setParam] = useState(false);
  const [mini, setMini] = useState(0);
  const [maxi, setMaxi] = useState(0);
  const [color, setColor] = useState("rgb(42, 42, 42)");
  const signalList = useSelector((state) => state.signalListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {});

    if (signalList) {
      for (let i = 0; i < signalList.length; i++) {
        if (signalList[i][0] === coin.id) {
          setMini(Number(signalList[i][1]));
          setMaxi(Number(signalList[i][2]));

          if (coin.current_price / mini < 1.2) {
            setColor("rgb(254, 157, 140)");
          } else if (coin.current_price / mini < 1.05) {
            setColor(colors.red1);
          } else if (coin.current_price / mini < 1) {
            setColor(colors.red2);
          } else if (coin.current_price / maxi > 1) {
            setColor("rgb(0, 253, 8)");
          } else if (coin.current_price / maxi > 0.95) {
            setColor(colors.green2);
          } else if (coin.current_price / maxi > 0.8) {
            setColor(colors.green1);
          } else {
            setColor("black");
          }
          break;
        }
      }
    }
  }, [signalList, color, param]);

  const setSignal = () => {
    if (window.localStorage.signalData) {
      for (let i = 0; i < signalList.length; i++) {
        if (coin.id === signalList[i][0]) {
          signalList.splice(i, 1);
          break;
        }
      }
      let data = [coin.id, mini, maxi];
      dispatch(setSignalList([...signalList, data]));
    } else {
      dispatch(setSignalList([[coin.id, mini, maxi]]));
    }
  };

  const deleteSignal = () => {
    if (window.localStorage.signalData) {
      for (let i = 0; i < signalList.length; i++) {
        if (coin.id === signalList[i][0]) {
          signalList.splice(i, 1);
          dispatch(setSignalList(signalList));
          break;
        }
      }
    }
  };

  return (
    <div className="signal-container" id="signal-container">
      <div
        className="sign-color"
        style={{ background: color }}
        onMouseUp={() => {
          setParam(true);
        }}
      ></div>

      {param && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault(e);
            setSignal();
            setParam(false);
          }}
        >
          <input
            type="text"
            placeholder="mini"
            onChange={(e) => setMini(e.target.value)}
            defaultValue={mini !== 0 ? mini : null}
          />
          <input
            type="text"
            placeholder="maxi"
            onChange={(e) => setMaxi(e.target.value)}
            defaultValue={maxi !== 0 ? maxi : null}
          />
          <div className="btn-container">
            <div id="deleteSignal" onClick={() => deleteSignal()}>
              <img
                id="imgDeleteSignal"
                src="./assets/delete-icon-bis.svg"
                alt="delete"
              />
            </div>
            <input type="submit" value="Confirmer" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Signal;
