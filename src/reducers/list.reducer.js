import { SET_LIST_DISPLAY } from "../actions/list.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIST_DISPLAY:
      return action.payload;
    default:
      return state;
  }
}
