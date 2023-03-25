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
            }
        }
    }
)
export default userSlice.reducer;
export const {SET_USER} = userSlice.actions;
