import { SET_SIGNAL_LIST } from "../actions/signalList.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIGNAL_LIST:
      return action.payload;
    default:
      return state;
  }
}
