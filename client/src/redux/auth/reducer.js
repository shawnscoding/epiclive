import { authActionTypes } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  error: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authActionTypes.USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    case authActionTypes.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };

    case authActionTypes.USER_LOGIN_FAILURE:
    case authActionTypes.USER_LOGOUT:
    case authActionTypes.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default auth;
