import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Posts from "../Pages/Posts";
import useAuth from "../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "../Redux/Slices/AuthSlice";
import { Box, Typography } from "@mui/material";

const ProtectedLayout = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  if(!isLoggedIn){
    return <Navigate to="/"/>
  }
  return (
    <>
      <Routes>
        <Route path="/post" element={<Posts />} />
      </Routes>
    </>
  );
};

export default ProtectedLayout;
