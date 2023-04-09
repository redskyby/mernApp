import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    files: [],
    currentDir: null
}

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        SET_FILES: () => {

        },
        SET_CURRENT_DIR: () => {

        }
    }
});


export default fileSlice.reducer;
export const {SET_FILES, SET_CURRENT_DIR} = fileSlice.actions;