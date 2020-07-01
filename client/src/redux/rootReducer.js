import { combineReducers } from "redux";
import auth from "./auth/reducer";
import modal from "./modal/reducer";
import main from "./main/reducer";
import search from "./search/reducer";
import list from "./list/reducers";
import multiTables from "./multipleTables/reducers";

const rootReducer = combineReducers({
  auth,
  modal,
  main,
  search,
  list,
  multiTables,
});

export default rootReducer;
