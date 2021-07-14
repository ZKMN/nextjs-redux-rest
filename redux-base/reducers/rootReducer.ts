import { combineReducers } from "redux";
import login from "./login";
import error from "./error";

const rootReducer = () => combineReducers({
  login,
  error,
});

export default rootReducer;
