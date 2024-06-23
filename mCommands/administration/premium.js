const { Color } = require('../../config.json');
const db = require("quick.db");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "premium",
  aliases: ["actpr"],
  description: "Activate premium in your server.",
  usage: "premium (code)",
  category: "Administration",
  run: (client, message, args) => {
    const codes = "TaNisHisGoD085";
    const code = args[0];

    if (code === codes) {
      db.set(`serverpremium_${message.guild.id}`, message.guild.id);
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`This server is now a premium server.`);
      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Your code is wrong.`);
      return message.channel.send({ embeds: [embed] });
    }
  },
};
