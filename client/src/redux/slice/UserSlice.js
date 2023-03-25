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
                state.currentUser = action.payload.user;
                state.isAuth = true;
            }
        }
    }
)
export default userSlice.reducer;
export const {} = userSlice.actions;
