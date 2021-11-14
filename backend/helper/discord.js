const { MessageEmbed } = require("discord.js");
const { readJSON, readMessageJSON, readMessageAPI } = require("../helper/json");

export const embeed = (data_embed, data_api = "") => {
  const embed = new MessageEmbed();

  // without API
  if (data_embed.title && data_api == "") embed.setTitle(data_embed.title);
  if (data_embed.description && data_api == "")
    embed.setDescription(data_embed.description);
  if (data_embed.color && data_api == "") embed.setColor(data_embed.color);
  if (data_embed.author && data_api == "")
    embed.setAuthor(
      data_embed.author.name,
      data_embed.author.url,
      data_embed.author.icon
    );
  if (data_embed.thumbnail && data_api == "")
    embed.setThumbnail(data_embed.thumbnail);
  if (data_embed.image && data_api == "") embed.setImage(data_embed.image);
  if (data_embed.footer && data_api == "")
    embed.setFooter(data_embed.footer.text, data_embed.footer.icon);
  if (data_embed.field && data_api == "") {
    data_embed.field.forEach((entry) => {
      embed.addField(entry.name, entry.value, entry.inline);
    });
  }

  // with API
  if (data_embed.title && data_api != "")
    embed.setTitle(readMessageAPI(data_api, data_embed.title));
  if (data_embed.description && data_api != "")
    embed.setDescription(readMessageAPI(data_api, data_embed.description));
  if (data_embed.color && data_api != "")
    embed.setColor(readMessageAPI(data_api, data_embed.color));
  if (data_embed.author && data_api != "")
    embed.setAuthor(
      readMessageAPI(data_api, data_embed.author.name),
      readMessageAPI(data_api, data_embed.author.icon),
      readMessageAPI(data_api, data_embed.author.url)
    );
  if (data_embed.thumbnail && data_api != "")
    embed.setThumbnail(readMessageAPI(data_api, data_embed.thumbnail));
  if (data_embed.image && data_api != "")
    embed.setImage(readMessageAPI(data_api, data_embed.image));
  if (data_embed.footer && data_api != "")
    embed.setFooter(
      readMessageAPI(data_api, data_embed.footer.text),
      readMessageAPI(data_api, data_embed.footer.icon)
    );
  if (data_embed.field && data_api != "") {
    data_embed.field.forEach((entry) => {
      embed.addField(
        readMessageAPI(data_api, entry.name),
        readMessageAPI(data_api, entry.value),
        entry.inline
      );
    });
  }
  embed.setTimestamp();

  return embed;
};

export const helpCommand = async (command) => {
  let showInfoCommand = readJSON("./config/commands.json");
  showInfoCommand = showInfoCommand.filter((cmd) => {
    return cmd.name === command && cmd.on_discord === true;
  })[0];

  if (showInfoCommand === undefined) return false;

  const data_embed = {
    title: readMessageJSON("TITLE_HELP_DISCORD"),
    description: "```" + showInfoCommand.command + "```",
    field: [
      {
        name: "**Description**",
        value: "```" + showInfoCommand.description + "```",
        inline: false,
      },
      {
        name: "**Usage**",
        value: "```" + showInfoCommand.usage + "```",
        inline: false,
      },
    ],
  };

  return embeed(data_embed);
};
