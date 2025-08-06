import React from "react";
import { Box, Typography } from "@mui/material";

const Form = ({ children,onSubmit }) => {
  return (
    <Box
      sx={{
        width: { xs: "90%", md: "60%" },
        backgroundColor: "rgba(200,80,20,0.7)",
        borderRadius: "8px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-60%)",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
      }}
      px={4}
      py={4}
      component={"form"}
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};

export default Form;
