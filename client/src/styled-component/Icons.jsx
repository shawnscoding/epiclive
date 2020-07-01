import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export const StdArrowDropDownIcon = styled(ArrowDropDownIcon)`
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => props.notactive};
`;

export const StdArrowDropUpIcon = styled(ArrowDropUpIcon)`
  font-size: 2rem;
  cursor: pointer;

  color: ${(props) => props.notactive};
`;

export const StdDeleteForeverIcon = styled(DeleteForeverIcon)`
  font-size: 1.5rem;
  cursor: pointer;

  color: ${(props) => props.notactive};
`;
