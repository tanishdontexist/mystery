const { Color } = require('../../config.json');
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "untimeout",
  aliases: ["utout"],
  description: "Untimeout a user.",
  usage: "untimeout (user) [reason]",
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
          .setDescription("I don't have permission to untimeout a user.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any user-id and user.");
      return message.channel.send({ embeds: [nooem] });
    }

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    let reason = args.slice(1).join(" ") || "No reason.";

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
        .setDescription("I don't have permission to untimeout this user.");
      return message.channel.send({ embeds: [nooem] });
    }

    member.timeout(null, reason);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`${member} is successfully untimeouted for ${reason}`);

    message.channel.send({ embeds: [embed] });
  },
};
