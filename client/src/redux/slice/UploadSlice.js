import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isVisitable: false,
    files: [],
}

const upload = createSlice({
    name: "upload",
    initialState,
    reducers: {
        SHOW_UPLOADER : (state) =>{
            state.isVisitable = true;
        },
        HIDE_UPLOADER : (state) =>{
            state.isVisitable = false;
        },
        ADD_UPLOADER_FILE : (state, action)=>{
            state.files = [...state.files , action.payload ];
        },
        REMOVE_UPLOAD_FILE: (state, action)=>{
            state.files = [...state.files.filter(file => file.id !== action.payload)]
        },
        CHANGE_UPLOAD_FILE: (state, action)=>{
            state.files = [...state.files.map(file => file.id === action.payload
                    ?{...file, progress : action.payload.progress}
                    :{...file}
            )];
        }
    }
});


export default upload.reducer;
export const {
    SHOW_UPLOADER,
    HIDE_UPLOADER,
    ADD_UPLOADER_FILE,
    REMOVE_UPLOAD_FILE,
    CHANGE_UPLOAD_FILE
} = upload.actions;
