import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser : {} ,
    isAuth : false
}

const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            SET_USER: (state, action) => {
                state.currentUser = action.payload;
                state.isAuth = true;
            },
            LOG_OUT: (state ) => {
                localStorage.removeItem('token');
                state.currentUser = {};
                state.isAuth = false;
            }
        }
    }
)
export default userSlice.reducer;
export const {SET_USER, LOG_OUT} = userSlice.actions;
