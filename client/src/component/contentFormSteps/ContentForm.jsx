import React from "react";
import { StdTextFieldTwo } from "../../styled-component/Input";
import { Form } from "../../styled-component/Layout";
import {
  Box,
  InputLabel,
  Select,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { primaryHover } from "../../styled-component/Variable";
import { MuiButton } from "../../styled-component/Button";
import { connect } from "react-redux";
import {
  toggleSearchModal,
  giveCategoryToPopup,
} from "../../redux/modal/actions";
import TransferList from "../transferList/TransferList";

import {
  setArtistListLeft,
  setArtistListRight,
  setGenreListLeft,
  setGenreListRight,
} from "../../redux/list/actions";

const ContentForm_step1 = ({
  handleChange,
  form,
  selectedName_1,
  giveCategoryToPopup,
  artistListLeft,
  setArtistListLeft,
  artistListRight,
  setArtistListRight,
  genreListLeft,
  setGenreListLeft,
  genreListRight,
  setGenreListRight,
}) => {
  const handleClickSearch = (category) => {
    giveCategoryToPopup(category);
    toggleSearchModal();
  };

  if (!form) return <div>sorry... something wrong ...</div>;
  return (
    <Form mb="20px" p="2rem" noValidate autoComplete="off">
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="lang">Select Column *</InputLabel>
          <Select
            native
            value={form.lang}
            onChange={handleChange}
            inputProps={{
              name: "lang",
              id: "lang",
            }}
          >
            <option aria-label="None" value="" />
            <option value="1">Korean</option>
            <option value="2">English</option>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="title"
          onChange={handleChange}
          label="title"
          fullWidth
          sz="1.3rem"
          value={form.title}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          label="Category ( add search fn )"
          fullWidth
          sz="1.3rem"
          value={
            selectedName_1 && selectedName_1.length > 0
              ? selectedName_1.toString()
              : ""
          }
        />
        <MuiButton
          endIcon={<SearchIcon />}
          variant="contained"
          border={primaryHover}
          onClick={() => handleClickSearch("category")}
          bg="#fff"
          sz="1.1rem"
        >
          search
        </MuiButton>
      </Box>

      <TransferList
        setLeft={setArtistListLeft}
        left={artistListLeft}
        setRight={setArtistListRight}
        right={artistListRight}
      />
      <TransferList
        setLeft={setGenreListLeft}
        left={genreListLeft}
        setRight={setGenreListRight}
        right={genreListRight}
      />

      <Box mb={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Usageyn</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="n"
          >
            <FormControlLabel
              value="n"
              control={
                <Radio name="usageyn" onChange={handleChange} color="primary" />
              }
              label="N"
              labelPlacement="top"
            />
            <FormControlLabel
              value="y"
              control={
                <Radio name="usageyn" onChange={handleChange} color="primary" />
              }
              label="Y"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="story"
          onChange={handleChange}
          label="story"
          fullWidth
          sz="1.3rem"
          value={form.story}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="episode"
          onChange={handleChange}
          label="episode (num)"
          fullWidth
          sz="1.3rem"
          value={form.episode}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="priority"
          onChange={handleChange}
          label="priority (num)"
          fullWidth
          sz="1.3rem"
          value={form.priority}
        />
      </Box>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  selectedName_1: state.search.selectedName_1,
  artistListLeft: state.list.artistListLeft,
  artistListRight: state.list.artistListRight,
  genreListLeft: state.list.genreListLeft,
  genreListRight: state.list.genreListRight,
});

export default connect(mapStateToProps, {
  toggleSearchModal,
  giveCategoryToPopup,
  setArtistListLeft,
  setArtistListRight,
  setGenreListRight,
  setGenreListLeft,
})(ContentForm_step1);
