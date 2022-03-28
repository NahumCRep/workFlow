import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: "team",
    initialState: {
        role: ""
    },
    reducers:{
        setTeamRole(state, action){
            state = action.payload
            return state
        }
    }
})

export const { setTeamRole } = teamSlice.actions
export default teamSlice.reducer