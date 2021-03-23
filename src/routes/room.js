const express = require("express");
const mongoose = require("mongoose");
const room = express.Router();

const auth = require("../config/middleware");
const chatroom = require("../models/Room");
const Chatroom = mongoose.model("Chatroom", chatroom);

room.get("/", async (req, res) => {
    const chatroom = await Chatroom.find({});

    res.status(200).json(chatroom);
});

room.get("/:id", async (req, res) => {
  const chatroom = await Chatroom.findOne({_id: req.params.id});

  res.status(200).json(chatroom);
});

room.post("/", async (req, res) => {
    const { name } = req.body;

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists){
    res.status(400).json({
      msg: "Já existe um grupo em este nome!"
    })
    return
  }

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.status(200).json({
    message: "Chatroom created!",
  });
})

module.exports = room;