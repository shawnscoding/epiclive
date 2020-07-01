import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { HeadTwo, Close } from "../../styled-component/Text";
import { connect } from "react-redux";
import { toggleSearchModal } from "../../redux/modal/actions";
import { MuiButton } from "../../styled-component/Button";
import { SpaceBetween, ColumnDirection } from "../../styled-component/Layout";
import { textPrimary } from "./../../styled-component/Variable";
import HeaderSearchBar from "./../searchBar/HeaderSearchBar";
import {
  searchStart,
  storeSelectedIdAndName,
} from "../../redux/search/actions";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PopupTableComponent from "./../table/PopupTableComponent";
import { Box } from "@material-ui/core/";

const theme = createMuiTheme({
  zIndex: {
    modal: 1600,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SearchPopup = ({
  open,
  toggleSearchModal,
  popupCategory,
  loading,
  searchStart,
  recordArray,
  columnNames,
  clLength,
  sort,

  storeSelectedIdAndName,
}) => {
  const handleBack = () => {
    toggleSearchModal();
  };

  const [params, setParams] = React.useState("");
  const [selectedId, setSelectedId] = React.useState([]);
  const [selectedName, setSelectedName] = React.useState([]);
  const [records, setRecords] = React.useState(null);

  const handleSearchSubmit = (e) => {
    //   do something here...
    e.preventDefault();
    searchStart({ params, category: popupCategory });
  };

  const handleSearchSubmitWithSort = (column, direction) => {
    //   do something here...
    console.log("clicked!");
    if (!direction) {
      direction = "ascending";
    }
    searchStart({
      params,
      category: popupCategory,
      sort: { column, direction },
    });
  };

  const handleSeachbarChange = (e) => {
    setParams(e.target.value);
  };

  const handleClickApply = () => {
    if (selectedName.length > 0) {
      storeSelectedIdAndName({ selectedName, selectedId });
    } else {
      alert("you need to select at least one record");
    }
    toggleSearchModal();
  };

  const handleCheckBoxChange = (record, checked) => {
    if (checked === false) {
      setSelectedId([...selectedId, record.id]);
      setSelectedName([...selectedName, record.title]);

      for (let i = 0; i < records.length; i++) {
        if (records[i].id === record.id) {
          records[i].checked = true;
        }
      }

      setRecords(records);
    } else if (checked === true) {
      let idArr = [];
      let nameArr = [];
      for (let i = 0; i < selectedId.length; i++) {
        if (selectedId[i] !== record.id) {
          idArr.push(selectedId[i]);
          nameArr.push(selectedName[i]);
        }
      }

      setSelectedName(nameArr);

      setSelectedId(idArr);

      for (let i = 0; i < records.length; i++) {
        if (records[i].id === record.id) {
          records[i].checked = false;
        }
      }

      setRecords(records);
    }
  };

  React.useEffect(() => {
    if (popupCategory) {
      searchStart({ category: popupCategory });
    }
  }, [popupCategory]);
  console.log(records, "records");
  if (!recordArray) return <div>loading...</div>;
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleBack()}
      >
        <ColumnDirection width="49rem">
          <SpaceBetween p={2} mt={1} mb={2} cr={textPrimary}>
            <HeadTwo>Search title </HeadTwo>
            <Close onClick={() => handleBack()}>
              <KeyboardBackspaceIcon />
            </Close>
          </SpaceBetween>

          <HeaderSearchBar
            handleSeachbarChange={handleSeachbarChange}
            input={params}
            category={popupCategory}
            handleSearchSubmit={handleSearchSubmit}
          />
          <Box py={1} px={3}>
            <PopupTableComponent
              sort={sort}
              handleCheckBoxChange={handleCheckBoxChange}
              data={records}
              handleSearchSubmitWithSort={handleSearchSubmitWithSort}
              selectedName={selectedName}
              recordArray={recordArray}
              columnNames={columnNames}
              setRecords={setRecords}
              clLength={clLength}
            />
          </Box>
          <SpaceBetween mt={1} p={2}>
            <MuiButton
              bg="inherit"
              onClick={() => handleBack()}
              sz="1.2rem"
              cr={textPrimary}
            >
              Back
            </MuiButton>

            <MuiButton
              onClick={handleClickApply}
              bg="inherit"
              sz="1.2rem"
              cr="#87ceeb"
              disabled={loading}
            >
              Apply
            </MuiButton>
          </SpaceBetween>
        </ColumnDirection>
      </Dialog>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.openSearch,
  popupCategory: state.modal.popupCategory,
  recordArray: state.search.recordArray,
  columnNames: state.search.columnNames,
  clLength: state.search.clLength,
  sort: state.search.sort,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSearchModal: () => dispatch(toggleSearchModal()),
  searchStart: (payload) => dispatch(searchStart(payload)),
  storeSelectedIdAndName: (payload) =>
    dispatch(storeSelectedIdAndName(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPopup);
