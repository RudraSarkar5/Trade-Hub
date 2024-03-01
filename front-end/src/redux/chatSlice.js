import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";

export const fetchFriends = createAsyncThunk("chat/getFriends",async function(){
    const response = await axios.get("/chat/get-friends");
    return response.data;
})

// export const addMessage = createAsyncThunk("chat/addMessage", async function (data) {
//   const response = await axios.post("/chat/add-message", data);
//   return response.data;
// });

export const makeRead = createAsyncThunk("chat/makeRead", async function (data) {
   const response =  await axios.post("/chat/make-read", data);
  return response.data;
});

const initialState = {
    upToDate : false,
    needApiCall : true,
    friends:[]
}

const chatSlice = createSlice ({
    name : "chat",
    initialState,
    reducers : {
        makeUpdateFriendList(state,action){
            const existFriend = state.friends.find((friend)=>friend.friendId._id == action.payload.id);
            // console.log(state.friends[0].lastMessage);
            console.log("enter here ");
            // console.log(existFriend);
            // console.log(existFriend);
            if(!existFriend){
                state.needApiCall = true;
            }else{
              existFriend.lastMessage = action.payload.message;
              console.log(existFriend.lastMessage);
              state.upToDate=false;
            }
            
        }
       
    },
    extraReducers : function (builder){
        builder
          .addCase(fetchFriends.fulfilled, function (state, action) {
            state.friends = action.payload.friends;
            console.log("enter in fetch friends");
            console.log(action.payload.friends);
            state.needApiCall = false;
            
          })
         
          .addCase(makeRead.fulfilled, function (state, action) {

          })
    }
})

export const { makeUpdateFriendList} = chatSlice.actions;
export default chatSlice.reducer;