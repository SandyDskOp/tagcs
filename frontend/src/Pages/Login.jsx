import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import FormInput from "../Components/FormInput";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormButton from "../Components/FormButton";
import Form from "../Components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import useClient from "../Hooks/useClient";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { LOGIN } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client,authClient] = useClient();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const loginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await client.post("/user/login", formdata);
      if (result.status) {
        Cookies.set("authToken", result.token, {
          path: '/',
          sameSite: 'Lax', 
        });
        const profile = await getProfile() 
        dispatch(LOGIN(profile))
        navigate("/protected/post?page=1&limit=20")
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async()=>{
    try {
      const result = await authClient.get("/user/profile")
      return result.user
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const handleChange =(e)=>{
    const {name,value} = e.target
    setFormdata((prev)=>({
        ...prev,
        [name]:value
    }))
  }
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Form onSubmit={loginForm}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <FormInput
          type="email"
          name="email"
          required={true}
          label="Email"
          icon={<AccountCircle />}
          value={formdata.email}
          handleChange={handleChange}
        />
        <FormInput
          type={"password"}
          label="Password"
          name="password"
          required={true}
          value={formdata.password}
          handleChange={handleChange}
        />
        <NavLink to="/register">New User</NavLink>
        <FormButton text="Submit" isLoading={loading} />
      </Form>
    </Box>
  );
};

export default Login;
