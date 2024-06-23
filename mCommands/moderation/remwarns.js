const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
const { Color } = require('../../config.json');

module.exports = {
  name: "remwarns",
  aliases: ["rwarns"],
  description: "Remove warnings of a user.",
  usage: "remwarns (user) (warn)",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    let warn = db.get(`warn_${user}_${message.guild.id}`);

    const remwarn = args[1];

    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any user-id or user.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!args[1]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any value to clear warns.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(remwarn)) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(`You must specify any valid value to clear warns.`);
      return message.channel.send({ embeds: [nooem] });
    }

    if (remwarn > warn) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(`${user} not have enough warns to clear.`);
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(args[0]) && !user) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!user) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (warn === null) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription(`${user} have no warns to clear.`);
      return message.channel.send({ embeds: [nooem] });
    }

    db.subtract(`warn_${user}_${message.guild.id}`, remwarn);

    let ifwarn = "warn has";

    if ((remwarn !== 1, 0)) {
      let ifwarn = "warns have";
    }

    const removewarnsembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `${user} ${remwarn} ${ifwarn} been cleared successfully.`
      );

    message.channel.send({ embeds: [removewarnsembed] });
  },
};
