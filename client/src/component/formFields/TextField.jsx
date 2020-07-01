import React from 'react';
import { TextField as Field } from '@material-ui/core/';
import styled from 'styled-components';

const StdTextField = styled(Field)`
  .MuiInputLabel-root {
    font-size: ${(props) => props.sz};
  }
  .MuiInputLabel-formControl {
    transform: translate(0, 20px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, -6px) scale(0.8);
  }

  margin: ${(props) => props.m};
`;

const TextField = (props) => {
  const { onChange, value, name, label, ...rest } = props;
  return (
    <StdTextField
      name={name}
      onChange={onChange}
      label={label}
      fullWidth
      {...rest}
      value={value}
    />
  );
};

export default TextField;
