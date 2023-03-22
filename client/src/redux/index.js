import {combineReducers , configureStore} from "@reduxjs/toolkit";
import user from "./slice/UserSlice"

const rootReducer = combineReducers({
    userToolkit : user
})

export const store = configureStore({
    reducer : rootReducer,
})

