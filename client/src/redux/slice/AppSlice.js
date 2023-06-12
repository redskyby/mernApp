import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loader: false
}

const app = createSlice({
    name: "app",
    initialState,
    reducers: {
        SHOW_LOADER: (state) => {
            state.loader = true;
        },
        HIDE_LOADER: (state) => {
            state.loader = false;
        }

    }
});


export default app.reducer;
export const {
    SHOW_LOADER,
    HIDE_LOADER
} = app.actions;
