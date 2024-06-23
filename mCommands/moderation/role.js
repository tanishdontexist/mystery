const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "role",
  aliases: ["r"],
  description: "Add/Remove role to/from a user.",
  usage: "role (user) (role)",
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
            "I don't have permission to add/remove any role to/from anyone."
          );
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((r) => r.id === args[1]);

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

    if (!args[1]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any role-id or role.");
      return message.channel.send({ embeds: [nooem] });
    }
    if (isNaN(args[1]) && !role) {
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
    if (!member.manageable) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          "I don't have permission to add/remove any role to/from this user."
        );
      return message.channel.send({ embeds: [nooem] });
    }
    if (message.guild.me.roles.highest.position <= role.position) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          "I don't have permission to add/remove this role to/from any user."
        );
      return message.channel.send({ embeds: [nooem] });
    }
    if (member.roles.cache.has(role.id)) {
      member.roles.remove(role);

      const remroleembed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`${role} role removed successfully from ${member}.`);
      return message.channel.send({ embeds: [remroleembed] });
    }

    member.roles.add(role);

    const addroleembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`${role} role added successfully to ${member}.`);
    await message.channel.send({ embeds: [addroleembed] });
  },
};
