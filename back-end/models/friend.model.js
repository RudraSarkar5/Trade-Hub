import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    friendId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    lastMessage : {
        type : String
    },
    unRead : {
        type : Boolean
    }

},{
    timestamps : true
})

const friendModel = mongoose.model("friend",friendSchema);

export default friendModel;