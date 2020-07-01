import { mainActionTypes } from "./actions";
import { multipleTablesActionTypes } from "./../multipleTables/actions";

const initialState = {
  totalLength: null,
  category: null,
  rankRecord: null,
  data: null,
  columnNames: null,
  clLength: null,
  loading: false,
  edit: {
    record: null,
  },
  create: {
    record: null,
  },
};

const main = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case mainActionTypes.FETCH_RECORD_START:
    case mainActionTypes.CREATE_RECORD_START:
    case mainActionTypes.DELETE_RECORD_START:
    case mainActionTypes.UPDATE_RECORD_START:
    case multipleTablesActionTypes.FETCH_START:
      return {
        ...state,
        loading: true, 
      };
    case mainActionTypes.FETCH_RECORD_SUCCESS:
      return {
        ...state,
        totalLength: payload.totalLength,
        data: payload.record,
        columnNames: payload.columnNames,
        clLength: payload.clLength,
        loading: false,
      };
    case mainActionTypes.RANK_FETCH_SUCCESS:
      return {
        ...state,
        rankRecord: payload.rankRecord,
        loading: false,
      };
    case mainActionTypes.CREATE_RECORD_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload.record],
        columnNames: payload.columnNames,
        clLength: payload.clLength,
        loading: false,
      };

    case mainActionTypes.DELETE_RECORD_SUCCESS:
      return {
        ...state,
        data: payload.records,
        edit: {
          record: null,
        },
        loading: false,
      };
    case mainActionTypes.FETCH_RECORD_TO_EDIT_SUCCESS:
      return {
        ...state,
        edit: {
          record: payload.record,
        },
        loading: false,
      };
    case mainActionTypes.GET_CURRENT_CATEGORY:
      return {
        ...state,
        category: payload.category,
      
      };

    case mainActionTypes.UPDATE_RECORD_SUCCESS:
      return {
        ...state,
        data: payload.records,
        edit: {
          record: null,
        },
        loading: false,
      };
    case mainActionTypes.CLEAR_EDIT_AND_CREATE:
      return {
        ...state,
        edit: {
          record: null,
        },
        create: {
          record: null,
        },
      };
    default:
      return state;
  }
};

export default main;
