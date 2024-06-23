const { MessageEmbed, Permissions } = require("discord.js");
const { ownerId, Color } = require('../../config.json');
const db = require("quick.db");

module.exports = {
  name: "status",
  aliases: ["statu"],
  description: "Change Status Of The Bot With A Command",
  usage: "status (status)",
  category: "OwnerComms",
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

    db.set(`status`, args[0]);

    client.user.setPresence({ status: args[0] });

    const embed = new MessageEmbed()
      .setColor(Color)
      .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
      .setDescription(`Successfully seted status as ${args[0]}`);

    message.channel.send({ embeds: [embed] });
  }
};
