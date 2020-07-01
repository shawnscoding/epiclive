import React from 'react';
import Slide from '@material-ui/core/Slide';
import { HeadTwo, Close } from '../../../styled-component/Text';
import { connect } from 'react-redux';
import { toggleCreateModal } from '../../../redux/modal/actions';
import { MuiButton } from '../../../styled-component/Button';
import { createRecordStart } from '../../../redux/main/actions';
import { renderForm, getFormFields } from './../../../utils/Helper';
import {
  SpaceBetween,
  ColumnDirection,
  Form,
} from '../../../styled-component/Layout';
import { textPrimary } from './../../../styled-component/Variable';
import { StdDialog } from '../../../styled-component/Input';
import TextField from '../../formFields/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const CreateModal = ({ loading, open, setOpen, create, category, record }) => {
  const [form, setForm] = React.useState({});
  const [showBtn, setShowBtn] = React.useState(true);

  const [imageForm, setImageForm] = React.useState({
    title: '',
    priority: '',
    usageyn: 'n',
    image_type: 0,
  });

  React.useEffect(() => {
    const obj = getFormFields(category);
    console.log(obj, category, 'dd');
    setForm(obj);
    if (category === 'content') {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [category]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create({ form, category });
  };

  if (!form) return <React.Fragment> </React.Fragment>;

  return (
    <div>
      <StdDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxwid='1000px'
        onClose={() => setOpen()}
      >
        <ColumnDirection width='70rem'>
          <SpaceBetween p={2} mt={1} mb={1} cr={textPrimary}>
            <HeadTwo>Create {category}</HeadTwo>
            <Close onClick={() => setOpen()}>x</Close>
          </SpaceBetween>
          {/* {category &&
            renderForm({
              category,
              form,
              handleChange,
              imageForm,
              setImageForm,
            })} */}
          <Form mb='20px' p='2rem' noValidate autoComplete='off'>
            {form.title !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='title'
                onChange={handleChange}
                value={form.title}
                label='Title'
              />
            )}

            {form.name !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='name'
                onChange={handleChange}
                value={form.name}
                label='Name'
              />
            )}

            {form.email !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='email'
                onChange={handleChange}
                value={form.email}
                label='Email'
              />
            )}

            {form.companyno !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='companyno'
                onChange={handleChange}
                value={form.companyno}
                label='company number'
              />
            )}

            {form.phone !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='phone'
                onChange={handleChange}
                value={form.phone}
                label='Phone'
              />
            )}

            {form.address1 !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='address1'
                onChange={handleChange}
                value={form.address1}
                label='Address 1 '
              />
            )}

            {form.priority !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='priority'
                onChange={handleChange}
                value={form.priority}
                label='Priority'
              />
            )}

            {form.usageyn !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='usageyn'
                onChange={handleChange}
                value={form.usageyn}
                label='usageyn'
              />
            )}

            {form.genre_list !== undefined && (
              <TextField
                sz='1.5rem'
                m='0 0 1rem 0'
                name='genre_list'
                onChange={handleChange}
                value={form.genre_list}
                label='Genre List'
              />
            )}
          </Form>

          {showBtn && (
            <SpaceBetween p={2}>
              <MuiButton
                bg='inherit'
                onClick={() => setOpen()}
                sz='1.2rem'
                cr={textPrimary}
              >
                Cancel
              </MuiButton>

              <MuiButton
                onClick={handleSubmit}
                bg='inherit'
                sz='1.2rem'
                cr='#87ceeb'
                disabled={loading}
              >
                Save
              </MuiButton>
            </SpaceBetween>
          )}
        </ColumnDirection>
      </StdDialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.openCreate,
  record: state.main.create.record,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: () => dispatch(toggleCreateModal()),
  create: (data) => dispatch(createRecordStart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModal);
