export const SET_TOP_THOUSAND = "SET_TOP_THOUSAND";

export const setTopThousand = (bool) => {
  return (dispatch) => {
    return dispatch({ type: SET_TOP_THOUSAND, payload: bool });
  };
};
