const { MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");
const { Color } = require('../../config.json');

module.exports = {
  name: "slowmode",
  aliases: ["slowm"],
  description: "Set channel slowmode.",
  usage: "slowmode (time)",
  category: "Administration",
  run: async (client, message, args) => {
    let time = args[0];

   if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
 if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to active slowmode.");
        return message.channel.send({ embeds: [nooem] });
      }
    }

    if (time === "0s" || !time) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Successfully removed slowmode of this channel.`);
     return message.channel.send({ embeds: [embed] })
    }

    const t = ms(time);

    message.channel.setRateLimitPerUser(t / 1000);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`Successfully seted slowmode of ${time} for this channel.`);
    message.channel.send({ embeds: [embed] });
  }
};
