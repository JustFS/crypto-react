export const SET_COINS_DATA = "SET_COINS_DATA";
export const UPDATE_COINS_DATA = "UPDATE_COINS_DATA";

export const setCoinsData = (data) => {
  return (dispatch) => {
    return dispatch({ type: SET_COINS_DATA, payload: data });
  };
};

export const updateCoinsData = (data) => {
  return (dispatch) => {
    return dispatch({ type: UPDATE_COINS_DATA, payload: data });
  };
};
