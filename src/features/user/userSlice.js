import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api'


// export const login = createAsyncThunk("user/login",async (credentials,thunkAPI)=>{
//     const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/login",{
//             method:"POST",
//             credentials:'include',
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 email:credentials.email,
//                 password:credentials.password
//             })
//         })
//     const data = await response.json()
//     if(data.message){
//         return thunkAPI.rejectWithValue(data.message)
//     }

//     return data
// })

export const login = createAsyncThunk("user/login", async (credentials, thunkAPI) => {
    const response = await post("/auth/login", {
        email: credentials.email,
        password: credentials.password
    })
    console.log('login response', response.data)
    //action.payload del reducer (fullfilled)
    return response.data
})

export const signup = createAsyncThunk("user/signup", async (credentials, thunkAPI) => {
    const response = await post("/auth/signup", {
        name: credentials.name,
        birthday: credentials.birthday,
        city: credentials.city,
        email: credentials.email,
        password: credentials.password
    })
    console.log('singup response', response.data)
    return response.data
})

// export const validate = createAsyncThunk("user/validate",async (credentials,thunkAPI)=>{
//     const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/validate",{
//             method:"POST",
//             credentials:'include',
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         })
//     const data = await response.json()
//     console.log(data)
//     if(data.message){
//         // console.log("Lanzando error...")
//         return thunkAPI.rejectWithValue("Error de loggeo")
//     }
//     return data
// })

export const validate = createAsyncThunk("user/validate", async (credentials, thunkAPI) => {
    const response = await post("/auth/validate")
    console.log('validacion', response.data)
    return response.data
})

// export const logout = createAsyncThunk("user/logout", async (credentials, thunkAPI) => {
//     const response = await fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/logout", {
//         method: "POST",
//         credentials: 'include',
//         headers: {
//             "Content-Type": "application/json"
//         },
//     })
//     const data = await response.json()
//     return data
// })

export const logout = createAsyncThunk("user/logout", async (credentials, thunkAPI) => {
    const res = await post("/auth/logout")
    return res.data
})


const userSlice = createSlice({
    name: "user",
    initialState: {
        logged: false,
        id: "",
        name: "",
        loading: false,
        error: true,
        message: ""
    },
    reducers: {
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
    extraReducers(builder) {
        // LOGIN    
        builder.addCase(login.pending,(state,action)=>{
            state.loading = true
            state.error = false
            state.message = ""
            state.name = ""
        })

        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            state.logged = true
            state.error = false
            state.name = action.payload.name
            state.id = action.payload.id
        })

        builder.addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            state.message = action.error.message
        })

        //VALIDATE
        builder.addCase(validate.pending,(state,action)=>{
            state.loading = true
        })

        builder.addCase(validate.fulfilled,(state,action)=>{
            state.logged = true
            state.name = action.payload?.user?.name
            state.id = action.payload?.user?.id
            state.error = false
            state.loading = false
        })

        builder.addCase(validate.rejected,(state,action)=>{
            state.logged = false
            state.loading = false
        })

        builder.addCase(logout.pending,(state,action)=>{
            state.loading = true
        })

        builder.addCase(logout.fulfilled,(state,action)=>{
            state.logged = false
            state.name = ""
            state.id = ""
            state.error = false
            state.loading = false
            state.message = ""
        })

        builder.addCase(logout.rejected,(state,action)=>{
            state.error = true
            state.logged = false
            state.message = "Error"
            state.loading = false
        })

        //SIGNUP
        builder.addCase(signup.pending,(state,action)=>{
            state.loading = true
            state.error = false
            state.message = ""
            state.name = ""
        })

        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading = false
            state.logged = true
            state.error = false
            state.name = action.payload.name
        })

        builder.addCase(signup.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            state.message = action.error.message
        })
    }
})

// export const {logout} = userSlice.actions // Esto se utiliza en el dispatch
export default userSlice.reducer // Esto en el store