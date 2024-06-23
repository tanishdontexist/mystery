const { MessageEmbed, Permissions, EmbedBuilder, Embed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "say",
  aliases: ["ssay"],
  description: "Send your text by me.",
  usage: "say (channel) (text)",
  category: "Administration",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATION")) {
      if (!message.member.permissions.has("MANAGE_GUILD")) {
        const nooem = new EmbedBuilder()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }

    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.find((c) => c.id === args[0]);

    const saymessage = args.slice(1).join(" ");

    if (!args[0]) {
      const noembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription("You must specify any channel or channel-id.");
      return message.channel.send({ embeds: [noembed] });
    }

    if (isNaN(channel) && !channel) {
      const noembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription("You must specify any valid channel.");
      return message.channel.send({ embeds: [noembed] });
    }

    if (!channel) {
      const noembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription("You must specify any valid channel-id.");
      return message.channel.send({ embeds: [noembed] });
    }

    if (!saymessage) {
      const noembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription("You must specify any message.");
      return message.channel.send({ embeds: [noembed] });
    }

    channel.send(saymessage);
  },
};
