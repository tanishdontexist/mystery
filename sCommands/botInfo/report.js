const { MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "report",
  type: 1,
  description: "Report a bug.",
  options: [
    {
      name: "bug",
      type: 3,
      description: "Type your report here.",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const { options } = interaction;
    const channel = await client.channels.cache.find(
      (channel) => channel.id === "1091400226507591843"
    );
    const report = options.getString("bug");
    const thxembed = new MessageEmbed()
      .setDescription("Thanks for reporting a bug, it means alot to us")
      .setColor(Color);
    interaction.reply({ embeds: [thxembed] });
    let repembed = new MessageEmbed()
      .setAuthor(
        interaction.member.user.username,
        interaction.member.user.avatarURL({
          dynamic: true,
        })
      )
      .setColor(Color)
      .addField(
        "User Reported",
        `\`${interaction.member.user.tag},\n${interaction.member.user.id}\``
      )
      .addField("Report", `\`${report}\``)
      .addField(
        "User Reported From",
        `\`${interaction.member.guild.name},\n${interaction.member.guild.id}\``
      )
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter(`Bug Reported`, client.user.avatarURL({ dynamic: true }))
      .setTimestamp();

    channel.send({ embeds: [repembed] });
  },
};
