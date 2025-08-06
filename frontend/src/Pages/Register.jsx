import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Form from "../Components/Form";
import FormInput from "../Components/FormInput";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormButton from "../Components/FormButton";
import { NavLink, useNavigate } from "react-router-dom";
import useClient from "../Hooks/useClient";
import useToaster from "../Hooks/useToaster";

const Register = () => {
  const [client,authClient] = useClient()
  const navigate = useNavigate()
  const toaster = useToaster()
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const result = await client.post("/user",formdata)
      if(result.status){
        toaster.fire({status:"success",message:"User created successfully"})
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={2}>
          Register
        </Typography>
        <FormInput
          type="text"
          label="Username"
          name="username"
          icon={<AccountCircle />}
          required={true}
          value={formdata.username}
          handleChange={handleChange}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          icon={<AccountCircle />}
          required={true}
          value={formdata.email}
          handleChange={handleChange}
        />
        <FormInput
          type={"password"}
          label="Password"
          required={true}
          name="password"
          value={formdata.password}
          handleChange={handleChange}
        />
        <FormInput
          type={"password"}
          label="Confirm Password"
          required={true}
          name="confirm_password"
          value={formdata.confirm_password}
          handleChange={handleChange}
        />
        <NavLink to="/">Already User</NavLink>
        <FormButton text="Submit" isLoading={loading}/>
      </Form>
    </Box>
  );
};

export default Register;
