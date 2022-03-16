import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const login = createAsyncThunk("user/login",async (credentials,thunkAPI)=>{
    const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/login",{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password
            })
        })
    const data = await response.json()
    if(data.message){
        return thunkAPI.rejectWithValue(data.message)
    }

    //action.payload del reducer (fullfilled)
    return data
})

export const validate = createAsyncThunk("user/validate",async (credentials,thunkAPI)=>{
    const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/validate",{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            }
        })
    const data = await response.json()
    console.log(data)
    if(data.message){
        // console.log("Lanzando error...")
        return thunkAPI.rejectWithValue("Error de loggeo")
    }
    return data
})

export const logout = createAsyncThunk("user/logout",async (credentials,thunkAPI)=>{
    const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/logout",{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
        })
    const data = await response.json()
    return data
})


const userSlice = createSlice({
    name:"user",
    initialState:{
        logged:false,
        name:"",
        loading:false,
        error:true,
        message:""
    },
    reducers:{
        // login(state,action){
        //     state.logged = true
        //     state.name = action.payload
        // },
        // logout(state,action){
        //     state.logged = false
        //     state.name = ""
        // }
    },
    // Thunks
    extraReducers(builder){
        // LOGIN    
        builder.addCase(login.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            state.logged = true
            state.error = false
            state.name = action.payload.firstName
        })

        builder.addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            state.message = action.payload
        })

        // VALIDATE
        builder.addCase(validate.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(validate.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.name = action.payload.firstName
        })

        builder.addCase(validate.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            state.message = action.payload.message
        })

        // LOGOUT
        builder.addCase(logout.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(logout.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.logged = false
            state.name = ""
        })

        builder.addCase(logout.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            state.message = action.payload.message
        })
    }
})

// export const {logout} = userSlice.actions // Esto se utiliza en el dispatch
export default userSlice.reducer // Esto en el store