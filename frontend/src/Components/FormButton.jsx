import { Button } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const FormButton = ({text="SUBMIt",isLoading=false}) => {
  return (
    <Button fullWidth sx={{my:1}} variant='contained' type='submit'>
        {isLoading?(
            <>
                <CircularProgress/>
            </>
        ):(
            <>
                {text}
            </>
        )}
    </Button>
  )
}


export default FormButton