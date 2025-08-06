import { useEffect, useState } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Header from "./Components/Header";
import AuthLayout from "./Layout/AuthLayout";
import Toaster from "./Components/Toaster";
import useAuth from "./Hooks/useAuth";
import { useDispatch } from "react-redux";
import { LOGIN } from "./Redux/Slices/AuthSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedLayout from "./Layout/ProtectedLayout";

function App() {
  const { isPending, auth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending) {
      if (auth) {
        dispatch(LOGIN(auth));
        navigate("/protected/post");
      }
    }
  }, [isPending]);
  return (
    <>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <div className="App">
          <header className="header">
            <Header />
          </header>
          <main className="main">
            <Routes>
              <Route path="/" element={<AuthLayout />} />
              <Route path="/protected/*" element={<ProtectedLayout />} />
              <Route
                path="*"
                element={
                  <Box>
                    <Typography>404 not found</Typography>
                  </Box>
                }
              />
            </Routes>
          </main>
          <Toaster />
        </div>
      )}
    </>
  );
}

export default App;
