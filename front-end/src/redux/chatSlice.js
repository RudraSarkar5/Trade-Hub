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
    selectedFriend : null,
    upToDate : false,
    needApiCall : true,
    friends:[]
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    makeUpdateFriendList(state, action) {
      const existFriend = state.friends.find(
        (friend) => friend.friendId._id == action.payload.id
      );
      
      if (!existFriend) {
        state.needApiCall = true;
      } else {
        existFriend.lastMessage = action.payload.message;
        console.log(existFriend.lastMessage);
        state.upToDate = false;
        // kind of sab mati.... need to fix it 
        state.needApiCall=true;
      }
    },
    markAsUnRead(state,action){
      const friendId = action.payload;
      const existFriend = state.friends.find((friend)=>friend.friendId._id == friendId);
      if(existFriend){
        existFriend.unRead = true;
      }
    },
    makeSelectedFriend(state,action){
      state.selectedFriend = action.payload;
    }
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchFriends.fulfilled, function (state, action) {
        state.friends = action.payload.friends;
        console.log("enter in fetch friends");
        console.log(action.payload.friends);
        state.needApiCall = false;
      })

      .addCase(makeRead.fulfilled, function (state, action) {
        let friendId = action.payload.receiverId;
        const existFriend = state.friends.find(
          (friend) => friend.friendId._id == friendId
        );
        if(existFriend){
          existFriend.unRead = false;
        }
      });
  },
});

export const { makeUpdateFriendList, markAsUnRead, makeSelectedFriend } =
  chatSlice.actions;
export default chatSlice.reducer;