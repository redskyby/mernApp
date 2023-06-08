import {combineReducers , configureStore} from "@reduxjs/toolkit";
import user from "./slice/UserSlice"
import file from "./slice/FileSlice";
import upload from "./slice/UploadSlice";

const rootReducer = combineReducers({
    userToolkit : user,
    fileToolkit : file,
    uploadToolKit : upload
})

export const store = configureStore({
    reducer : rootReducer,
})

