const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandSchema = new Schema({});

module.exports = mongoose.model("Command", CommandSchema);
