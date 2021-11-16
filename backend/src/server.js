const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// constroller API
const messageController = require("../controller/messageController");
const settingController = require("../controller/settingController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const Command = require("../models/commandModels");

app.get("/", (req, res) => {
  res.send("Cuyhub API V1 is ready to use!");
});

// API
app.use("/message", messageController);
app.use("/setting", settingController);

const keepAlive = async () => {
  app.listen(PORT, async () => {
    logger.info(`Listening on: http://localhost:${PORT}`);
  });
};

module.exports = keepAlive;
