export const authActionTypes = {
  CHECK_IF_USER_LOGIN: "CHECK_IF_USER_LOGIN",
  USER_LOGIN_START: "USER_LOGIN_START",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",
  USER_LOGOUT: "USER_LOGOUT",
  USER_LOAD_SUCCESS: "USER_LOAD_SUCCESS",
};

export const checkIfUserLogin = () => ({
  type: authActionTypes.CHECK_IF_USER_LOGIN,
});

export const userLoginStart = (user) => ({
  type: authActionTypes.USER_LOGIN_START,
  payload: user,
});

export const userLoginSuccess = (user) => ({
  type: authActionTypes.USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLoginfailure = (error) => ({
  type: authActionTypes.USER_LOGIN_FAILURE,
  payload: error,
});

export const userLogOut = () => ({
  type: authActionTypes.USER_LOGOUT,
});

export const userLoadSuccess = (payload) => ({
  type: authActionTypes.USER_LOAD_SUCCESS,
  payload,
});
