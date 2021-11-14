const { readJSON, readMessageAPI } = require("../helper/json");

export const sendDataApi = (message, data_api) => {
  const message_api = readMessageAPI(data_api, message);
  return message_api;
};

export const helpCommand = async (command) => {
  let showInfoCommand = readJSON("./config/commands.json");
  showInfoCommand = showInfoCommand.filter((cmd) => {
    return cmd.name === command && cmd.on_telegram === true;
  })[0];

  if (showInfoCommand === undefined) return false;

  const data_text = `
        *Command*: \`${showInfoCommand.command}\`\n*Description*: \`${showInfoCommand.description}\`\n*Usage*: \`${showInfoCommand.usage}\`
    `;

  return data_text;
};
