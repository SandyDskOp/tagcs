import React from "react";
import { Stack, Pagination } from "@mui/material";

const CustomPagination = ({totalPages,handleChange}) => {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} onChange={handleChange}/>
    </Stack>
  );
};

export default CustomPagination;
