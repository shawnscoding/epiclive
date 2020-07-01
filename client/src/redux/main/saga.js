import { all, select, call, takeLatest, put } from 'redux-saga/effects';
import {
  mainActionTypes,
  fetchRecordSuccess,
  createRecordSuccess,
  deleteRecordSuccess,
  updateRecordSuccess,
  fetchRecordToEditSuccess,
  rankFetchSuccess,
} from './actions';
import { toggleAlertModal } from '../modal/actions';
import axios from 'axios';
import { checkHasDate } from './../helper';
import { mapColumnNamesForFilter } from '../../utils/Helper';
import { toggleSortModal } from './../modal/actions';
import { checkHasSort } from './../../utils/Helper';

// @@ coming value: object
export function* createRecord({ payload }) {
  try {
    const { form, category } = payload;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // add switch statement

    console.log('payload');
    console.log(form, category);

    const result = yield axios.post(`/api/${category}/`, form, config);
    if (!result.data) return;

    yield put(
      toggleAlertModal([
        {
          message: 'created successfully',
          alerttype: 'success',
        },
      ])
    );

    const record = result.data;
    const clLength = Object.keys(record).length;

    let columnNames = [];
    for (let key in record) {
      columnNames.push({ name: key, fetch: false });
    }

    yield put(createRecordSuccess({ columnNames, record, clLength }));

    return;
  } catch (err) {
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
// api
// @@ coming value: array or object
export function* fetchDataFromDb({ payload }) {
  try {
    const { params, category, sort, endNum } = payload;

    // !! need to modify sort
    console.log(sort, category, 'sorodasoasd o');
    const sortBy = checkHasSort(sort, category);
    const { startDate, endDate } = checkHasDate(payload);

    const mainCNListRight = yield select((state) => state.list.mainCNListRight);
    const openSort = yield select((state) => state.modal.openSort);

    // !! can not use uppercase here
    const config = {
      headers: {
        'Content-Type': 'application/json',
        column_names: JSON.stringify(mainCNListRight),
        sort: JSON.stringify({ ...sortBy }),
        lastrecord: JSON.stringify(endNum),
        start_date: startDate,
        end_date: endDate,
      },
    };

    let ctg = category.toLowerCase();
    console.log(ctg);
    let res;
    if (params !== '' && params !== undefined) {
      res = yield axios.get(`/api/${ctg}/${params}`, config);
    } else {
      res = yield axios.get(`/api/${ctg}/`, config);
    }
    const { rows, metaData, totalLength } = res.data;

    //  if rank, do only this block
    if (category === 'statistics.rank') {
      const rankRecord = res.data;

      yield put(rankFetchSuccess({ rankRecord }));

      return;
    }

    const clLength = Object.keys(rows[0]).length;
    const columnNames = mapColumnNamesForFilter(metaData);
    const record = rows;

    yield put(
      fetchRecordSuccess({ totalLength, record, columnNames, clLength })
    );
    if (openSort) {
      yield put(toggleSortModal());
    }
  } catch (err) {
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

export function* deleteRecord({ payload }) {
  const records = yield select((state) => state.main.data);
  let { id, category } = payload;

  try {
    if (window.confirm('Are you sure? This can Not be undone!')) {
      const res = yield axios.delete(`/api/${category}/${id}`);
      // @@  returns deleted Id
      let newRecord = records.filter((rec) => rec.id !== res.data);
      yield put(deleteRecordSuccess({ records: newRecord }));

      yield put(
        toggleAlertModal([
          {
            message: 'deleted successfully',
            alerttype: null,
          },
        ])
      );
    }
  } catch (err) {
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

export function* updateRecord({ payload }) {
  try {
    if (window.confirm('Are you sure? previous record will be removed!')) {
      const records = yield select((state) => state.main.data);
      const { id, category, form } = payload;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = yield axios.put(`/api/${category}/${id}`, form, config);
      const data = res.data;
      for (let i = 0; i < records.length; i++) {
        if (records[i].id === data.id) {
          records[i] = data;
        }
      }

      yield put(updateRecordSuccess({ records: records }));

      yield put(
        toggleAlertModal([
          {
            message: 'updated successfully',
            alerttype: 'success',
          },
        ])
      );
    }
  } catch (err) {
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

export function* fetchRecordToEdit({ payload }) {
  try {
    const { category, id } = payload;

    const result = yield axios.get(`/api/getSingleRecord/${category}/${id}`);
    const row = result.data.rows[0];
    for (let property in row) {
      if (row[property] === null) {
        row[property] = '';
      }
    }
    yield put(fetchRecordToEditSuccess({ record: row }));
  } catch (err) {
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

// listeners
export function* onFetchData() {
  yield takeLatest(mainActionTypes.FETCH_RECORD_START, fetchDataFromDb);
}

export function* onCreateRecord() {
  yield takeLatest(mainActionTypes.CREATE_RECORD_START, createRecord);
}

export function* onDeleteRecord() {
  yield takeLatest(mainActionTypes.DELETE_RECORD_START, deleteRecord);
}

export function* onUpdateRecord() {
  yield takeLatest(mainActionTypes.UPDATE_RECORD_START, updateRecord);
}

export function* onFetchRecordToEdit() {
  yield takeLatest(
    mainActionTypes.FETCH_RECORD_TO_EDIT_START,
    fetchRecordToEdit
  );
}

// compose
export function* mainSaga() {
  yield all([
    call(onFetchData),
    call(onUpdateRecord),
    call(onDeleteRecord),
    call(onCreateRecord),
    call(onFetchRecordToEdit),
  ]);
}
