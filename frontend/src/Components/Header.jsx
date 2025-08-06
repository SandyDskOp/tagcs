import React from "react";
import { AppBar, Toolbar, Typography, Button, Tab, Tabs } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky" sx={{height:"100%",width:"100%"}}>
      <Toolbar>
        <Typography variant="h4">TagCS</Typography>
        <Button color="error" sx={{ml:"auto"}} variant="contained">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
