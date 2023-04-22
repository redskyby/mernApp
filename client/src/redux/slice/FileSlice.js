import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    files: [],
    currentDir: null
}

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        SET_FILES: (state , action) => {
                state.files = action.payload;
        },
        SET_CURRENT_DIR: (state , action) => {
            state.currentDir = action.payload;
        },
        ADD_FILE : (state , action)=>{
                state.files = [...state.files , action.payload];
        }
    }
});


export default fileSlice.reducer;
export const {SET_FILES, SET_CURRENT_DIR, ADD_FILE} = fileSlice.actions;