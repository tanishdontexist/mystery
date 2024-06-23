const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "unban",
  aliases: ["ubu"],
  description: "Unban a user.",
  usage: "unban (userid) [reason]",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to unban a user.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    const user = args[0];
    const reason = args.slice(1).join(" ") || "No reason.";

    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any user-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    const unbanembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `<@${user}> has been unbanned successfully for ${reason}`
      );

    message.guild.members
      .unban(user, { reason: reason })
      .then(() => {
        return message.channel.send({ embeds: [unbanembed] });
      })
      .catch(() => {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any valid user-id.");
        return message.channel.send({ embeds: [nooem] });
      });
  },
};
