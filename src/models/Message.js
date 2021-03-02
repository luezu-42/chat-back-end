const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "É preciso um grupo!",
        ref: "Chatroom",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "É preciso um usuário!",
        ref: "User",
      },
      message: {
        type: String,
        required: "Escreva uma mensagem",
      },
});

module.exports = Message;
