import { contentActionTypes } from "./actions";
import { addBooleanToArr } from "../helper";

const initialState = {
  columnNames: null,
  recordArray: null,
  clLength: null,
  selectedName_1: null,
  selectedId_1: null,
  sort: null,
};

const search = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case contentActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        recordArray: addBooleanToArr(payload.recordArray),
        columnNames: payload.columnNames,
        clLength: payload.clLength,
        sort: payload.sort,
      };
    case contentActionTypes.STORE_SELECTED_ID_AMD_NAME:
      return {
        ...state,
        selectedName_1: payload.selectedName,
        selectedId_1: payload.selectedId,
      };
    case contentActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        columnNames: null,
        recordArray: null,
        clLength: null,
        selectedName_1: null,
        selectedId_1: null,
        sort: null,
      };
    default:
      return state;
  }
};

export default search;
