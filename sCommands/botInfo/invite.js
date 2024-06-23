const { MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "invite",
  description: "Invite me to your server.",
  run: async (client, interaction) => {
    let invembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `Admin Invite - [Admin Invite](https://discord.com/api/oauth2/authorize?client_id=890909951667605534&permissions=8&scope=bot%20applications.commands)\nRecommended Invite - [Recommended Invite](https://discord.com/api/oauth2/authorize?client_id=890909951667605534&permissions=139791288897&scope=applications.commands%20bot)`
      );
    interaction.reply({ embeds: [invembed] });
  },
};
