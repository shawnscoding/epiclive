import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { contentActionTypes, searchFailure, searchSuccess } from './actions';
import { toggleAlertModal, toggleSearchModal } from '../modal/actions';
import { mapColumnNamesForFilter } from '../../utils/Helper';
import { checkHasSort } from './../../utils/Helper';

// api
function* fetchDataFromDb({ payload }) {
  try {
    const { category, params, sort } = payload;

    const checkedSort = checkHasSort(sort);
    const config = {
      headers: {
        'Content-Type': 'application.json',
        sort: checkedSort,
      },
    };

    let res;
    if (params !== undefined) {
      res = yield axios.get(`/api/search/${category}/${params}`, config);
    } else {
      res = yield axios.get(`/api/search/${category}/`, config);
    }

    const { rows, metaData, servedSort } = res.data;

    const clLength = Object.keys(rows[0]).length;
    const columnNames = mapColumnNamesForFilter(metaData);
    const recordArray = rows;

    if (servedSort === undefined) {
      yield put(
        searchSuccess({ recordArray, columnNames, clLength, sort: null })
      );
    } else {
      yield put(
        searchSuccess({ recordArray, columnNames, clLength, sort: servedSort })
      );
    }
  } catch (err) {
    yield put(searchFailure());
    yield put(toggleSearchModal());
    if (err.response.data.errors) {
      yield put(toggleAlertModal(err.response.data.errors));
    }
    if (err.response.staus === 404) {
      yield put(
        toggleAlertModal([
          { message: 'something wrong in server', type: 'warning' },
        ])
      );
    }
  }
}

// compose
function* onSearchStart() {
  yield takeLatest(contentActionTypes.SEARCH_START, fetchDataFromDb);
}

export function* searchSaga() {
  yield all([call(onSearchStart)]);
}
