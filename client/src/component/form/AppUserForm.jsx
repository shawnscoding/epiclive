import React from "react";
import { StdTextFieldTwo } from "./../../styled-component/Input";
import { Box } from "@material-ui/core";
import { Form } from "./../../styled-component/Layout";

function AppUserForm({ handleChange, form }) {
  return (
    <Form mb="20px" p="2rem" noValidate autoComplete="off">
      <Box mb={2}>
        <StdTextFieldTwo
          name="username"
          onChange={handleChange}
          label="username"
          fullWidth
          sz="1.3rem"
          value={form.username}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="account"
          onChange={handleChange}
          label="account"
          fullWidth
          sz="1.3rem"
          value={form.account}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="password"
          onChange={handleChange}
          label="password"
          type="password"
          fullWidth
          sz="1.3rem"
          value={form.password ? form.password : ""}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="password_check"
          onChange={handleChange}
          label="password_check"
          fullWidth
          sz="1.3rem"
          type="password"
          value={form.password_check ? form.password_check : ""}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="status"
          onChange={handleChange}
          label="status"
          fullWidth
          sz="1.3rem"
          value={form.status}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="sex"
          onChange={handleChange}
          label="sex"
          fullWidth
          sz="1.3rem"
          value={form.sex}
        />
      </Box>

      <Box mb={2}>
        <StdTextFieldTwo
          name="tag"
          onChange={handleChange}
          label="tag"
          fullWidth
          sz="1.3rem"
          value={form.tag}
        />
      </Box>
    </Form>
  );
}

export default AppUserForm;
