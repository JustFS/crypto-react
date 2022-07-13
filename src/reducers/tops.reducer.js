import { SET_TOP_THOUSAND } from "../actions/tops.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOP_THOUSAND:
      return action.payload;
    default:
      return state;
  }
}
