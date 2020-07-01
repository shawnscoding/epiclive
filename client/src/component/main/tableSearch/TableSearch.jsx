import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleCreateModal,
  toggleEditModal,
} from '../../../redux/modal/actions';
import { fetchRecordStart } from '../../../redux/main/actions';
import SubHeader from '../../header/SubHeader';
import TableComponent from './../../table/TableComponent';
import TableTypeThree from '../../table/TableTypeThree';
import SortModal from './../../Modals/sort/SortModal';
import {
  fetchRecordToEditStart,
  deleteRecordStart,
} from './../../../redux/main/actions';

const TableSearch = ({
  fetchRecord,
  data,
  columnNames,
  toggleCreate,
  toggleEdit,
  history,
  totalLength,
  deleteRecordStart,
  category,
  loading,
  fetchRecordToEditStart,
  clLength,
}) => {
  const [input, setInput] = useState('');
  // @@ code_review_2

  const handleSeachbarChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRecord({ params: input, category, sort: sortForm, endNum });
  };

  const handleFetchMoreRecords = () => {
    const last = endNum + 10;
    setEndNum(last);
    fetchRecord({ params: input, category, sort: sortForm, endNum: last });
  };

  const handleEditClick = (record) => {
    if (category === 'content') {
      history.push(`/dashboard/mbc/content.details/${record.id}`);
    } else {
      fetchRecordToEditStart({ id: record.id, category });
      toggleEdit();
    }
  };

  const handleClickCreate = () => {
    toggleCreate();
  };

  const handleDelete = (id) => {
    if (!id) return;
    deleteRecordStart({ id, category });
  };

  const [sortForm, setSortForm] = useState({
    column: '',
    direction: 'ascending',
    isNullLast: 'last',
  });

  // const [ startNum, setStartNum ] = useState(1)
  const [endNum, setEndNum] = useState(10);

  useEffect(() => {
    if (category) {
      setSortForm({
        column: '',
        direction: 'ascending',
        isNullLast: 'last',
      });
      fetchRecord({ params: input, category, sort: sortForm, endNum });
    }
  }, [category]);
  return (
    <React.Fragment>
      <SubHeader
        showButton={true}
        handleSearchSubmit={handleSearchSubmit}
        handleSeachbarChange={handleSeachbarChange}
        input={input}
        category={category}
        showSearchbar={true}
        handleClickCreate={handleClickCreate}
      />

      {data && (
        // <TableComponent
        //   handleEditClick={handleEditClick}
        //   data={data}
        //   columnNames={columnNames}
        //   clLength={clLength}
        //   handleDelete={handleDelete}
        // />

        <TableTypeThree
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          endNum={endNum}
          setEndNum={setEndNum}
          rows={data}
          loading={loading}
          columns={columnNames}
          totalLength={totalLength}
          handleFetchMoreRecords={handleFetchMoreRecords}
        />
      )}
      {data && (
        <SortModal
          state={sortForm}
          setState={setSortForm}
          input={input}
          endNum={endNum}
          loading={loading}
          fetchRecord={fetchRecord}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.main.data,
  columnNames: state.main.columnNames,
  loading: state.main.loading,
  totalLength: state.main.totalLength,
  category: state.main.category,
  clLength: state.main.clLength,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecord: (payload) => dispatch(fetchRecordStart(payload)),
  toggleCreate: () => dispatch(toggleCreateModal()),
  toggleEdit: () => dispatch(toggleEditModal()),

  fetchRecordToEditStart: (id) => dispatch(fetchRecordToEditStart(id)),

  deleteRecordStart: (id) => dispatch(deleteRecordStart(id)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableSearch)
);
