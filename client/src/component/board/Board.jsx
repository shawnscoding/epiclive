import React from "react";
import styled from "styled-components";
import { primaryDark } from "../../styled-component/Variable";
import { renderMain } from "../../utils/Helper";
import { Box } from "@material-ui/core";

const Container = styled(Box)`
  background: #fff;
  /* !to do  */
  border-top: 13px solid ${primaryDark};
  padding: 20px;
  grid-column: 3 / 14;
`;

const Board = ({ category }) => {
  return <Container>{renderMain(category)}</Container>;
};

export default Board;
