const express = require("express");
const mongoose = require("mongoose");
const room = express.Router();

const chatroom = require("../models/Room");
const Chatroom = mongoose.model("Chatroom", chatroom);

room.get("/", async (req, res) => {
    const chatroom = await Chatroom.find({});

    res.json(chatroom);
});

room.get("/:id", async (req, res) => {
  const chatroom = await Chatroom.findOne({_id: req.params.id});

  res.json(chatroom);
});

room.post("/", async (req, res) => {
    const { name } = req.body;

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Já existe um grupo em este nome!";

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
})

module.exports = room;