import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormInput = ({
  label = "Label",
  required = false,
  type = "text",
  icon,
  value,
  handleChange,
  name
}) => {
  const [show, setShow] = useState(false);

  const toogleShow = ()=>{
    setShow((prev)=>{
        return !prev
    })
  }
  return (
    <>
      {icon && type != "password" && (
        <TextField
          variant="outlined"
          label={label}
          required={required}
          sx={{ my: 1 }}
          color="secondary"
          size="small"
          fullWidth
          type={type}
          name={name}
          value={value}
          onChange={(e)=>handleChange(e)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                    <IconButton >
                        {icon}
                    </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      {!icon && type != "password" && (
        <TextField
          variant="outlined"
          label={label}
          required={required}
          sx={{ my: 1 }}
          size="small"
          fullWidth
          type={type}
          color="secondary"
          name={name}
          value={value}
          onChange={(e)=>handleChange(e)}
        />
      )}

      {type == "password" && (
        <TextField
          variant="outlined"
          label={label}
          required={required}
          sx={{ my: 1 }}
          size="small"
          fullWidth
          type={show ? "text" : "password"}
          color="secondary"
          name={name}
          value={value}
          onChange={(e)=>handleChange(e)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toogleShow}>
                    {!show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    </>
  );
};

export default FormInput;
