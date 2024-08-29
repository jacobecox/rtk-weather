import { combineReducers } from "redux";
import locationReducer from "./slices/location";

const rootReducer = combineReducers({
  location: locationReducer,
  // weather: weatherReducer
});

export default rootReducer;
