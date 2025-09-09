import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apislice";

const initialState = {
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        id: '',
        token : ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log("action.payload", action);
            state.name = action?.payload?.user?.name ;
            state.email = action?.payload?.user?.email;
            state.phone = action?.payload?.user?.phone;
            state.password = action?.payload?.user?.password;
            state.role = action?.payload?.user?.role;
            state.id = action?.payload?.user?.id;
            state.token = action?.payload?.token;
        },

        logoutuser : ()=>{
            return initialState;
        }
    },
    extraReducers : (builder)=>{
        builder.addMatcher(
            apiSlice.endpoints.loginUser.matchFulfilled,
            (state , action)=>{
                
                setUser(action.payload.user)
            },
            
        )
    }
})

export const { setUser , logoutuser} = userSlice.actions;
export default userSlice.reducer;





