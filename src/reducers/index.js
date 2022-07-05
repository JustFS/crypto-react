import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducer";
import banListReducer from "./banList.reducer";
import signalListReducer from "./signalList.reducer";

export default combineReducers({
  stableReducer,
  listReducer,
  banListReducer,
  signalListReducer,
});
