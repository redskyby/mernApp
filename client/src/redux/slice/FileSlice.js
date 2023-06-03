import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    files: [],
    currentDir: null,
    popUpDisplay : 'none',
    dirStack : []
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
        },
        SET_POPUP_DISPLAY: (state, action) =>{
            state.popUpDisplay = action.payload;
        },
        PUSH_TO_STACK: (state, action) => {
            state.dirStack = [...state.dirStack, action.payload];
        },
        POP_TO_STACK: (state) => {
            state.currentDir = state.dirStack.pop();
        },
        DELETE_FILE: (state, action) => {
            state.files = [...files.filter(file => file._id != action.payload)];
        }
    }
});


export default fileSlice.reducer;
export const {
    SET_FILES,
    SET_CURRENT_DIR,
    ADD_FILE,
    SET_POPUP_DISPLAY,
    PUSH_TO_STACK,
    POP_TO_STACK,
    DELETE_FILE
             } = fileSlice.actions;