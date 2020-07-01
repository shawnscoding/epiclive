import React from "react";
import HeaderSearchBar from "./../searchBar/HeaderSearchBar";
import { SpaceBetween } from "../../styled-component/Layout";
import { textPrimary, primaryHover } from "../../styled-component/Variable";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { primaryDark } from "./../../styled-component/Variable";
import { MuiButton } from "../../styled-component/Button";
import { navbarItem } from "./../../utils/Data";
import { HeadTwo } from "../../styled-component/Text";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

const SubHeader = ({
  handleClickCreate,
  handleSearchSubmit,
  handleSeachbarChange,
  input,
  category,
  showButton = false,
  showSearchbar = false,
}) => {
  const renderHeader = (category) => {
    if (category) {
      const res = navbarItem.filter((item) => item.params === category);
      if (!res) return <React.Fragment> </React.Fragment>;
      if (res.length === 0) {
        const res = category.split(".");
        return (
          <React.Fragment>
            <StopRoundedIcon />
            <HeadTwo>{res[1].toUpperCase()}</HeadTwo>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {res[0].icon}
            <HeadTwo>{category.toUpperCase()}</HeadTwo>
          </React.Fragment>
        );
      }
    }
  };

  return (
    <SpaceBetween color={textPrimary} mb={3} py={1} px={2}>
      <SpaceBetween>{renderHeader(category)}</SpaceBetween>
      {showSearchbar && (
        <HeaderSearchBar
          handleSearchSubmit={handleSearchSubmit}
          handleSeachbarChange={handleSeachbarChange}
          input={input}
          category={category}
        />
      )}
      {showButton && (
        <div>
          <MuiButton
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => handleClickCreate(category)}
            variant="contained"
            cr={textPrimary}
            bg={primaryDark}
            border={primaryHover}
            sz="1.5rem"
          >
            Create
          </MuiButton>
        </div>
      )}
    </SpaceBetween>
  );
};

export default SubHeader;
