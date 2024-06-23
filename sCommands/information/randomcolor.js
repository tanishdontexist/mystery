const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "randomcolor",
  type: 1,
  description: "Random hex generator command.",
  run: async (client, interaction) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const embed = new MessageEmbed()
      .setColor(randomColor)
      .setDescription(`#${randomColor}`);

    interaction.reply({ embeds: [embed] });
  },
};
