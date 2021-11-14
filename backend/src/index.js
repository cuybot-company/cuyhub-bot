require("dotenv").config();
const keepAlive = require("./server");
const discord = require("./discord");
const telegram = require("./telegram");

keepAlive();
