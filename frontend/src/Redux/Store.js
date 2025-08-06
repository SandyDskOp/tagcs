import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./Slices/AuthSlice"
import ToasterSlice from "./Slices/ToasterSlice"

const Store = configureStore({
    reducer:{
        auth:AuthSlice,
        toaster:ToasterSlice
    }
})

export default Store