import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const TableTypeTwo = ({ records, columns, category, content_id }) => {
  const [state, setState] = React.useState({
    columns,
    records,
  });
  return (
    <MaterialTable
      title="Set Image"
      columns={state.columns}
      data={state.records}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            newData.content_id = content_id;

            const result = axios.post(`/api/${category}/`, newData, config);

            resolve(result);
          })
            .then((record) => {
              setState((prevState) => {
                const records = [...prevState.records, record.data];
                return { ...prevState, records };
              });
            })
            .catch((err) => console.log(err)),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            const result = axios.put(`/api/${category}`, newData, config);
            resolve(result);
          })
            .then((record) => {
              if (oldData) {
                setState((prevState) => {
                  const records = [...prevState.records];
                  records[records.indexOf(oldData)] = newData;
                  return { ...prevState, records };
                });
              }
            })
            .catch((err) => console.log(err)),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            const result = axios.delete(`/api/${category}/${oldData.id}`);
            resolve(result);
          })
            .then((record) => {
              setState((prevState) => {
                const records = [...prevState.records];
                records.splice(records.indexOf(oldData), 1);
                return { ...prevState, records };
              });
            })
            .catch((err) => console.log(err)),
      }}
    />
  );
};

export default TableTypeTwo;
