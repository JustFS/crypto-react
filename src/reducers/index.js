import { combineReducers } from "redux";
import allCoinsReducer from "./allCoins.reducer";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducer";

export default combineReducers({
  allCoinsReducer,
  stableReducer,
  listReducer,
});
