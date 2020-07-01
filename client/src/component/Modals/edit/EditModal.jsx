import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { HeadTwo, Close } from "../../../styled-component/Text";
import { connect } from "react-redux";
import { toggleEditModal } from "../../../redux/modal/actions";
import { MuiButton } from "../../../styled-component/Button";
import {
  deleteRecordStart,
  updateRecordStart,
} from "./../../../redux/main/actions";
import { textPrimary } from "../../../styled-component/Variable";
import {
  SpaceBetween,
  ColumnDirection,
} from "../../../styled-component/Layout";
import { renderForm } from "../../../utils/Helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({
  open,
  updateRecordStart,
  setOpen,
  loading,

  deleteRecordStart,
  category,
  record,
}) => {
  const [form, setForm] = React.useState(record);
  React.useEffect(() => {
    if (record) {
      setForm(record);
    }
  }, [record]);

  const handleDelete = () => {
    if (record.id) {
      let id = record.id;
      deleteRecordStart({ id, category });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (!record) return <React.Fragment></React.Fragment>;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen()}
      >
        <ColumnDirection width="49rem">
          <SpaceBetween p={2} mt={1} mb={1} cr={textPrimary}>
            <HeadTwo>Edit {category} </HeadTwo>
            <Close onClick={() => setOpen()}>x</Close>
          </SpaceBetween>
          {category && renderForm({ category, form, handleChange })}

          <SpaceBetween p={2}>
            <div>
              <MuiButton
                onClick={() => setOpen()}
                bg="inherit"
                sz="1.2rem"
                cr={textPrimary}
              >
                Cancel
              </MuiButton>
              <MuiButton
                onClick={handleDelete}
                bg="inherit"
                sz="1.2rem"
                cr="#fb3333bf"
                disabled={loading}
              >
                Delete
              </MuiButton>
            </div>
            <div>
              <MuiButton
                onClick={() =>
                  updateRecordStart({ id: record.id, category, form })
                }
                bg="inherit"
                sz="1.2rem"
                cr="#87ceeb"
                disabled={loading}
              >
                Save
              </MuiButton>
            </div>
          </SpaceBetween>
        </ColumnDirection>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.openEdit,
  record: state.main.edit.record,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: () => dispatch(toggleEditModal()),
  deleteRecordStart: (record) => dispatch(deleteRecordStart(record)),
  updateRecordStart: (record) => dispatch(updateRecordStart(record)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
