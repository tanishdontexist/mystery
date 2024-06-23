const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Color, clientVersion } = require('../../config.json');
const { Colors } = require('discord.js');

module.exports = {
  name: "about",
  description: "Information about me.",
  run: async (client, interaction) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let embed = new EmbedBuilder()
      .setColor(Color)
      .setAuthor(`About ${client.user.username}`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .addField([{ name: "Made By", value: `Mystery development`, inline: true }])
      .addField([{ name: "Verison", value: `\`${clientVersion}\``, inline: true }])
      .addField([{ name: "Ping", value: `\`${client.ws.ping}\``, inline: true }])
      .addField([{ name: "Library", value: "`discord.js v13.5.0`", inline: true }])
      .addField([{
        name: "Uptime",
        value: `\`${days}d ${hours}h ${minutes}m ${seconds}s\``,
       inline: true
  }])
      .addField("Total Commands", "`37 Commands`", true);

    interaction.reply({ embeds: [embed] });
  },
};
