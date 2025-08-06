import React, { useEffect, useState, useTransition } from 'react'
import { Snackbar, Slide, Alert,Grow,Fade } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {CLOSETOASTER} from "../Redux/Slices/ToasterSlice"

const SlideTransition = (props) => {
  return <Slide {...props} direction="left" /> 
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

function FadeTransition(props) {
  return <Fade {...props} />;
}


const Toaster = () => {
  const data = useSelector((state)=>state.toaster)
  const dispatch = useDispatch()
  const [transition, setTransition] = useState(()=>SlideTransition)

  useEffect(()=>{
    if(data.transition =="grow"){
        setTransition(()=>GrowTransition)
    }else if(data.transition == "fade"){
        setTransition(()=>FadeTransition)
    }else{
        setTransition(()=>SlideTransition)
    }
  },[data])

  const closeToaster = ()=>{
    dispatch(CLOSETOASTER())
  }

  return (
    <Snackbar
      open={data.isOpen}
      slots={{transition:transition}} 
      key={data.vertical + data.horizontal}
      anchorOrigin={{ vertical: data.vertical, horizontal: data.horizontal }}
      autoHideDuration={data.duration}
      onClose={closeToaster}
    >
      <Alert
        severity={data.status}
        variant={data.variant}
        sx={{ width: '100%',fontSize:"1.6rem" }}
        onClose={closeToaster}
      >
        {data.message}
      </Alert>
    </Snackbar>
  )
}

export default Toaster
