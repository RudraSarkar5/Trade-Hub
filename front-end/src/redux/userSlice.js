import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";

const initialValue = {
    isLoggedIn : false,
    data : {}
}




// api call for user creation using createAsyncThunk
export const register = createAsyncThunk(
  "/action/register",
  async function (data) {
    try {
      let response =  axios.post("/user/register", data);
      toast.promise(response, {
        loading: "creating account ...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
      return response.data;
    } catch (error) {
         throw error;
    }
  }
);
export const editProfile = createAsyncThunk(
  "action/editProfile",
  async function (data) {
    try {
      let response =  axios.put("/user/profile-update", data);
      toast.promise(response, {
        loading: "updating profile ...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
      return response.data;
    } catch (error) {
         throw error;
    }
  }
);

// api call for user login using createAsyncThunk
export const login = createAsyncThunk(
  "/action/login",
  async function (data) {
    try {
      let response =  axios.post("/user/log-in", data);
      toast.promise(response, {
        loading: "processing ...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
       return response.data;
    } catch (error) {
        throw error;
    }
  }
);
export const logOut = createAsyncThunk(
  "/action/logOut",
  async function () {
    try {
      let response =  axios.get("/user/log-out");
      toast.promise(response, {
        loading: "processing ...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
       return response.data;
    } catch (error) {
        throw error;
    }
  }
);
export const userDelete = createAsyncThunk(
  "/action/userDelete",
  async function () {
    try {
      let response =  axios.delete("/user/delete");
      toast.promise(response, {
        loading: "processing ...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
       return response.data;
    } catch (error) {
        throw error;
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "action/userDetails",
  async function () {
    try {
      let response = axios.get("/user/user-details");
      toast.promise(response, {
        loading: "fetching profile data...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return error.response?.data?.message;
        },
      });
       response = await response; 
       return response.data;
    } catch (error) {
        throw error;
    }
  }
);






const userSlice = createSlice({
  name: "user",
  initialState : initialValue,
  reducers:{},
  extraReducers:(builder)=>{
      builder
      .addCase(register.fulfilled,(state,action)=>{
        state.isLoggedIn = true;
        state.data = action?.payload?.value;
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.isLoggedIn = true;
        state.data = action.payload.value;
      })
      .addCase(logOut.fulfilled,(state,action)=>{
        state.isLoggedIn = false;
        state.data = {};
      })
      .addCase(userDelete.fulfilled,(state,action)=>{
        state.isLoggedIn = false;
        state.data = {};
      })
      .addCase(getUserDetails.fulfilled,(state,action)=>{
        state.isLoggedIn = true;
        state.data = action.payload.value;
      })
      .addCase(editProfile.fulfilled,(state,action)=>{
        state.isLoggedIn = true;
        state.data = action.payload.value;
        
      })
      
  }
});

export default userSlice.reducer;