import React from "react";
import { Box } from "@material-ui/core";
import { HeadTwo } from "./../../styled-component/Text";
import { StdTextFieldTwo } from "./../../styled-component/Input";
import { MuiButton } from "../../styled-component/Button";
import {
  textPrimary,
  primaryDark,
  primaryHover,
  disabled,
} from "../../styled-component/Variable";
import {
  FlexEnd,
  ColumnDirection,
  BasicForm,
  FlexCenter,
} from "./../../styled-component/Layout";
import SearchIcon from "@material-ui/icons/Search";
import { getSearchBarTitle } from "../../utils/Helper";
import { FlexCenterWithAni } from "./../../styled-component/Animation";
import { CheckBoxIco } from "./../../styled-component/Button";

const SearchBar = ({
  input,
  renderIcon,
  handleSearchSubmit,
  handleSeachbarChange,
  category,
  loading,
}) => {
  return (
    <React.Fragment>
      <FlexCenterWithAni>
        <ColumnDirection width="50%" border={10} borderColor="secondary.dark">
          <Box p={2} mb={2}>
            <HeadTwo>
              {" "}
              {renderIcon(category)} Search {getSearchBarTitle(category)} ...{" "}
            </HeadTwo>
          </Box>
          <Box p={2} mb={2}>
            <BasicForm width="100%" onSubmit={handleSearchSubmit}>
              <StdTextFieldTwo
                fullWidth
                value={input}
                label={`${getSearchBarTitle(category)}...`}
                sz="1.4rem"
                onChange={handleSeachbarChange}
              />
            </BasicForm>
          </Box>

          <FlexEnd p={2} mb={2}>
            <MuiButton
              startIcon={<SearchIcon />}
              onClick={handleSearchSubmit}
              variant="contained"
              cr={textPrimary}
              bg={primaryDark}
              border={primaryHover}
              disabled={loading}
              sz="1.5rem"
            >
              Search
            </MuiButton>
          </FlexEnd>
        </ColumnDirection>
      </FlexCenterWithAni>
    </React.Fragment>
  );
};

export default SearchBar;
