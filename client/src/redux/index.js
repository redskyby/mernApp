import {combineReducers, configureStore} from "@reduxjs/toolkit";
import user from "./slice/UserSlice"
import file from "./slice/FileSlice";
import upload from "./slice/UploadSlice";
import app from "./slice/AppSlice";

const rootReducer = combineReducers({
    userToolkit: user,
    fileToolkit: file,
    uploadToolKit: upload,
    appToolKit: app
})

export const store = configureStore({
    reducer: rootReducer,
})

