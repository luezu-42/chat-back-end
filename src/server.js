const app = require("./app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000
const server = app.listen(port , () => {
  console.log("Servidor rodando na porta " + port);
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const user = require("./models/User");
const chatroom = require("./models/Room");
const message = require("./models/Message");

const Message = mongoose.model("Message", message);
const User = mongoose.model("User", user);



io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWTS);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
 // console.log("Conctado: " + socket.userId);

  socket.on("disconnect", () => {
    //console.log("Disconectado: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
   console.log("Um usuário entrou no grupo: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("Um usuário saiu do grupo: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});

module.exports = io