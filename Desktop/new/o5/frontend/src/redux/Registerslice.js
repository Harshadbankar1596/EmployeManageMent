import { createSlice } from '@reduxjs/toolkit';
import { api } from './apislice';
import { useAddusersMutation } from './apislice';
const initialState = {
  username: '',
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
  },


  extraReducers : (builder)=>{
    builder.addMatcher(
        api.endpoints.addPost.matchFulfilled,
        (state , action)=>{
            console.log("action",action)
        }
    )
  }


});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
