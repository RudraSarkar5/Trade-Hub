import  { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast"

const initialState = {
    chatUpToDate : false,
    chatList : [],
    currentChat : {},
    showChatBox : false,
}

export const createChat = createAsyncThunk(
    "action/createChat",
    async ({senderId,receiverId})=>{
       try {
        let response = axios.post(
                             `/chats/add-friends?senderId=${senderId}&receiverId=${receiverId}`
                         );
 
         toast.promise(response,{
             loading : "wait! connecting with seller...",
             success : "successfull connected!",
             error : "something went wrong!, please try again"
         })
 
         response = await response;
         return response.data;
       } catch (error) {
         console.log(error.message);
       }

    }
);

export const getChatList = createAsyncThunk(
    "action/getAllChat",
    async ()=>{

        try {

            const response = await axios.get("/chats/get-friends");
            return response.data;
            
        } catch (error) {
            console.log(error.message);
        }
    
    }
)

export const makeReadLastMessage = createAsyncThunk(
  "action/makeReadLastMessage",
  async ({chatId}) => {
    try {
      const response = await axios.patch(`/chats/make-read/${chatId}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateCurrentChat(state, action) {
      state.currentChat = action.payload.chat;
      state.showChatBox = true;
    },
    clearCurrentChat(state) {
        state.showChatBox = false;
        state.currentChat = null;
    },
    updateChatList(state){  
        state.chatUpToDate = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.chatUpToDate = false;
      })

      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload.chats;
        state.chatUpToDate = true;
      })

      .addCase(makeReadLastMessage.fulfilled,(state)=>{
        state.chatUpToDate = false;
      })
  },
});

export const { clearCurrentChat, updateCurrentChat, updateChatList } = chatSlice.actions;
export default chatSlice.reducer;