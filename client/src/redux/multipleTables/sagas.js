import { multipleTablesActionTypes } from "./actions";
import { fetchFromMultipleTablesSuccess, fetchFailure } from "./actions";
import { toggleAlertModal } from "./../modal/actions";
import { all, call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { createRecordSuccess } from "../main/actions";
import { mapColumnNamesForNewTable } from "./../helper";

export function* insert({ payload }) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { form, category } = payload;
    const id_1 = yield select((state) => state.search.selectedId_1);
    const artist_list = yield select((state) => state.list.artistListRight);
    const genre_list = yield select((state) => state.list.genreListRight);
    form["contentForm"].category_id = id_1.toString();
    form["contentForm"].genre_list = genre_list.toString();
    form["contentForm"].artist_list = artist_list.toString();

    const result = yield axios.post(
      `/api/manipulateMultipleTables/${category}/`,
      form,
      config
    );

    const record = result.data;
    const clLength = Object.keys(record).length;

    let columnNames = [];
    for (let key in record) {
      columnNames.push({ name: key, fetch: false });
    }
    console.log(result, "result");

    yield put(createRecordSuccess({ columnNames, record, clLength }));
  } catch (err) {
    if (err.response.data.errors) {
      yield put(toggleAlertModal(err.response.data.errors));
    }
    if (err.response) {
      yield put(
        toggleAlertModal([
          { message: "something wrong in server", type: "warning" },
        ])
      );
    }
    yield put(fetchFailure(err));
  }
}

export function* fetch({ payload }) {
  try {
    const { route, id } = payload;
    const splittedRoute = route.split(".");

    const result = yield axios.get(
      `/api/manipulateMultipleTables/${splittedRoute[0]}/${id}`
    );
    console.log("-----------");
    console.log(result, "result");
    // @@ todo,   fetch setvod and setfile image below,
    const { content, setImage, setImageMetaData } = result.data;
    const contentObj = content[0];

    for (let property in contentObj) {
      if (contentObj[property] === null) {
        contentObj[property] = "";
      }
    }

    const clLength = Object.keys(setImage[0]).length;
    console.log(setImageMetaData, "ddd");
    const child_1_column_names = mapColumnNamesForNewTable(setImageMetaData);

    // this task is for new table

    yield put(
      fetchFromMultipleTablesSuccess({
        parant: contentObj,
        child_1: setImage,
        child_1_length: clLength,
        child_1_column_names: child_1_column_names,
      })
    );
  } catch (err) {
    if (err.response.data.errors) {
      yield put(toggleAlertModal(err.response.data.errors));
    }
    if (err.response.staus === 404) {
      yield put(
        toggleAlertModal([
          { message: "something wrong in server", type: "warning" },
        ])
      );
    }
    yield put(fetchFailure(err));
  }
}

export function* onFetch() {
  yield takeLatest(multipleTablesActionTypes.FETCH_START, fetch);
}

export function* onInsert() {
  yield takeLatest(multipleTablesActionTypes.INSERT_START, insert);
}

// compose
export function* multipleTables() {
  yield all([call(onFetch), call(onInsert)]);
}
