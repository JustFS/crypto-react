export const SET_BANLIST_DISPLAY = "SET_BANLIST_DISPLAY";

export const setBanListDisplay = (bool) => {
  return (dispatch) => {
    return dispatch({ type: SET_BANLIST_DISPLAY, payload: bool });
  };
};
