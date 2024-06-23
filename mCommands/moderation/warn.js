const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
const { Color } = require('../../config.json');

module.exports = {
  name: "warn",
  aliases: ["wu"],
  description: "Warn a user.",
  usage: "warn (user) [reason]",
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

    const reason = args.slice(1).join(" ") || "No reason.";

    if (!args[0]) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any user-id or user.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (isNaN(args[0]) && !user) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user.");
      return message.channel.send({ embeds: [nooem] });
    }

    if (!user) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid user-id.");
      return message.channel.send({ embeds: [nooem] });
    }

    let ww = db.get(`warn_${user}_${message.guild.id}`);

    if (ww === 10) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("This user is at maximum warns.");
      return message.channel.send({ embeds: [nooem] });
    }

    db.add(`warn_${user}_${message.guild.id}`, 1);

    const w = await db.get(`warn_${user}_${message.guild.id}`);

    db.set(
      `warn.moderator_${w}_${user}_${message.guild.id}`,
      message.author.tag
    );
    db.set(`warn.reason_${w}_${user}_${message.guild.id}`, reason);

    const warnembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`${user} has been warned successfully for ${reason}`);

    message.channel.send({ embeds: [warnembed] });

    const warnembedq = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `You have been warned in ${message.guild.name} for ${reason}`
      );

    user.send({ embeds: [warnembedq] });
  },
};
