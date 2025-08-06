import React from "react";
import { Box, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import BLOG from "../assets/Images/blog.png";

const AuthLayout = () => {
  return (
    <Grid container height={"100%"}>
      <Grid size={6}>
          <img src={BLOG} height="100%" width="100%" className="blog-image" />
      </Grid>
      <Grid size={6} sx={{backgroundColor:"slategrey"}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
