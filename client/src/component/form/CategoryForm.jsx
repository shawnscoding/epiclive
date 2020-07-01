import React from "react";
import { StdTextFieldTwo } from "./../../styled-component/Input";
import { Form } from "./../../styled-component/Layout";
import { Box } from "@material-ui/core";

const CategoryForm = ({ handleChange, form }) => {
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
          fullWidth
          sz="1.3rem"
          value={form.priority}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="genre_list"
          onChange={handleChange}
          label="Genre List"
          fullWidth
          sz="1.3rem"
          value={form.genre_list}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="usageyn"
          onChange={handleChange}
          label="Usageyn"
          fullWidth
          sz="1.3rem"
          value={form.usageyn}
        />
      </Box>
    </Form>
  );
};

export default CategoryForm;
