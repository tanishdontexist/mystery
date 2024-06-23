const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "rolecolor",
  aliases: ["rcolor"],
  description: "Change any role colour.",
  usage: "rolecolor (role) (color)",
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
          .setDescription(
            "I don't have permission to change color of any role."
          );
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((r) => r.id === args[0]);

    let color = args[1];

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

    if (!color) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any color.");
      return message.channel.send({ embeds: [nooem] });
    }
 if (message.guild.me.roles.highest.position <= role.position) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          "I don't have permission to change color of this role."
        );
      return message.channel.send({ embeds: [nooem] });
    }
    role.setColor(color);

    const addroleembed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
      .setColor(color)
      .setDescription(`${role} role color changed successfully to ${color}.`);

    message.channel.send({ embeds: [addroleembed] });
  },
};
