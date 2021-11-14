const { Client, Intents } = require("discord.js");

const { embeed, helpCommand } = require("../helper/discord");

const { readMessageCommand, findCommand } = require("../helper/json");

const axios = require("axios");

const { toString } = require("../helper/helpers");

const { TOKEN_DISCORD_BETA, TOKEN_DISCORD_PRODUCTION, DEVELOPMENT } = process.env;

const { PREFIX } = require("../config/settings.json");

const TOKEN = DEVELOPMENT == "BETA" ? TOKEN_DISCORD_BETA : TOKEN_DISCORD_PRODUCTION;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  logger.info("[+] Discord on ready");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const { channelId } = message;
  const { username } = message.author;
  const userMessage = message.content;

  if (userMessage === undefined) return;

  const splitMessage = userMessage.split(" ");
  const nameCommand = splitMessage[0].substring(PREFIX.length);

  let output = "";

  if (userMessage.includes(`${PREFIX}help`)) {
    if (splitMessage.length == 2) {
      output = (await helpCommand(splitMessage[1])) || (await readMessageCommand("output.DISCORD.FAILED", "help"));
    } else {
      output = embeed(await readMessageCommand("output.DISCORD.SUCCESS", "help"));
      logger.info(output);
    }
  } else if (userMessage.includes(PREFIX) && findCommand(splitMessage[0], "on_discord")) {
    const usingApi = await readMessageCommand("using_api", nameCommand);

    if (usingApi) {
      let options = [];
      const url = await readMessageCommand("API.URL", nameCommand);
      const method = await readMessageCommand("API.METHOD", nameCommand);
      const getMessageOutputAPI = await readMessageCommand("API.SUCCESS_MESSAGE", nameCommand);

      const regexmatcherOutputAPI = new RegExp(getMessageOutputAPI, "gi");

      if (method === "GET") {
        const regexUrlInjector = url.match(new RegExp("{}", "gi")) || "";
        const urlSplit = url.split("{}");
        let tempUrlSplit = urlSplit;
        let tempMessageSplit = splitMessage;
        let tempMessageSplit1 = "";

        if (urlSplit.length < tempMessageSplit.length) {
          tempMessageSplit1 = tempMessageSplit.slice(1, tempMessageSplit.length).join(" ");
          tempMessageSplit = [tempMessageSplit[0], tempMessageSplit1];
        }

        if (Array.isArray(regexUrlInjector) && regexUrlInjector.length >= 1) {
          tempMessageSplit.shift();
          let tempRegexUrlInjector = regexUrlInjector;
          let n = 1;
          tempUrlSplit.push("");

          tempRegexUrlInjector.forEach((value, index) => {
            tempRegexUrlInjector[index] = tempMessageSplit[index];
          });

          tempUrlSplit.forEach((value, index) => {
            if (index % 2 == 1) {
              tempUrlSplit.splice(index, 0, tempRegexUrlInjector[index - n]);
              ++n;
            }
          });
        }

        options.push({
          url: tempUrlSplit.join(""),
          method,
        });
      }

      const { data } = await axios(options[0]);

      if (regexmatcherOutputAPI.test(toString(data))) {
        output = embeed(await readMessageCommand("output.DISCORD.SUCCESS", nameCommand), data);
      } else {
        output = embeed(await readMessageCommand("output.DISCORD.FAILED", nameCommand), data);
      }
    } else {
      output = embeed(await readMessageCommand("output.DISCORD.SUCCESS", nameCommand));
    }
  }

  return output !== "" ? message.reply({ embeds: [output] }) : "";
});

client.login(TOKEN);
