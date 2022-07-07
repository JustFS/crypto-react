import { SET_COINS_DATA } from "../actions/coinsData.action";
import { UPDATE_COINS_DATA } from "../actions/coinsData.action";

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COINS_DATA:
      return action.payload;
    case UPDATE_COINS_DATA:
      return state.map((coin) => {
        if (coin.id === action.payload[0]) {
          return {
            ...coin,
            signal: [
              coin.current_price / action.payload[1],
              coin.current_price / action.payload[2],
            ],
          };
        } else return coin;
      });
    default:
      return state;
  }
}
