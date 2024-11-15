import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.reducer";
import banListReducer from "./banList.reducer";
import signalListReducer from "./signalList.reducer";
import coinsDataReducer from "./coinsData.reducer";
import topThousandReducer from "./tops.reducer";
import timeFrameReducer from "./timeFrame.reducer";

export default combineReducers({
  stableReducer,
  listReducer,
  banListReducer,
  signalListReducer,
  coinsDataReducer,
  topThousandReducer,
  timeFrameReducer,
});
