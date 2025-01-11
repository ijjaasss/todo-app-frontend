import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:null,
    id:null,
    editprofile:false,
    URl:import.meta.env.VITE_BACKEND_URL  
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{  
            state.user=action.payload.user;
            state.id = action.payload.id;
        },
          setEditProfile:(state,action)=>{
           state.editprofile=action.payload
          }
    }
})

export const {setUser,setEditProfile}=userSlice.actions
export default userSlice.reducer