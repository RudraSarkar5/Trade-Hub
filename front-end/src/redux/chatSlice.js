import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";

export const fetchFriends = createAsyncThunk("chat/getFriends",async function(){
    const response = await axios.get("/chat/get-friends");
    
    return response.data;
})


const initialState = {
    upToDate : false,
    friends:[]
}

const chatSlice = createSlice ({
    name : "chat",
    initialState,
    reducers : {
        makeUpDateFriendList(state,action){
            const existFriend = state.friends.find((friend)=>friend._id == action.payload.receiverId);
            
            if(!existFriend){
                state.upToDate = false;
            }else{
                console.log(existFriend);
                existFriend.lastMessage = action.payload.message;
            }
        }
    },
    extraReducers : function (builder){
        builder.addCase(fetchFriends.fulfilled,function(state,action){
            state.friends = action.payload.friends;
            state.upToDate = true;
        });
    }
})

export const { makeUpDateFriendList } = chatSlice.actions;
export default chatSlice.reducer;