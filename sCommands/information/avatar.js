const { MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "avatar",
  type: 1,
  description: "Get avatar of a user.",
  options: [
    {
      name: "user",
      type: 6,
      description: "Tag user who's avatar you want.",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const { options } = interaction;
    let member = options.getUser("user");

    let embed = new MessageEmbed()
      .setAuthor(member.username, member.avatarURL({ dynamic: true }))
      .setColor(Color)
      .setImage(member.avatarURL({ size: 4096, dynamic: true, format: "png" }))
      .setFooter(
        `Requested By ${interaction.member.user.tag}`,
        interaction.member.user.avatarURL({ dynamic: true })
      );

    interaction.reply({ embeds: [embed] });
  },
};
