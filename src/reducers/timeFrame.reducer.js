import { SET_TIME_FRAME } from "../actions/timeFrame.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIME_FRAME:
      return action.payload;
    default:
      return state;
  }
}
