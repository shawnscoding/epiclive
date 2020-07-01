export const mainActionTypes = {
  FETCH_RECORD_START: "FETCH_RECORD_START",
  FETCH_RECORD_SUCCESS: "FETCH_RECORD_SUCCESS",
  CREATE_RECORD_START: "CREATE_RECORD_START",
  CREATE_RECORD_SUCCESS: "CREATE_RECORD_SUCCESS",
  DELETE_RECORD_START: "DELETE_RECORD_START",
  DELETE_RECORD_SUCCESS: "DELETE_RECORD_SUCCESS",
  FETCH_RECORD_TO_EDIT_START: "FETCH_RECORD_TO_EDIT_START",
  FETCH_RECORD_TO_EDIT_SUCCESS: "FETCH_RECORD_TO_EDIT_SUCCESS",
  UPDATE_RECORD_START: "UPDATE_RECORD_START",
  UPDATE_RECORD_SUCCESS: "UPDATE_RECORD_SUCCESS",
  CLEAR_EDIT_AND_CREATE: "CLEAR_EDIT_AND_CREATE",
  GET_CURRENT_CATEGORY: "GET_CURRENT_CATEGORY",
  RANK_FETCH_SUCCESS: "RANK_FETCH_SUCCESS",
};

export const clearTableOnRouteChange = () => ({
  type: mainActionTypes.CLEAR_EDIT_AND_CREATE,
});

export const fetchRecordStart = (payload) => ({
  type: mainActionTypes.FETCH_RECORD_START,
  payload: payload,
});

export const fetchRecordSuccess = (record) => ({
  type: mainActionTypes.FETCH_RECORD_SUCCESS,
  payload: record,
});

export const getCurrentCategory = (payload) => ({
  type: mainActionTypes.GET_CURRENT_CATEGORY,
  payload,
});

export const createRecordStart = (data) => ({
  type: mainActionTypes.CREATE_RECORD_START,
  payload: data,
});

export const createRecordSuccess = (record) => ({
  type: mainActionTypes.CREATE_RECORD_SUCCESS,
  payload: record,
});

export const deleteRecordStart = (record) => ({
  type: mainActionTypes.DELETE_RECORD_START,
  payload: record,
});

export const deleteRecordSuccess = (record) => ({
  type: mainActionTypes.DELETE_RECORD_SUCCESS,
  payload: record,
});

export const fetchRecordToEditStart = (payload) => ({
  type: mainActionTypes.FETCH_RECORD_TO_EDIT_START,
  payload,
});

export const fetchRecordToEditSuccess = (payload) => ({
  type: mainActionTypes.FETCH_RECORD_TO_EDIT_SUCCESS,
  payload,
});

export const updateRecordStart = (record) => ({
  type: mainActionTypes.UPDATE_RECORD_START,
  payload: record,
});

export const updateRecordSuccess = (record) => ({
  type: mainActionTypes.UPDATE_RECORD_SUCCESS,
  payload: record,
});


export const rankFetchSuccess = (payload) => ({
  type: mainActionTypes.RANK_FETCH_SUCCESS,
  payload,
});
