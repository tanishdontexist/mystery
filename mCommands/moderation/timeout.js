const db = require("quick.db");
const ms = require("ms");
const { Color } = require('../../config.json');
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "timeout",
  aliases: ["tout"],
  description: "Timeout a user.",
  usage: "timeout (user) (time) [reason]",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (
        !message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS) &&
        !message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)
      ) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (
        !message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)
      ) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to timeout a user.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let time1 = args[1];

    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any user-id and user.");
      return message.channel.send({ embeds: [nooem] });
    }
    if (!time1) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any time.");
      return message.channel.send({ embeds: [nooem] });
    }

    let time = ms(time1);

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    let reason = args.slice(2).join(" ") || "No reason.";

    if (!time) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid time.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(args[0]) && !member) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!member) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!member.moderatable) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("I don't have permission to timeout this user.");
      return message.channel.send({ embeds: [nooem] });
    }

    member.timeout(time, reason);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `${member} is successfully timeouted for ${time1} for ${reason}`
      );

    const embedq = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `You have been timeouted in ${message.guild.id} for ${time1} for ${reason}`
      );

    member.send({ embeds: [embedq] });

    message.channel.send({ embeds: [embed] });
  },
};
