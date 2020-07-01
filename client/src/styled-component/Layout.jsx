import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";
import { tableBorder } from "./Variable";

export const FlexStart = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

export const FlexEnd = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

export const SpaceBetween = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.bg};
  color: ${(props) => props.cr};
  width: ${(props) => props.width};
`;

export const SpaceAround = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: ${(props) => (props.align ? props.align : "center")};

  background-color: ${(props) => props.bg};
  color: ${(props) => props.cr};
  width: ${(props) => props.width};
`;

export const FlexCenter = styled(Box)`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.bg};

  flex-wrap: ${(props) => props.wrap};
`;

export const Form = styled.form`
  margin-bottom: ${(props) => props.mb};
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.p};
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

export const ColumnDirection = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bg};

  align-items: space-between;
  justify-content: center;
  width: ${(props) => props.width};
`;

export const BasicForm = styled.form`
  width: ${(props) => props.width};
`;

export const FlexStartWithBorder = styled(FlexStart)`
  border-top: 1px solid ${tableBorder};
  border-right: 2px solid ${tableBorder};
  border-left: 2px solid ${tableBorder};
  border-bottom: 2px solid ${tableBorder};
`;

export const FlexEquallyGrow = styled(Box)`
  display: flex;
  div {
    flex-grow: 1;
  }
`;

export const GridWithMargin = styled(Grid)`
  margin-bottom: 1.4rem;
`;
