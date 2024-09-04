import { combineReducers } from "redux";
import locationsReducer from "./slices/locations";

const rootReducer = combineReducers({
  location: locationsReducer,
});

export default rootReducer;
