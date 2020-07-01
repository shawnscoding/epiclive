import { modalActionTypes } from "./actions";

const initialState = {
  openHelp: false,
  openCreate: false,
  openEdit: false,
  openSort: false,
  openSearch: false,
  alert: [],
  popupCategory: null,
};

const modal = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case modalActionTypes.TOGGLE_HELP_MODAL:
      return { ...state, openHelp: !state.openHelp };
    case modalActionTypes.TOGGLE_CREATE_MODAL:
      return { ...state, openCreate: !state.openCreate };
    case modalActionTypes.TOGGLE_EDIT_MODAL:
      return { ...state, openEdit: !state.openEdit };
    case modalActionTypes.TOGGLE_SORT_MODAL:
      return { ...state, openSort: !state.openSort };
    case modalActionTypes.TOGGLE_SEARCH_MODAL:
      return { ...state, openSearch: !state.openSearch };
    case modalActionTypes.TOGGLE_ALERT_MODAL:
      return {
        ...state,
        alert: payload,
      };
    case modalActionTypes.GIVE_CATEGORY_TO_POPUP:
      return { ...state, popupCategory: payload };
    default:
      return state;
  }
};

export default modal;
