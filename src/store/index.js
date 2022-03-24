import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../features/user/userSlice'
import teamReducer from '../features/team/teamSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        team: teamReducer
    }
})

export default store;