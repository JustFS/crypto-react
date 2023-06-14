import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCoinsData } from "../actions/coinsData.action";
import { setSignalList } from "../actions/signalList.action";
import colors from "../styles/_settings.scss";

const Signal = ({ coin }) => {
  const [param, setParam] = useState(false);
  const [mini, setMini] = useState(0);
  const [maxi, setMaxi] = useState(0);
  const [verif, setVerif] = useState(false);
  const [color, setColor] = useState("rgb(42, 42, 42)");
  const signalList = useSelector((state) => state.signalListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signalList) {
      if (coin.signal === [0, 0]) {
        setColor("rgb(42, 42, 42)");
      }
      console.log(signalList);
      for (let i = 0; i < signalList.length; i++) {
        if (signalList[i][0] === coin.id) {
          setMini(Number(signalList[i][1]));
          setMaxi(Number(signalList[i][2]));
          setVerif(signalList[i][3]);

          if (coin.signal[0] < 0) {
            setColor("skyblue");
          } else if (coin.signal[1] > 1) {
            setColor(colors.color1);
          } else if (coin.signal[1] < 1 && coin.signal[1] > 0.95) {
            setColor(colors.green2);
          } else if (coin.signal[1] < 0.95 && coin.signal[1] > 0.85) {
            setColor(colors.green1);
          } else if (coin.signal[0] < 1.15 && coin.signal[0] > 1.05) {
            setColor("rgb(251, 185, 174)");
          } else if (coin.signal[0] < 1.05 && coin.signal[0] > 1) {
            setColor(colors.red1);
          } else if (coin.signal[0] < 1) {
            setColor(colors.red2);
          } else {
            setColor("black");
          }
        }
      }
    }
  }, [param]);

  const setSignal = () => {
    let data = [coin.id, mini, maxi, verif];

    if (window.localStorage.signalData) {
      for (let i = 0; i < signalList.length; i++) {
        if (coin.id === signalList[i][0]) {
          signalList.splice(i, 1);
          break;
        }
      }
      dispatch(setSignalList([...signalList, data]));
      dispatch(updateCoinsData(data));
    } else {
      dispatch(setSignalList([data]));
      dispatch(updateCoinsData(data));
    }
  };

  const deleteSignal = () => {
    if (window.localStorage.signalData) {
      for (let i = 0; i < signalList.length; i++) {
        if (coin.id === signalList[i][0]) {
          signalList.splice(i, 1);
          dispatch(setSignalList(signalList));
          dispatch(updateCoinsData([coin.id, 0, 0, verif]));
          setMini(0);
          setMaxi(0);
          setVerif(false);
          setColor("rgb(42, 42, 42)");
        }
      }
    }
  };

  return (
    <div className="signal-container" id="signal-container">
      <div
        className="sign-color"
        style={{
          background: color,
          outline: verif ? "3px solid #00b7b3" : null,
        }}
        onClick={() => {
          setParam(!param);
        }}
      ></div>

      {param && (
        <div class="signal-container">
          <button onClick={() => setVerif(!verif)}>
            {verif ? "Blue chip ?" : "Not blue chip ?"}
          </button>
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
              placeholder="support"
              onChange={(e) => {
                setMini(e.target.value);
              }}
              defaultValue={mini !== 0 ? mini : null}
            />
            <input
              type="text"
              placeholder="resistance"
              onChange={(e) => setMaxi(e.target.value)}
              defaultValue={maxi !== 0 ? maxi : null}
            />
            <div className="btn-container">
              <div
                onClick={() => {
                  deleteSignal();
                  setParam(false);
                }}
              >
                <img src="./assets/delete-icon-bis.svg" alt="delete" />
              </div>
              <input type="submit" value="Confirm" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signal;
