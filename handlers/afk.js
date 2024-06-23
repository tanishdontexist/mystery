const { QuickDB } = require("quick.db");
const db = new QuickDB();
const moment = require("moment");
const { Permissions, EmbedBuilder } = require("discord.js");
const { Color } = require('../config.json');
module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;
    const getData = db.get(`afk_${message.author.id}_${message.guild.id}`);
    if (!getData) {
      return;
    }
    if (getData) {
      const nickname = db.get(
        `afk.name_${message.author.id}_${message.guild.id}`
      );
      if (message.member.manageable) {
        message.member.setNickname(nickname);
      }
      db.delete(`afk_${message.author.id}_${message.guild.id}`);
      db.delete(`afk.reason_${message.author.id}_${message.guild.id}`);
      db.delete(`afk.name_${message.author.id}_${message.guild.id}`);
      db.delete(`afk.time_${message.author.id}_${message.guild.id}`);

      const welembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription(
          `Welcome back! ${message.member}, i've removed your afk.`
        );

      message.channel.send({ embeds: [welembed] });
    }
  });
};
