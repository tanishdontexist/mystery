const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
const { Color } = require('../../config.json');

module.exports = {
  name: "warnings",
  aliases: ["warns"],
  description: "Total warns of a user.",
  usage: "warnings (user)",
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

    let warns = db.get(`warn_${user}_${message.guild.id}`);
    /*
    let mod = db.get(`warn.moderator_1_${user}_${message.guild.id}`);
    let reason = db.get(`warn.reason_1_${user}_${message.guild.id}`);
*/
    if (warns === null) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("No warns found for this user.");
      return message.channel.send({ embeds: [nooem] });
    }

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

    const warnsembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`${user} has ${warns} Warns`);
    /*  .addField(`1st Warn`, `Mod: ${mod} - Reason: ${reason}`);

    if (warns > 2) {
      mod = db.get(`warn.moderator_2_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_2_${user}_${message.guild.id}`);
      warnsembed.addField(`2nd Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }

    if (warns > 3) {
      mod = db.get(`warn.moderator_3_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_3_${user}_${message.guild.id}`);
      warnsembed.addField(`3rd Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }

    if (warns > 4) {
      mod = db.get(`warn.moderator_4_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_4_${user}_${message.guild.id}`);
      warnsembed.addField(`4th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }

    if (warns > 5) {
      mod = db.get(`warn.moderator_5_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_5_${user}_${message.guild.id}`);
      warnsembed.addField(`5th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }

    if (warns > 6) {
      mod = db.get(`warn.moderator_6_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_6_${user}_${message.guild.id}`);
      warnsembed.addField(`6th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }

    if (warns > 7) {
      mod = db.get(`warn.moderator_7_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_7_${user}_${message.guild.id}`);
      warnsembed.addField(`7th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }
    if (warns > 8) {
      mod = db.get(`warn.moderator_8_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_8_${user}_${message.guild.id}`);
      warnsembed.addField(`8th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }
    if (warns > 9) {
      mod = db.get(`warn.moderator_9_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_9_${user}_${message.guild.id}`);
      warnsembed.addField(`9th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }
    if (warns > 10) {
      mod = db.get(`warn.moderator_10_${user}_${message.guild.id}`);
      reason = db.get(`warn.reason_10_${user}_${message.guild.id}`);
      warnsembed.addField(`10th Warn`, `Mod: ${mod} - Reason: ${reason}`);
    }
*/
    message.channel.send({ embeds: [warnsembed] });
  },
};
