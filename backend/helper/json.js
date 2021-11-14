const fs = require("fs-extra");
const jsonQuery = require("json-query");
const JSONdb = require("simple-json-db");

const nameMessageJSON = "./config/messages.json";
const nameSettingsJSON = "./config/settings.json";
const nameCommandJSON = "./config/commands.json";

export const readJSON = (fileName) => {
  return fs.readJsonSync(fileName);
};

export const writeJSON = (fileName, dataJSON) => {
  return fs.writeJsonSync(fileName, dataJSON);
};

const options = {
  asyncWrite: true,
};

const dbMessage = new JSONdb(nameMessageJSON, options);
const dbSettings = new JSONdb(nameSettingsJSON, options);
const dbCommand = readJSON(nameCommandJSON);

export const readMessageJSON = (selectMessage) => {
  return selectMessage == "" ? dbMessage.JSON() : dbMessage.get(selectMessage);
};

export const addMessageJSON = (key, value) => {
  return dbMessage.set(key.toUpperCase(), value);
};

export const deleteMessageJSON = (key) => {
  return dbMessage.delete(key);
};

export const isHasMessageJSON = (key) => {
  return dbMessage.has(key);
};

export const readSettingsJSON = (selectSettings) => {
  return selectSettings == ""
    ? dbSettings.JSON()
    : dbSettings.get(selectSettings);
};

export const addSettingsJSON = (key, value) => {
  return dbSettings.set(key.toUpperCase(), value);
};

export const isHasSettingsJSON = (key) => {
  return dbSettings.has(key);
};

// get output message with output from API
export const readMessageAPI = (json, selector) => {
  const splitMessage = selector.trim().split(" ");
  let tampungMessage = [];

  splitMessage.forEach((message) => {
    Boolean(jsonQuery(`${message}`, { data: json }).value) &&
    message &&
    !message.includes(":")
      ? tampungMessage.push(" " + jsonQuery(`${message}`, { data: json }).value)
      : tampungMessage.push(message);
  });

  return tampungMessage.join(" ");
};

export const findCommand = (commands, onFor) => {
  return dbCommand.some(
    (cmd) => cmd.command.includes(commands) && cmd[onFor] === true
  );
};

// get data for output discord / telegram, or get from message.json
// API.SUCCESS_MESSAGE
export const readMessageCommand = (selectMessage, nameCommand) => {
  const messageCommand = jsonQuery(`[name=${nameCommand}].${selectMessage}`, {
    data: dbCommand,
  }).value;

  const isFoundInMessageJSON = isHasMessageJSON(messageCommand);

  const messages = isFoundInMessageJSON
    ? readMessageJSON(messageCommand)
    : messageCommand;

  return messages;
};

export const readCommandJSON = (selectCommand = "") => {
  const db = new JSONdb(nameCommandJSON);

  return selectCommand == ""
    ? db.JSON()
    : dbCommand.filter((cmd) => cmd.name == selectCommand);
};

export const addCommandJSON = (dataJSON) => {
  let data = [];
  data = [...dbCommand, dataJSON];

  return writeJSON(nameCommandJSON, data);
};
