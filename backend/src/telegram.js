const axios = require("axios");

const { toString } = require("../helper/helpers");

const { helpCommand, sendDataApi } = require("../helper/telegram");

const { readMessageCommand, findCommand } = require("../helper/json");

const TelegramBot = require("node-telegram-bot-api");

const { TOKEN_TELEGRAM_BETA, TOKEN_TELEGRAM_PRODUCTION, DEVELOPMENT } = process.env;

const { PREFIX } = require("../config/settings.json");

const TOKEN = DEVELOPMENT == "BETA" ? TOKEN_TELEGRAM_BETA : TOKEN_TELEGRAM_PRODUCTION;

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

console.info("[+] Telegram on ready");

bot.on("message", async (msg) => {
  if (msg.from.is_bot) return;

  const { id, type } = msg.chat;

  const { first_name, last_name } = msg.from;

  const chatId = id;
  const fullName = `${first_name} ${last_name}`;
  const userMessage = msg.text;

  if (userMessage === undefined) return;

  const splitMessage = userMessage.split(" ");
  const nameCommand = splitMessage[0].substring(PREFIX.length);

  let output = "";

  if (await userMessage.includes(`${PREFIX}help`)) {
    if (splitMessage.length == 2) {
      output = (await helpCommand(splitMessage[1])) || (await readMessageCommand("output.TELEGRAM.FAILED", "help"));
    } else {
      output = await readMessageCommand("output.TELEGRAM.SUCCESS", "help");
    }
  } else if (userMessage.includes(PREFIX) && findCommand(splitMessage[0], "on_telegram")) {
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
        output = sendDataApi(await readMessageCommand("output.TELEGRAM.SUCCESS", nameCommand), data);
      } else {
        output = sendDataApi(await readMessageCommand("output.TELEGRAM.FAILED", nameCommand), data);
      }
    } else {
      output = await readMessageCommand("output.TELEGRAM.SUCCESS", nameCommand);
    }
  }

  return output !== "" ? (output.match(/.(jpg|jpeg|png|gif)$/i) ? bot.sendPhoto(chatId, output.trim()) : bot.sendMessage(chatId, output, { parse_mode: "Markdown" })) : "";
});
