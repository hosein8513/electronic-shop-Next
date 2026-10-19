import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/reducer"
import cartReducer from "./cart/reducer"

const store = configureStore({
    reducer:{
        userReducer,
        cartReducer
    }
})

export default store