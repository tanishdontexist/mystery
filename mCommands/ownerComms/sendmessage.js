const { Permissions, MessageEmbed } = require("discord.js");
const { Color, ownerId } = require('../../config.json');

module.exports = {
  name: "sendmessage",
  aliases: ["sndmsg"],
  description: "Send Message To DM",
  usage: "sendmessage (guildId) (userId) (message)",
  category: "Administration",
  run: async (client, message, args) => {
    if (message.author.id !== ownerId) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setAuthor(
          `| Oop's this is locked!`,
          message.member.user.avatarURL({ dynamic: true })
        );
      return message.channel.send({ embeds: [embed] });
    }
    try {
      const guild = client.guilds.cache.find((g) => g.id === args[0]);

      const user =
        message.mentions.users.first() ||
        client.guilds.members.cache.find((m) => m.id === args[1]);

      const saymessage = args.slice(2).join(" ");

      const embed = new MessageEmbed()
        .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
        .setColor(Color)
        .setDescription(saymessage)
        .setFooter(
          `${client.user.username} sent you a message.`,
          client.user.avatarURL({ dynamic: true })
        );

      user.send({ embeds: [embed] });
      const eembed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Message successfully sent to the user.`);
      message.channel.send({ embeds: [eembed] });
    } catch {
      const eembed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`User dm is closed, unable to send message.`);
      message.channel.send({ embeds: [eembed] });
    }
  },
};
