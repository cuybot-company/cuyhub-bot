const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const {
//   readMessageJSON,
//   addMessageJSON,
//   readSettingsJSON,
//   addSettingsJSON,
//   addCommandJSON,
//   readCommandJSON,
// } = require("../helper/json");

const {
  addMessage,
  getAllMessage,
} = require("../controller/messageController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Cuyhub API V1 is ready to use!");
});

// get all messages
app.get("/api/v1/messages/:key?", (req, res) => {
  const key = req.params.key;
  return res.send(readMessageJSON(key));
});

// message add or update
app.post("/api/v1/messages", (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  return res.json(addMessageJSON(key, value));
});

// get all settings
app.get("/api/v1/settings/:key?", (req, res) => {
  const key = req.params.key;
  return res.send(readSettingsJSON(key));
});

// settings add or update
app.post("/api/v1/settings", (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  return res.json(addSettingsJSON(key, value));
});

app.get("/api/v1/commands/:command?", (req, res) => {
  const command = req.params.command;
  return res.send(readCommandJSON(command));
});

const keepAlive = async () => {
  app.listen(PORT, async () => {
    logger.info(`Listening on: http://localhost:${PORT}`);
  });
};

module.exports = keepAlive;
