import React from "react";
import { BasicForm, FlexCenter } from "./../../styled-component/Layout";
import { StdTextFieldTwo } from "../../styled-component/Input";
import { getSearchBarTitle } from "../../utils/Helper";

const HeaderSearchBar = ({
  input,
  handleSeachbarChange,
  handleSearchSubmit,
  category,
}) => {
  return (
    <FlexCenter width="100%">
      <BasicForm onSubmit={handleSearchSubmit} width="70%">
        <StdTextFieldTwo
          onChange={handleSeachbarChange}
          value={input}
          label={`${getSearchBarTitle(category)}...`}
          sz="1.3rem"
          fullWidth
        />
      </BasicForm>
    </FlexCenter>
  );
};

export default HeaderSearchBar;
