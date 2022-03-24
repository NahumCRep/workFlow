import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: "team",
    initialState: {},
    reducers:{
        setTeam(state, action){
            state = action.payload
            return state
        }
    }
})

export const { setTeam } = teamSlice.actions
export default teamSlice.reducer