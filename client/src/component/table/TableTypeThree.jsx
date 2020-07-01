import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Popper from './../popper/Popper';
import { CircularProgress } from '@material-ui/core';
// const columns = [
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
// ];
const CusEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

const CusDeleteForeverIcon = styled(DeleteForeverIcon)`
  cursor: pointer;
`;

const CusCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const IconBox = styled(TableCell)`
  display: flex;
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableTypeThree({
  handleEditClick,
  handleDelete,
  totalLength,
  rows,
  columns,
  loading,
  handleFetchMoreRecords,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    const required = (newPage + 1) * rowsPerPage;
    setPage(newPage);
    if (rows.length < required) {
      handleFetchMoreRecords();
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    if (rows.length < value) {
      handleFetchMoreRecords();
    }
    setRowsPerPage(value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const getCurrentRecords = (rows) => {
    const currentRows = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    return currentRows;
  };

  const addedColumns = [
    {
      name: 'settings',
      minWidth: 70,
    },
    ...columns,
  ];

  console.log(loading, 'loading');
  return (
    <Paper className={classes.root}>
      {loading && (
        <div style={{ position: 'relative' }}>
          <CusCircularProgress top='23rem' left='56rem' />
        </div>
      )}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {addedColumns.map((column) => {
                if (column.name === 'settings') {
                  return (
                    <React.Fragment key={column.name}>
                      <TableCell>
                        <Popper />
                      </TableCell>
                    </React.Fragment>
                  );
                } else if (column.name === 'id') {
                  return <React.Fragment key={column.name} />;
                } else if (column.name === 'R') {
                  return <React.Fragment key={column.name} />;
                } else {
                  return (
                    <TableCell
                      key={column.name}
                      //   align={column.align}
                      style={{
                        minWidth: column.minWidth ? column.minWidth : 170,
                      }}
                    >
                      {column.name}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentRecords(rows).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {addedColumns.map((column) => {
                    if (column.name === 'id') {
                      return <React.Fragment key={column.name} />;
                    } else if (column.name === 'settings') {
                      return (
                        <IconBox key={column.name}>
                          <div>
                            <CusEditIcon
                              onClick={() => handleEditClick(row, columns)}
                            />
                          </div>
                          <div onClick={() => handleDelete(row.id)}>
                            <CusDeleteForeverIcon />
                          </div>
                        </IconBox>
                      );
                    } else if (column.name === 'R') {
                      return <React.Fragment key={column.name} />;
                    } else {
                      const value = row[column.name];
                      return (
                        <TableCell key={column.name} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={totalLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
