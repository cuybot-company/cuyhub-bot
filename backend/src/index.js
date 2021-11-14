require("dotenv").config();
const keepAlive = require("./server");
const discord = require("./discord");
const telegram = require("./telegram");
const Database = require("./database");
const logger = require("../helper/logger");

global.logger = new logger();
keepAlive();
Database();
