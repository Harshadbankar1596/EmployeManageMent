// import { createSlice } from "@reduxjs/toolkit";
// import { apiSlice } from "../apislice";
// import { useDispatch } from "react-redux";
// const initialState = {
//     log : {
//         date : new Date().toLocaleDateString(),
//         punchs : [],
//         totalHours : 0,
//         status : 'pending',
//     }
// }

// const logslice = createSlice({
//     name : 'log',
//     initialState,
//     reducers : {
//         setLog : (state, action) => {
//             console.log("action = payload = ", action.payload);
//             state.log = action.payload;
//         },
//         resetLog : () => {
//             return initialState;
//         }
//     },
//     extraReducers : (builder)=>{
//         builder.addMatcher(
//             apiSlice.endpoints.addpunch.matchFulfilled,
//             (state , action)=>{
//                 console.log("api slice addmatcher = " , action.payload.existingLog)
//             }
//         )
//     }
// })

// export const { setLog , resetLog } = logslice.actions;
// export default logslice.reducer;