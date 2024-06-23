const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "rolename",
  aliases: ["rname"],
  description: "Change role name.",
  usage: "rolename (role) (name)",
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
            "I don't have permission to change name of any role."
          );
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let name = args.slice(1).join(" ");

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

    if (!name) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any name for that role.");
      return message.channel.send({ embeds: [nooem] });
    }
 if (message.guild.me.roles.highest.position <= role.position) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          "I don't have permission to change name of this role."
        );
      return message.channel.send({ embeds: [nooem] });
    }
    role.setName(name);

    const addroleembed = new MessageEmbed()
      .setColor(role.color)
      .setDescription(`${role} role name changed successfully to ${name}.`);

    message.channel.send({ embeds: [addroleembed] });
  },
};
