const express = require("express");
const route = express.Router();
const Message = require("../models/messageModels");

// add message
// json data {"name": ..., "value": ...}
route.post("/new", async (req, res) => {
  const message = await new Message(req.body);
  const saveMessage = await message.save();
  res.json(saveMessage);
});

// get all message
route.get("/", async (req, res) => {
  const data = await Message.find();
  res.json(data);
});

// get spasific message
route.get("/get/:id", async (req, res) => {
  const data = await Message.findById(req.params.id);
  res.json(data);
});

// get by name spasific message
route.get("/get/name/:name", async (req, res) => {
  const data = await Message.findOne(req.params.name);
  res.json(data);
});

// update
// json data {"name": ..., "value": ...}
route.patch("/update/:id", async (req, res) => {
  const updateMessage = await Message.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.json(updateMessage);
});

// delete
route.delete("/delete/:id", async (req, res) => {
  const deleteMessage = await Message.findByIdAndDelete(req.params.id);
  res.json(deleteMessage);
});

module.exports = route;
