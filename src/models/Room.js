const mongoose = require("mongoose");

const Chatroom = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = Chatroom;