import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Posts from '../Pages/Posts'
import useAuth from '../Hooks/useAuth';
import { useDispatch } from 'react-redux';
import { LOGIN, LOGOUT } from '../Redux/Slices/AuthSlice';


const ProtectedLayout = () => {
    const { isPending, auth } = useAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography>Loadin...</Typography>
      </Box>
    );
  }

 useEffect(()=>{
  if(!isPending){
    if(!auth){
      dispatch(LOGOUT())
      navigate("/")
    }else{
        dispatch(LOGIN(auth))
    }
  }
 },[isPending])
  return (
    <Routes>
        <Route path='/post' element={<Posts/>}/>
    </Routes>
  )
}

export default ProtectedLayout