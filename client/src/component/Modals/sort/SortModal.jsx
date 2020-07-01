import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { HeadTwo, Close } from '../../../styled-component/Text';
import { connect } from 'react-redux';
import { MuiButton } from '../../../styled-component/Button';
import { textPrimary } from '../../../styled-component/Variable';
import { StdDialog } from '../../../styled-component/Input';
import {
  SpaceBetween,
  ColumnDirection,
  Form,
} from '../../../styled-component/Layout';
import { toggleSortModal } from './../../../redux/modal/actions';
import { FormControl, InputLabel, Select, Box } from '@material-ui/core';
import {
  setMainCNListLeft,
  setMainCNListRight,
} from './../../../redux/list/actions';
import TransferList from './../../transferList/TransferList';
import { allCNInCategory } from '../../../utils/Data';
import { renderCNinSortModal } from './../../../utils/Helper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const SortModal = ({
  open,
  setOpen,
  loading,
  category,
  endNum,
  input,
  setMainCNListLeft,
  mainCNListLeft,
  setMainCNListRight,
  mainCNListRight,
  fetchRecord,
  state,
  setState,
}) => {
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecord({ params: input, category, sort: state, endNum });
  };

  return (
    <div>
      <StdDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen()}
        maxwid='65rem'
      >
        <ColumnDirection>
          <SpaceBetween p={2} mt={1} mb={1} cr={textPrimary}>
            <HeadTwo sz='2rem'>SORT </HeadTwo>
            <Close onClick={() => setOpen()}>x</Close>
          </SpaceBetween>

          <Form mb='20px' p='2rem' noValidate autoComplete='off'>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor='column'>Select Column *</InputLabel>
                <Select
                  native
                  value={state.column}
                  onChange={handleChange}
                  inputProps={{
                    name: 'column',
                    id: 'column',
                  }}
                >
                  <option aria-label='None' value='' />
                  {renderCNinSortModal(category).map((col) => (
                    <option key={col.name} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor='direction'>Select Direction</InputLabel>
                <Select
                  native
                  value={state.direction}
                  onChange={handleChange}
                  inputProps={{
                    name: 'direction',
                    id: 'direction',
                  }}
                >
                  <option value='ascending'>Ascending</option>
                  <option value='descending'>Descending</option>
                </Select>
              </FormControl>
            </Box>

            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor='isNullLast'>
                  Select Null's Location
                </InputLabel>
                <Select
                  native
                  value={state.isNullLast}
                  onChange={handleChange}
                  inputProps={{
                    name: 'isNullLast',
                    id: 'isNullLast',
                  }}
                >
                  <option value='first'>First</option>
                  <option value='last'>Last</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <TransferList
                setLeft={setMainCNListLeft}
                left={mainCNListLeft}
                setRight={setMainCNListRight}
                right={mainCNListRight}
              />
            </Box>
          </Form>

          <SpaceBetween p={2}>
            <div>
              <MuiButton
                onClick={() => setOpen()}
                bg='inherit'
                sz='1.2rem'
                cr={textPrimary}
              >
                Cancel
              </MuiButton>
            </div>
            <div>
              <MuiButton
                onClick={handleSubmit}
                bg='inherit'
                sz='1.2rem'
                cr='#87ceeb'
                disabled={loading}
              >
                Apply
              </MuiButton>
            </div>
          </SpaceBetween>
        </ColumnDirection>
      </StdDialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.openSort,
  category: state.main.category,
  mainCNListLeft: state.list.mainCNListLeft,
  mainCNListRight: state.list.mainCNListRight,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: () => dispatch(toggleSortModal()),
  setMainCNListLeft: (payload) => dispatch(setMainCNListLeft(payload)),
  setMainCNListRight: (payload) => dispatch(setMainCNListRight(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortModal);
