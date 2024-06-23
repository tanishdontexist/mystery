const { Color } = require('../../config.json');
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  aliases: ["nick"],
  description: "Change nickname of a user.",
  usage: "setnick (user) (nickname)",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (
        !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)
      ) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription(
            "I don't have permission to change nickname of any user."
          );
        return message.channel.send({ embeds: [nooem] });
      }
    }
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    const nickname = args.slice(1).join(" ");

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

    if (!nickname) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any name for that user.");
      return message.channel.send({ embeds: [nooem] });
   
    }

    if (!member.manageable) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          "I don't have permission to change nickname of this user."
        );
      return message.channel.send({ embeds: [nooem] });
    }

    member.setNickname(nickname);
    const nickEmbed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `Successfully changed nickname of ${member} to ${nickname}`
      );

    message.channel.send({ embeds: [nickEmbed] });
  },
};
