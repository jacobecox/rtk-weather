import { combineReducers } from "redux";
import locationsReducer from "./slices/locations";
import weatherReducer from "./slices/weather";

const rootReducer = combineReducers({
  location: locationsReducer,
  weather: weatherReducer,
});

export default rootReducer;
