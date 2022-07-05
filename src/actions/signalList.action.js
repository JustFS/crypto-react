export const SET_SIGNAL_LIST = "SET_SIGNAL_LIST";

export const setSignalList = (list) => {
  return (dispatch) => {
    return dispatch({ type: SET_SIGNAL_LIST, payload: list });
  };
};
