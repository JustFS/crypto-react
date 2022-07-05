import { SET_STABLE_STATE } from "../actions/stable.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STABLE_STATE:
      window.localStorage.stableChoice = action.payload;
      return action.payload;
    default:
      return state;
  }
}
