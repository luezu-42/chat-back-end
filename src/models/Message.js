const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chatroom",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      message: {
        type: String,
        required: true,
      },
});

module.exports = Message;
