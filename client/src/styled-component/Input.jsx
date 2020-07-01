import styled from 'styled-components';
import { TextField, Box } from '@material-ui/core/';
import { FormControl, Dialog } from '@material-ui/core';

// on modal
export const StdTextFieldOne = styled(TextField)`
  .MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.85);
  }
  .MuiInputLabel-outlined {
    font-size: 1.3rem;
  }
  .MuiInputBase-input {
    font-size: 1.3rem;
  }
`;

export const StdDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: ${(props) => props.maxwid};
  }
`;

// on search bar
export const StdTextFieldTwo = styled(TextField)`
  .MuiInputLabel-root {
    font-size: ${(props) => props.sz};
  }
  .MuiInputLabel-formControl {
    transform: translate(0, 20px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, -6px) scale(0.8);
  }
`;

export const FileInputField = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    opacity: 0;
    height: ${(props) => `calc(${props.ht} - 10px)`};

    cursor: pointer;
    z-index: 2000;
  }

  label {
    width: 100%;
    cursor: pointer;
    height: ${(props) => props.ht};

    display: flex;
    justify-content: center;
    p {
    }
  }
`;

export const SelectInput = styled(FormControl)`
  width: 100%;
`;

export const TextFieldWithIcon = styled.div`
  position: relative;

  input {
    width: 100%;
    margin: 8px 0;
    padding: 1rem 1rem 1rem 4rem;
    background-color: #fafafa;
    border: 2px solid #cacaca;
    transition: opacity 3s ease-in-out;

    :focus {
      border: 2px solid #5a56c1d6;
      outline: none;
    }
    :focus ~ svg {
      color: #5a56c1d6;
      opacity: 1;
    }
  }

  svg {
    font-size: 23px;
    position: absolute;
    top: 14px;
    left: 8px;
    opacity: 0.3;
  }
`;

export const SelectField = styled(Box)`
  width: 100%;
  margin: 10px 0;
  padding: 10px 10px;
  background-color: #fafafa;
  border: 2px solid #cacaca;
  select {
    :focus {
      border: 2px solid #5a56c1d6;
      outline: none;
    }
  }
`;
