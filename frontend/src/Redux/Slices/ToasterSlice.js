import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  transition: "slide",
  vertical: "top",
  horizontal: "right",
  duration: 3000,
  status: "success",
  variant: "filled",
  message: "The response is success",
};

const ToasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    FIRETOASTER: (state, action) => {
      const value = action.payload;

      if (typeof value.transition === "string") {
        if (["grow", "fade", "slide"].includes(value.transition)) {
          state.transition = value.transition;
        }
      }

      if (typeof value.isOpen === "boolean") {
        state.isOpen = value.isOpen;
      }else{
        state.isOpen = true
      }

      if (["top", "bottom"].includes(value.vertical)) {
        state.vertical = value.vertical;
      }

      if (["left", "right", "center"].includes(value.horizontal)) {
        state.horizontal = value.horizontal;
      }

      if (["success", "error", "info", "warning"].includes(value.status)) {
        state.status = value.status;
      }

      if (typeof value.duration === "number") {
        state.duration = value.duration;
      }

      if (["filled", "outlined", "standard"].includes(value.variant)) {
        state.variant = value.variant;
      }

      if (typeof value.message === "string") {
        state.message = value.message;
      }
    },
    CLOSETOASTER :(state,action)=>{
        state.isOpen = false
    }
  },
});

export const { FIRETOASTER,CLOSETOASTER } = ToasterSlice.actions;
export default ToasterSlice.reducer;
