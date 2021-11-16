const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// [{}] // with insert data
const CommandSchema = new Schema(
  {
    name: { type: String, required: true },
    command: { type: String, required: true },
    description: { type: String, required: true },
    usage: { type: String, required: true },
    on_discord: { type: Boolean, required: true, default: false },
    on_telegram: { type: Boolean, required: true, default: false },
    using_api: { type: Boolean, required: true, default: false },
    API: {
      URL: { type: String, required: true },
      METHOD: { type: String, required: true, uppercase: true },
      SUCCESS_MESSAGE: { type: String, required: true },
    },
    output: {
      DISCORD: {
        SUCCESS: {
          title: String,
          description: String,
          color: String,
          author: {
            name: String,
            url: String,
            icon: String,
          },
          thumbnail: String,
          image: String,
          footer: {
            text: String,
            icon: String,
          },
          field: Array,
          setTimestamp: Boolean,
        },
        FAILED: {
          title: String,
          description: String,
          color: String,
          author: {
            name: String,
            url: String,
            icon: String,
          },
          thumbnail: String,
          image: String,
          footer: {
            text: String,
            icon: String,
          },
          field: { type: Array, default: [] },
          setTimestamp: { type: Boolean, default: false },
        },
      },
      TELEGRAM: {
        SUCCESS: { type: String, required: true },
        FAILED: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Command", CommandSchema);
