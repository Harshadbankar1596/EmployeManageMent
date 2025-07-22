import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apislice";

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    id: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("action.payload", action.payload);
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.password = action.payload.password;
            state.role = action.payload.role;
            state.id = action.payload._id;
        }
    },
    extraReducers : (builder)=>{
        builder.addMatcher(
            apiSlice.endpoints.loginUser.matchFulfilled,
            (state , action)=>{
                console.log("Extra reducer matchfullfeild" , action.payload.user)
                setUser(action.payload.user)
            },
            
        )
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;