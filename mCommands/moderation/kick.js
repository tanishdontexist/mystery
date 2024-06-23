const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "kick",
  aliases: ["ku"],
  description: "Kick a user.",
  usage: "kick (user) [reason]",
  category: "Moderation",
  run: async (client, message, args) => {
 
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to kick a user.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find(m => m.id === args[0]);

    const reason = args.slice(1).join(" ") || "No reason.";

    if (!args[0]) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any user-id or user.");
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

    if (!member.kickable) {
         const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to kick this user.");
        return message.channel.send({ embeds: [nooem] });
    }

    const kickembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `${member} has been kicked out successfully for ${reason}`
      );

    message.channel.send({ embeds: [kickembed] });

    const kickembedq = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `You have been kicked out from ${message.guild.id} for ${reason}`
      );

    member.send({ embeds: [kickembedq] });

    member.kick(reason);
  }
};
