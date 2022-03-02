import { GET_ALL_COINS } from "../actions/coins.action";

const initialState = {};

export default function allCoinsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COINS:
      return action.payload;
    default:
      return state;
  }
}
