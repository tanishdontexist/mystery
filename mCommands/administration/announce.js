const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "announce",
  aliases: ["ann"],
  description: "Send your text in embed form.",
  usage: "announce (channel) (text)",
  category: "Administration",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
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
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any channel or channel-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(channel) && !channel) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid channel.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!channel) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid channel-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!saymessage) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any message.");
      return message.channel.send({ embeds: [nooem] });
    }

    const embed = new MessageEmbed().setDescription(saymessage).setColor(Color);
    channel.send({ embeds: [embed] });
  },
};
