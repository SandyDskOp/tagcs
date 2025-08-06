import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useClient from "../Hooks/useClient";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import CustomPagination from "../Components/CustomPagination";

const Posts = () => {
  const [searchParams] = useSearchParams();
  const [client, authClient] = useClient();
  const [posts, setPosts] = useState([]);
  const [totalpage, setTotalpage] = useState(0);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const navigate = useNavigate()

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userId", headerName: "User Id", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  const getData = async (page, limit) => {
    try {
      const url = `/user/getPosts?page=${page}&limit=${limit}`;
      const result = await authClient.get(url);
      if (result.status) {
        console.log(result);
        setPosts(result.posts);
        setTotalpage(result.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(!page || !limit){
      navigate("/404")
    }
    getData(page, limit);
  }, [page, limit]);

  const goToPage = (event,value)=>{
    let url = `/protected/post?page=${value}&limit=${limit}`
    navigate(url)
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        px: 4,
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}
    >
      <DataGrid
        rows={posts}
        columns={columns}
        hideFooter
      />

      <CustomPagination totalPages={totalpage} handleChange={goToPage}/>
    </Box>
  );
};

export default Posts;
