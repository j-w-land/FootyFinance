import { combineReducers } from "redux";
import clubs from "./clubs";
import errors from "./errors";
import fs_data from "./fs_data";

export default combineReducers({
  clubs,
  errors,
  fs_data,
});
