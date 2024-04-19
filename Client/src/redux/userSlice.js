import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  isUpToDate : false,
  isLoggedIn:  false,
  userData :  {},
};

// api call for user creation using createAsyncThunk
export const createAccount = createAsyncThunk(
  "action/register",
  async function (data) {
    try {
      let response =  axios.post("/users/register", data);
      toast.promise(response,{
         loading : "creating account...",
         success : "created account successfully...",
         error : ((error)=>error?.response?.data?.message)

      })
      response = await response;
      return response.data;
    } catch (error) {
         console.log(error);
    }
  }
);

// api call for edit User Profile creation using createAsyncThunk
export const editProfile = createAsyncThunk(
  "action/editProfile",
  async function (data) {
    try {
      let response =  axios.put("/users/profile-update", data);
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
  "action/login",
  async function (data) {
    try {
      let response =  axios.post("/users/login", data);
      toast.promise(response, {
       loading : "processing...",
       success : "login successfully...",
       error: (error) => error?.response?.data?.message,
     });
     response = await response;
     return response.data;
    } catch (error) {
        throw error;
        console.log(error.message);
    }
  }
);
// api call for user log out using createAsyncThunk
export const logOut = createAsyncThunk(
  "action/logOut",
  async function () {
    try {
      let response =  axios.get("/users/logout");
      toast.promise(response, {
        loading: "processing ...",
        success: "log out successfully...",
        error: ((error)=>error?.response?.data?.message)
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
  "action/userDelete",
  async function () {
    try {
      let response =  axios.delete("/users/delete");
      toast.promise(response, {
        loading: "processing ...",
        success: "account deleted successfully",
        error:((error)=>error.response?.data?.message)
        
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
      let response = await axios.get("/users/user-details"); 
      return response.data;
    } catch (error) {
        // console.log(error);
        throw  error;
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "action/forgetPassword",
  async function (email) {
    
    try {
      let response = await axios.post("/users/forget-password",email);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "action/resetPassword",
  async function ({ password, resetToken }) {
    try {
      let response = await axios.post(
        `/users/reset-password/${resetToken}`,
        {password}
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
      .addCase(createAccount.fulfilled,(state,action)=>{
        state.isUpToDate = true;
        state.isLoggedIn = true;
        state.userData = action?.payload?.user;
      })

      .addCase(login.fulfilled,(state,action)=>{
       state.isUpToDate = true;
       state.isLoggedIn = true;
       state.userData = action?.payload?.user;
      })

      .addCase(logOut.fulfilled,(state,action)=>{
        state.isLoggedIn = false;
        state.userData = {};
        state.isUpToDate = false;
      })

      .addCase(userDelete.fulfilled,(state,action)=>{
        state.isLoggedIn = false;
        state.userData = {};
        state.isUpToDate = false;
      })

      .addCase(getUserDetails.fulfilled,(state,action)=>{
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.isUpToDate = true;
      })

      .addCase(editProfile.fulfilled,(state,action)=>{
        state.userData = action.payload.user;
        state.isUpToDate=false;
      })
      
  }
});

export default userSlice.reducer;