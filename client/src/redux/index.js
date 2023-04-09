import {combineReducers , configureStore} from "@reduxjs/toolkit";
import user from "./slice/UserSlice"
import file from "./slice/FileSlice";

const rootReducer = combineReducers({
    userToolkit : user,
    fileToolkit : file
})

export const store = configureStore({
    reducer : rootReducer,
})

