import { all, call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
  authActionTypes,
  userLoginSuccess,
  userLoginfailure,
  userLoadSuccess,
} from "./actions";

// api
export function* loadUser() {
  try {
    let token;
    if (localStorage.token) {
      console.log("called");
      token = localStorage.token;
    }

    const res = yield axios.get(`/api/auth/${token}`);

    yield put(userLoadSuccess({ user: res.data.user }));
  } catch (err) {
    if (err.response.data.errors) {
      const errors = err.response.data.errors;
      console.log(errors[0].message, "in sif");
    }
    console.log(err);
    yield put(userLoginfailure());
  }
}

export function* logUserIn({ payload }) {
  const { form, history } = payload;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(form);
  try {
    const res = yield axios.post("/api/auth/", body, config);
    if (res.data.token) {
      console.log("res");
      console.log(res.data.token);
      yield put(
        userLoginSuccess({ token: res.data.token, user: res.data.user })
      );
      history.push("/dashboard/mbc/home");
    }
  } catch (err) {
    if (err.response.data.errors) {
      const errors = err.response.data.errors;
      alert(errors[0].message);
    }
    put(userLoginfailure());
  }
}

// listeners

export function* onLoginUser() {
  yield takeLatest(authActionTypes.USER_LOGIN_START, logUserIn);
}

export function* onIfUserLoggedIn() {
  yield takeLatest(authActionTypes.CHECK_IF_USER_LOGIN, loadUser);
}

// compose

export function* authSaga() {
  yield all([call(onLoginUser), call(onIfUserLoggedIn)]);
}
