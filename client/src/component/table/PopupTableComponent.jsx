import React from "react";
import { BasixAni } from "../../styled-component/Animation";
import {
  TableContainer,
  ColumnNames,
  TableBody,
  Test,
} from "../../styled-component/Table";
import { renderArrWithOutId } from "../../utils/Helper";
import { FlexStart } from "../../styled-component/Layout";
import { HeadThree } from "../../styled-component/Text";
import { textPrimary } from "../../styled-component/Variable";
import { v4 as uuid4 } from "uuid";
import { renderObjWithOutId } from "./../../utils/Helper";
import { primary } from "./../../styled-component/Variable";

const PopupTableComponent = ({
  data,
  handleCheckBoxChange,
  columnNames,
  clLength,
  setRecords,
  selectedName,
  recordArray,
  sort,
  handleSearchSubmitWithSort,
}) => {
  React.useEffect(() => {
    if (recordArray) {
      setRecords(recordArray);
    }
  }, [recordArray]);

  const renderIfLessThanTen = (data, clLength) => {
    if (data.length >= 10) return;
    let clArr = [];
    let l = clLength - 1;
    // substract one due to the id
    let x = 0;
    while (x < l) {
      clArr.push(<td style={{ color: "#eee" }}>dd</td>);
      x++;
    }

    let i = data.length;
    let recordArr = [];

    while (i < 10) {
      recordArr.push("");
      i++;
    }

    return recordArr.map((a) => (
      <TableBody justify="flex-start" clLength={clLength} key={uuid4()}>
        {clArr.map((ar) => ar)}
      </TableBody>
    ));
  };

  if (!data) return <div></div>;
  return (
    <BasixAni>
      <TableContainer cellspacing="0">
        <ColumnNames justify="flex-start" clLength={clLength}>
          <tr>
            <th> </th>
            {renderArrWithOutId(columnNames, handleSearchSubmitWithSort, sort)}
          </tr>
        </ColumnNames>
        <Test>
          {data &&
            data
              .map((record) => (
                <React.Fragment>
                  <TableBody
                    justify="flex-start"
                    clLength={clLength}
                    key={uuid4()}
                  >
                    <td>
                      <input
                        defaultChecked={record.checked}
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        onChange={() =>
                          handleCheckBoxChange(record, record.checked)
                        }
                      />
                    </td>
                    {renderObjWithOutId(record)}
                  </TableBody>
                </React.Fragment>
              ))
              .slice(0, 10)}
          {renderIfLessThanTen(data, clLength)}
        </Test>
      </TableContainer>
      <FlexStart bg={`${primary}`} p={1.5}>
        <HeadThree color={textPrimary}>{selectedName}</HeadThree>
        <HeadThree color={textPrimary}>{data.length} row selected</HeadThree>
      </FlexStart>
    </BasixAni>
  );
};

export default PopupTableComponent;
