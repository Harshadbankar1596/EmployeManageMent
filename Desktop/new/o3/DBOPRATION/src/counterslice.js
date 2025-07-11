import { createSlice } from '@reduxjs/toolkit'
import { api } from './data'
const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state , actions) => {
      state.value += 1
      console.log("value : " , state.value)
      console.log("params  : " , actions.payload)
    },
    decrement: (state ) => {
      state.value -= 1
      console.log("value : " , state.value)
    },

  },

  extraReducers:(builder)=>{
    builder.addMatcher(
      api.endpoints.updateTasks.matchFulfilled,
      (state , actions)=>{
        state.user = actions.payload
        console.log("updateTasks.matchFulfilled payload: ", actions.payload);
      }
    )
    builder.addMatcher(
      api.endpoints.deleteTasks.matchFulfilled,
      (state , actions)=>{
        state.user = actions.payload
        console.log("Deleteed.matchFulfilled payload: ", actions.payload)
      }
    )
  }
})

console.log("store counter:" , counterSlice)

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer