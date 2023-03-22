import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser : {} ,
    isAuth : true
}

 const userSlice  = createSlice({
        name : "user",
        initialState,
    reducers :{
        //There will some actions
        }
    }


)
export default userSlice.reducer;
export const {} = userSlice.actions;
