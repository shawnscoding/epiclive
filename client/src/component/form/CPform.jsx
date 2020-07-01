import React from "react";
import { StdTextFieldTwo } from "./../../styled-component/Input";
import { Form } from "./../../styled-component/Layout";
import { Box } from "@material-ui/core";

const CPform = ({ handleChange, form }) => {
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
          name="name"
          onChange={handleChange}
          label="Name"
          fullWidth
          sz="1.3rem"
          value={form.name}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="phone"
          onChange={handleChange}
          label="phone"
          fullWidth
          sz="1.3rem"
          value={form.phone}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="email"
          onChange={handleChange}
          label="Email"
          fullWidth
          sz="1.3rem"
          value={form.email}
        />
      </Box>
      <Box mb={2}>
        <StdTextFieldTwo
          name="address1"
          onChange={handleChange}
          label="address"
          fullWidth
          sz="1.3rem"
          value={form.address1}
        />
      </Box>
    </Form>
  );
};

export default CPform;
