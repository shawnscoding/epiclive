export const multipleTablesActionTypes = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  ACTION_FAILURE: "ACTION_FAILURE",
  INSERT_START: "INSERT_START",
  INSERT_SUCCESS: "INSERT_SUCCESS",
};

export const fetchFromMultipleTablesStart = (payload) => ({
  type: multipleTablesActionTypes.FETCH_START,
  payload,
});

export const fetchFromMultipleTablesSuccess = (payload) => ({
  type: multipleTablesActionTypes.FETCH_SUCCESS,
  payload,
});

export const fetchFailure = (payload) => ({
  type: multipleTablesActionTypes.ACTION_FAILURE,
  payload,
});

export const insertToMultipleTablesStart = (payload) => ({
  type: multipleTablesActionTypes.INSERT_START,
  payload,
});

export const insertToMultipleTablesSuccess = (payload) => ({
  type: multipleTablesActionTypes.INSERT_SUCCESS,
  payload,
});
