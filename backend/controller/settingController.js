const express = require("express");
const route = express.Router();
const Setting = require("../models/settingModels");

// add setting
// json data {"name": ..., "value": ...}
route.post("/new", async (req, res) => {
  const setting = await new Setting(req.body);
  const saveSetting = await setting.save();
  res.json(saveSetting);
});

// get all setting
route.get("/", async (req, res) => {
  const data = await Setting.find();
  res.json(data);
});

// get spasific setting
route.get("/get/:id", async (req, res) => {
  const data = await Setting.findById(req.params.id);
  res.json(data);
});

// get by name spasific setting
route.get("/get/name/:name", async (req, res) => {
  const data = await Setting.findOne({ name: req.params.name });
  res.json(data);
});

// update
// json data {"name": ..., "value": ...}
route.patch("/update/:id", async (req, res) => {
  const updateSetting = await Setting.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.json(updateSetting);
});

// delete
route.delete("/delete/:id", async (req, res) => {
  const deleteSetting = await Setting.findByIdAndDelete(req.params.id);
  res.json(deleteSetting);
});

module.exports = route;
