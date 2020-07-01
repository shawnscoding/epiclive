import React from "react";
import { FlexEnd, SpaceAround } from "../../styled-component/Layout";
import { textPrimary, primaryHover } from "../../styled-component/Variable";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
import { MuiButton } from "../../styled-component/Button";

const DateSearchBar = ({
  startDate,
  endDate,
  handleEndDateChange,
  handleStartDateChange,
  handleSubmit,
}) => {
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SpaceAround mb={1} px={1}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            id="Start Date"
            label="Start Date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            id="Start Date"
            label="Start Date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </SpaceAround>
        <FlexEnd pr={1}>
          <MuiButton
            onClick={() => handleSubmit({ start: startDate, end: endDate })}
            startIcon={<YoutubeSearchedForIcon />}
            variant="contained"
            cr={textPrimary}
            bg="#fff"
            border={primaryHover}
            sz="1.2rem"
          >
            Search
          </MuiButton>
        </FlexEnd>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default DateSearchBar;
