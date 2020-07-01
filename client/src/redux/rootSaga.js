import { all, call } from "redux-saga/effects";
import { authSaga } from "./auth/saga";
import { mainSaga } from "./main/saga";
import { searchSaga } from "./search/saga";
import { multipleTables } from "./multipleTables/sagas";

export default function* rootSage() {
  yield all([
    call(authSaga),
    call(mainSaga),
    call(searchSaga),
    call(multipleTables),
  ]);
}
