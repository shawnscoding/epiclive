export const contentActionTypes = {
  SEARCH_SUCCESS: "SEARCH_SUCCESS",
  SEARCH_START: "SEARCH_START",
  SEARCH_FAILURE: "SEARCH_FAILURE",
  STORE_SELECTED_ID_AMD_NAME: "STORE_SELECTED_ID_AMD_NAME",
};

export const searchStart = (payload) => ({
  type: contentActionTypes.SEARCH_START,
  payload,
});

export const searchSuccess = (payload) => ({
  type: contentActionTypes.SEARCH_SUCCESS,
  payload,
});

export const storeSelectedIdAndName = (payload) => ({
  type: contentActionTypes.STORE_SELECTED_ID_AMD_NAME,
  payload,
});

export const searchFailure = () => ({
  type: contentActionTypes.SEARCH_FAILURE,
});
