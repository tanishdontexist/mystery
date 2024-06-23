const { QuickDB } = require("quick.db");
const db = new QuickDB();
const moment = require("moment");
const { Permissions, EmbedBuilder } = require("discord.js");
const { Color } = require('../config.json');
module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    const data = db.get(
      `afk_${message.mentions.members.first.id}_${message.guild.id}`
    );
    if (!data) {
      return;
    }
    if (data) {
      const member = message.mentions.members.first();
      const reason = db.get(`afk.reason_${member.id}_${message.guild.id}`);
      const timestamp = db.get(`afk.time_${member.id}_${message.guild.id}`);
      const timeAgo = moment(timestamp).fromNow();
      const afkembed = new EmbedBuilder()
        .setColor(Color)
        .setDescription(
          `${member.user.username} is afk for ${reason} from ${timeAgo}.`
        );

      message.channel.send({ embeds: [afkembed] });
    }
  });
};
