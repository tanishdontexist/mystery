const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "delrole",
  aliases: ["dlr"],
  description: "Delete a role.",
  usage: "delrole (role) [reason]",
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
          .setDescription("I don't have permission to delete a role.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let reason = args[1] || "No reason.";

    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((r) => r.id === args[0]);

    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any role-id or role.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(args[0]) && !role) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid role.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!role) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid role-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    const embed = new MessageEmbed()
      .setColor(role.color)
      .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
      .setDescription(`Successfully deleted ${role.name} role for ${reason}`);

    message.channel.send({ embeds: [embed] });
    role.delete([reason]);
  },
};
