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

const SetImageForm = ({ setImageForm, form }) => {
  const handleChange = (e) => {
    setImageForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (!form) return <div>sorry,, something wrong in setImageForm</div>;
  return (
    <Form mb="20px" p="2rem" noValidate autoComplete="off">
      <Box mb={2}>
        <StdTextFieldTwo
          name="title"
          onChange={handleChange}
          label="Title"
          fullWidth
          sz="1.3rem"
          value={form.title}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="priority"
          onChange={handleChange}
          label="Priority"
          type="number"
          fullWidth
          sz="1.3rem"
          value={form.priority}
        />
      </Box>

      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="image_type">Image Type *</InputLabel>
          <Select
            native
            value={form.image_type}
            onChange={handleChange}
            name="image_type"
            id="image_type"
          >
            <option aria-label="None" value="" />
            <option value={1}>Thumbnail</option>
            <option value={2}>Poster</option>
            <option value={3}>Logo</option>
            <option value={4}>Background</option>
          </Select>
        </FormControl>
      </Box>
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
    </Form>
  );
};

export default SetImageForm;
