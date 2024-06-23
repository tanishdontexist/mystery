const { Permissions, MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "createrole",
  aliases: ["crr"],
  description: "Create a new role.",
  usage: "createrole (name) (color) [reason]",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to create a role.");
        return message.channel.send({ embeds: [nooem] });
      }
    }

    let name = args[0];
    let color = args[1];
    let reason = args[2] || "No reason.";

    if (!name) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any name.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!color) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any color.");
      return message.channel.send({ embeds: [nooem] });
    }

    const role = message.guild.roles.create({
      name: name,
      color: color,
      reason: reason,
    });

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`Successfully ${name} role created for ${reason}`);
    message.channel.send({ embeds: [embed] });
  },
};
