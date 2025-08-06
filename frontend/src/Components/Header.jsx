import React from "react";
import { AppBar, Toolbar, Typography, Button, Tab, Tabs } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Redux/Slices/AuthSlice";
import Cookies from "js-cookie";
import useToaster from "../Hooks/useToaster";

const Header = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toatser = useToaster()

  const logOut = ()=>{
    dispatch(LOGOUT())
    Cookies.remove("authToken")
    toatser.fire({status:"success",message:"Logout successfull"})
    navigate("/")
  }
  return (
    <AppBar position="sticky" sx={{height:"100%",width:"100%"}}>
      <Toolbar>
        <Typography variant="h4">TagCS</Typography>
        {isLoggedIn && <Button color="error" sx={{ml:"auto"}} variant="contained" onClick={logOut}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
