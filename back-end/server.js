import app from "./app.js";
import {Server} from "socket.io";
import cloudinary from "cloudinary";
import http from "http";

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
    console.log(message,"from ",senderId);
    // Send the message to the receiver
    io.to(receiverId).emit("message", { senderId, receiverId, message });

    // Send the message to the sender (optional)
    io.to(senderId).emit("message", { senderId, receiverId, message });
  });

});


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


server.listen(PORT, async () => {
  await dbconnection();
  console.log(`server is on in http://localhost:${PORT}`);
});