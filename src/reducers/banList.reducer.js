import { SET_BANLIST_DISPLAY } from "../actions/banList.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BANLIST_DISPLAY:
      return action.payload;
    default:
      return state;
  }
}
