const { Color } = require('../../config.json');
const db = require("quick.db");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "prefix",
  aliases: ["changeprefix"],
  description: "Change the prefix of the bot.",
  usage: "prefix (prefix)",
  category: "Administration",
  run: (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }

    let prefix = args[0];

    if (!prefix) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any prefix.");
      return message.channel.send({ embeds: [embed] });
    }

    if (prefix.lenght > 5) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription("Prefix has too many letters, it's hard to recognise.");
      return message.channel.send({ embeds: [embed] });
    }

    db.set(`serverprefix_${message.guild.id}`, prefix);
    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`New prefix is seted as [ ${prefix} ]`);
    message.channel.send({ embeds: [embed] });
  },
};
