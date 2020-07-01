import React from "react";
import { BasixAni } from "../../styled-component/Animation";
import {
  TableContainer,
  ColumnNames,
  TableBody,
  Test,
} from "../../styled-component/Table";
import { renderObjWithOutId } from "../../utils/Helper";
import { FlexStart } from "../../styled-component/Layout";
import { HeadThree } from "../../styled-component/Text";
import { textPrimary } from "../../styled-component/Variable";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import Popper from "./../popper/Popper";
import { renderArrWithOutIdNormal } from "./../../utils/Helper";
import { StdDeleteForeverIcon } from "./../../styled-component/Icons";

const SdEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

const TableComponent = ({
  data,
  columnNames,
  clLength,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <BasixAni>
      <TableContainer cellspacing="0">
        <ColumnNames clLength={clLength}>
          <tr>
            <th>
              <Popper />
            </th>
            {renderArrWithOutIdNormal(columnNames)}
          </tr>
        </ColumnNames>
        <Test>
          {data &&
            data.map((record) => (
              <TableBody clLength={clLength} key={uuid4()}>
                <td>
                  <div>
                    <SdEditIcon
                      onClick={() => handleEditClick(record, columnNames)}
                    />
                  </div>
                  <div onClick={() => handleDelete(record.id)}>
                    <StdDeleteForeverIcon />
                  </div>
                </td>
                {renderObjWithOutId(record)}
              </TableBody>
            ))}
        </Test>
      </TableContainer>
      <FlexStart bg="#eee" p={1.5}>
        <HeadThree color={textPrimary}>{data.length} row selected</HeadThree>
      </FlexStart>
    </BasixAni>
  );
};

export default TableComponent;
