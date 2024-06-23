const { MessageEmbed } = require("discord.js");
const { Color, Default_prefix } = require('../../config.json');

module.exports = {
  name: "update",
  description: "Latest update related information.",
  run: async (client, interaction) => {
    let events = new MessageEmbed()
      .setDescription(
        `**New Version - 1.0.0** \n\n **Important**\nThis client won't recieve updates from now. \n\n**Updates** \nMajor bugs fixes \nAll commands upgraded \nNow Slash commands are available for 2 categories (BotInfo, Information) \n\n**Find a bug?** \nReport it now with \`/report (report)\``
      )
      .setColor(Color);
    interaction.reply({ embeds: [events] });
  },
};
