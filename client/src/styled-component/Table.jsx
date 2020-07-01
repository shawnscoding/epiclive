import styled, { css } from "styled-components";
import { renderCells } from "../utils/Helper";
import {
  textPrimary,
  primary,
  primaryHover,
  primaryDark_2,
  tableBorder,
} from "./Variable";

export const SearchBarBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const SearchBar = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 60px 300px 60px;
  div {
  }
`;

export const TableContainer = styled.table`
  /* display: grid;
  flex-direction: column; */
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const ColumnNames = styled.thead`
  /* border-top: 2px solid ${tableBorder};
  border-right: 2px solid ${tableBorder};
  border-left: 2px solid ${tableBorder};
  border-bottom: 1px solid ${tableBorder}; */
  tr {
    /* display: flex; */
    display: grid;
    grid-template-columns: ${(props) => renderCells(props.clLength)};
  }

  th:first-child {
    color: ${textPrimary};
    font-size: 1.2rem;
    background: ${primary};
    padding: 12px 0 12px 5px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  th {
    color: ${textPrimary};
    font-size: 1.2rem;
    background: ${primary};
    padding: 12px 0 12px 5px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justify};
  }
`;

export const ColumnNamesSecondary = styled.thead`
  border-bottom: 2px solid ${primaryHover};
  tr {
    /* display: flex; */
    display: grid;
    grid-template-columns: ${(props) => renderCells(props.clLength)};
  }

  th {
    color: ${textPrimary};
    font-size: 1.2rem;
    background: ${primary};
    padding: 12px 0;
    flex-grow: 1;
  }
`;
export const Test = styled.tbody`
  tr:nth-child(even) {
    background: #eee;
  }
  tr:nth-child(odd) {
    background: #fff;
  }
`;

export const TableBody = styled.tr`
  display: grid;
  grid-template-columns: ${(props) => renderCells(props.clLength)};
  margin-bottom: ${(props) => props.mb};

  td:first-child {
    border: ${(props) => (props.br ? props.br : null)};
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin: 0 10px;
    }
    svg {
      color: #3e3e3e;
      font-size: 1.9rem;
    }
  }
  td {
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justify};
    font-size: 1.2rem;
    border: ${(props) => (props.br ? props.br : null)};
    padding: 12px 0 12px 5px;
  }
`;

export const TableBodySecondary = styled.tr`
  display: grid;
  grid-template-columns: ${(props) => renderCells(props.clLength)};
  margin-bottom: ${(props) => props.mb};
  border-bottom: 1px solid #d2d2d2;

  td {
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.flex};
    font-size: 1.2rem;
    border: ${(props) => (props.br ? props.br : null)};
    padding: 12px 0 12px 5px;
  }
`;
