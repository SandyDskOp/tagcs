import React from "react";
import { Box, Typography } from "@mui/material";
import Form from "../Components/Form";
import FormInput from "../Components/FormInput";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormButton from "../Components/FormButton";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Form>
        <Typography variant="h5" mb={2}>
          Register
        </Typography>
        <FormInput
          type="text"
          label="Username"
          name="username"
          icon={<AccountCircle />}
          required={true}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          icon={<AccountCircle />}
          required={true}
        />
        <FormInput type={"password"} label="Password" required={true}/>
        <FormInput type={"password"} label="Confirm Password" required={true}/>
        <NavLink to="/">Already User</NavLink>
        <FormButton text="Submit" />
      </Form>
    </Box>
  );
};

export default Register;
