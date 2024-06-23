const { MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "membercount",
  type: 1,
  description: "Total members in the guild.",
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`There are **${interaction.guild.memberCount}** users in ${interaction.guild.name}`);

    interaction.reply({ embeds: [embed] });
  }
};
