import app from "./app.js";
import {Server} from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();


// user defined modules
import dbconnection from "./dbConfig/dbConfig.js";

const PORT = process.env.PORT || 5000;



const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("connected user");
  socket.on("join", (senderId) => {
    console.log("join is ",senderId);
    // Join a room based on the user's ID
    socket.join(senderId);
  });

  socket.on("message", ({ message, senderId, receiverId }) => {
   
    // Send the message to the receiver
    io.to(receiverId).emit("message", { senderId, receiverId, message });

    // Send the message to the sender (optional)
    io.to(senderId).emit("message", { senderId, receiverId, message });
  });

});





// after db connection server will run 
dbconnection().then(()=>{
  server.listen(PORT, ()=>{
     console.log(`server is on in http://localhost:${PORT}`);
  })
}).catch((err)=>{
  console.log("MongoDb connection failed...");
})

