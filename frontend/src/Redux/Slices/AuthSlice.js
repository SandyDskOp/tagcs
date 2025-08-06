import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    profile:null
}
const AuthSlice = createSlice({
    name : "auth",
    initialState:initialState,
    reducers:{
        LOGIN : (state,action)=>{
            state.isLoggedIn = true,
            state.profile = action.payload
        },
        LOGOUT:(state,action)=>{
            state.isLoggedIn = false
            state.profile = null
        }
    }
})

export const {LOGIN,LOGOUT} = AuthSlice.actions
export default AuthSlice.reducer

