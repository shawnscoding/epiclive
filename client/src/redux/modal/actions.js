export const modalActionTypes = {
  TOGGLE_HELP_MODAL: "TOGGLE_HELP_MODAL",
  TOGGLE_CREATE_MODAL: "TOGGLE_CREATE_MODAL",
  TOGGLE_EDIT_MODAL: "TOGGLE_EDIT_MODAL",
  TOGGLE_SORT_MODAL: "TOGGLE_SORT_MODAL",
  SET_DATA_TO_EDIT_MODAL: "SET_DATA_TO_EDIT_MODAL",
  TOGGLE_ALERT_MODAL: "TOGGLE_ALERT_MODAL",
  TOGGLE_SEARCH_MODAL: "TOGGLE_SEARCH_MODAL",
  GIVE_CATEGORY_TO_POPUP: "GIVE_CATEGORY_TO_POPUP",
};

export const toggleHelpModal = () => ({
  type: modalActionTypes.TOGGLE_HELP_MODAL,
});

export const toggleCreateModal = () => ({
  type: modalActionTypes.TOGGLE_CREATE_MODAL,
});

export const toggleEditModal = () => ({
  type: modalActionTypes.TOGGLE_EDIT_MODAL,
});

export const toggleSortModal = () => ({
  type: modalActionTypes.TOGGLE_SORT_MODAL,
});

export const setDataToEditModal = (payload) => ({
  type: modalActionTypes.SET_DATA_TO_EDIT_MODAL,
  payload,
});

export const toggleAlertModal = (payload) => ({
  type: modalActionTypes.TOGGLE_ALERT_MODAL,
  payload,
});

export const toggleSearchModal = () => ({
  type: modalActionTypes.TOGGLE_SEARCH_MODAL,
});

export const giveCategoryToPopup = (payload) => ({
  type: modalActionTypes.GIVE_CATEGORY_TO_POPUP,
  payload,
});
