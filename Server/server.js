import app from "./src/app.js";
import { envObject } from "./src/config/envConfig.js";
import {Server} from "socket.io";
import http from "http";
import dbconnection from "./src/config/dbConfig.js";
import { makeUnRead } from "./src/controllers/chat.controller.js";

const PORT = envObject.port || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

const connectionMap = new Map();

io.on("connection", (socket) => {
  console.log("socket conntected successfully",socket.id);

  socket.on("join", (userId) => {
    // Join a room based on the user's ID
    socket.join(userId);
  });

  socket.on("setConnection",({myId,chatId})=>{
     connectionMap.set(myId, chatId);
  });

  socket.on("destroyConnection",({myId})=>{
     connectionMap.delete(myId);
  });

  socket.on("message", async ({ message, senderId, receiverId , chatId }) => {
    
    if (
      !(
        connectionMap.has(receiverId) && connectionMap.get(receiverId) == chatId
      )
    ) {
      await makeUnRead(chatId);
    }

    
    io.to(receiverId).emit("message", {
      senderId,
      receiverId,
      content: message,
      chatId,
    });

    // Send the message to the sender (optional)
    io.to(senderId).emit("message", {
      senderId,
      receiverId,
      content: message,
      chatId,
    });
  });
});

// after db connection server will run
dbconnection()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is on in http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed...");
  });
