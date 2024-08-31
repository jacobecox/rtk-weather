import { combineReducers } from "redux";
import searchReducer from "./slices/search";
import locationsReducer from "./slices/locations";

const rootReducer = combineReducers({
  search: searchReducer,
  location: locationsReducer,
});

export default rootReducer;
