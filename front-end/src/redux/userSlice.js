import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
  isUpToDate : false,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  data: JSON.parse(localStorage.getItem("userDetails")) || {},
};




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

// api call for edit User Profile creation using createAsyncThunk
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
// api call for user log out using createAsyncThunk
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

// api call for delete accout using createAsyncThunk
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

// api call to get user details using createAsyncThunk
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
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
      builder
      .addCase(register.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("userDetails",JSON.stringify(action?.payload?.value));
        state.isLoggedIn = true;
        state.data = action?.payload?.value;
        state.isUpToDate = true;
      })
      .addCase(login.fulfilled,(state,action)=>{
       localStorage.setItem("isLoggedIn", true);
       localStorage.setItem("userDetails",JSON.stringify(action?.payload?.value));
       state.isLoggedIn = true;
       state.data = action?.payload?.value;
       state.isUpToDate = true;
      })
      .addCase(logOut.fulfilled,(state,action)=>{
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.isUpToDate = false;
      })
      .addCase(userDelete.fulfilled,(state,action)=>{
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.isUpToDate = false;
      })
      .addCase(getUserDetails.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userDetails",JSON.stringify(action?.payload?.value));
        state.isLoggedIn = true;
        state.data = action.payload.value;
        state.isUpToDate = true;
      })
      .addCase(editProfile.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userDetails",JSON.stringify(action?.payload?.value));
        state.data = action.payload.value;
        state.isLoggedIn=true;
        state.isUpToDate=true;
      })
      
  }
});

export default userSlice.reducer;