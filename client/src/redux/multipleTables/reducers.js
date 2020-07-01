import { multipleTablesActionTypes } from "./actions";

const initialState = {
  parant: null,
  child_1: null,
  child_1_length: null,
  child_1_column_names: null,
  child_2: null,
  child_2_length: null,
  loading: null,
};

const multiTables = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case multipleTablesActionTypes.INSERT_START:
      return {
        ...state,
        loading: true,
      };
    case multipleTablesActionTypes.FETCH_SUCCESS:
    case multipleTablesActionTypes.INSERT_START:
      return {
        ...state,
        parant: payload.parant,
        child_1: payload.child_1,
        child_1_length: payload.child_1_length,
        child_1_column_names: payload.child_1_column_names,
        child_2: payload.child_2,
        child_2_length: payload.child_2_length,
        loading: false,
      };
    case multipleTablesActionTypes.ACTION_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default multiTables;
