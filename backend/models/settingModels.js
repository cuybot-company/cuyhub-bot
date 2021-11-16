const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
  {
    name: { type: String, required: true, uppercase: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", SettingSchema);
