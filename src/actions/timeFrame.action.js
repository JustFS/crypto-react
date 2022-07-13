export const SET_TIME_FRAME = "SET_TIME_FRAME";

export const setTimeFrame = (num) => {
  return (dispatch) => {
    window.localStorage.timeFrame = num;
    return dispatch({ type: SET_TIME_FRAME, payload: num });
  };
};
