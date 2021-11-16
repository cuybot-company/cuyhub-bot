require("dotenv").config();
const Database = require("./database");
const logger = require("../helper/logger");

global.logger = new logger();

const keepAlive = require("./server");
const discord = require("./discord");
const telegram = require("./telegram");

Database();
keepAlive();
